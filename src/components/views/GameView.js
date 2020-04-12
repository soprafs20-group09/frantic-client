import React, {Component} from 'react';
import "styles/views/GameView.scss";
import AppContainer from "components/ui/AppContainer";
import franticUtils from "utils/franticUtils";
import PlayerHand from "components/ui/ingame/PlayerHand";
import DrawStack from "components/ui/ingame/DrawStack";
import DiscardPile from "components/ui/ingame/DiscardPile";
import OpponentHand from "components/ui/ingame/OpponentHand";
import TurnTimer from "components/ui/ingame/TurnTimer";
import ChatLogBox from "components/ui/ingame/ChatLogBox";
import sockClient from "utils/sockClient";
import Spinner from "components/ui/Spinner";
import uiUtils from "utils/uiUtils";
import ErrorBox from "components/ui/ErrorBox";
import sessionManager from "utils/sessionManager";

class GameView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            playerCards: [],
            availableCards: [],
            discardPileTopCard: undefined,
            opponents: [],
            drawAmount: 0,
            drawKey: 0,
            activePlayer: undefined,
            turnTime: 0,
            turnNumber: 0,
            chatItems: []
        };
    }

    componentDidMount() {
        this.setState({
            playerCards: franticUtils.generateRandomCards(7, true),
            availableCards: [0, 2, 6, 24, 11, 16],
            opponents: [
                {
                    username: "jan",
                    points: 12,
                    skipped: false,
                    cards: franticUtils.generateBackCards(7)
                },
                {
                    username: "jon",
                    points: 69,
                    skipped: false,
                    cards: franticUtils.generateBackCards(7)
                }
            ],
            activePlayer: "jan"
        });
        sockClient.onDisconnect(r => this.handleDisconnect(r));
        sockClient.onLobbyMessage('/chat', r => this.handleChatMessage(r));
        sockClient.onLobbyMessage('/game-state', s => this.handleGameState(s));
        sockClient.onLobbyMessage('/start-turn', t => this.handleTurnStart(t));
        sockClient.onLobbyMessage('/hand', h => this.handleNewHand(h));
        sockClient.onLobbyMessage('/playable-cards', pc => this.handlePlayableCards(pc));
        sockClient.onLobbyMessage('/draw', a => this.handleNewDraw(a));
    }

    componentWillUnmount() {
        sockClient.clearMessageSubscriptions();
        sockClient.clearDisconnectSubscriptions();
        sessionManager.inGame = false;
    }

    render() {
        if (this.state.loading) {
            return (
                <AppContainer>
                    <Spinner/>
                </AppContainer>
            );
        } else if (this.state.error) {
            return (
                <AppContainer withBack>
                    <ErrorBox
                        key="error-box"
                        title={this.state.error.title}
                        maxWidth="50vw"
                    >
                        {this.state.error.description}
                    </ErrorBox>
                </AppContainer>
            );
        }

        const isPlayerTurn = sessionManager.username === this.state.activePlayer;

        let remaining = this.state.opponents.slice();
        let topOpps = [];
        let leftOpps = [];
        let rightOpps = [];

        if (remaining.length > 3) {
            let amount = Math.floor((remaining.length - 3) / 2);
            for (let i = 0; i < amount; i++) {
                const opp = remaining.pop();
                rightOpps.push(
                    <OpponentHand
                        mode="right"
                        opponent={opp}
                        active={opp.username === this.state.activePlayer}
                        key={i}
                    />
                );
            }
        }
        let amount = Math.min(remaining.length, 3);
        for (let i = 0; i < amount; i++) {
            const opp = remaining.pop();
            topOpps.push(
                <OpponentHand
                    mode="top"
                    opponent={opp}
                    active={opp.username === this.state.activePlayer}
                    key={i}
                />
            );
        }
        while (remaining.length > 0) {
            const opp = remaining.pop();
            leftOpps.push(
                <OpponentHand
                    mode="left"
                    opponents={opp}
                    active={opp.username === this.state.activePlayer}
                    key={remaining.length}
                />
            );
        }

        return (
            <AppContainer withHelp>
                <div className="game-table">
                    <div className="game-opponent-container right">
                        {rightOpps}
                    </div>
                    <div className="game-opponent-container top">
                        {topOpps}
                    </div>
                    <div className="game-opponent-container left">
                        {leftOpps}
                    </div>

                    <DrawStack
                        animated
                        interactive={isPlayerTurn}
                        drawAmount={this.state.drawAmount}
                        drawKey={this.state.drawKey}
                        onClick={() => this.handleCardDraw()}
                    />
                    <div className="game-stack-spacer"/>
                    <DiscardPile
                        topCard={this.state.discardPileTopCard}
                    />

                    <div className="game-player">
                        <PlayerHand
                            cards={this.state.playerCards}
                            available={this.state.availableCards}
                            onCardClick={i => this.handleCardClick(i)}
                        />
                    </div>

                    <div className="timer-container">
                        <TurnTimer
                            start
                            seconds={this.state.turnTime}
                            turn={this.state.turnNumber}
                        />
                    </div>

                    <div className="game-chat-container">
                        <ChatLogBox onSend={msg => this.handleChatSend(msg)}>
                            {this.state.chatItems}
                        </ChatLogBox>
                    </div>
                </div>
            </AppContainer>
        );
    }

    handleChatMessage(msg) {
        let newItem = uiUtils.parseChatObject(msg);
        if (newItem) {
            this.setState({
                chatItems: this.state.chatItems.concat(newItem)
            });
        }
    }

    handleGameState(newState) {
        let opps = newState.players;
        for (let i = 0; i < opps.length; i++) {
            if (opps[i].username === sessionManager.username) {
                opps.splice(i, 1);
                break;
            }
        }
        this.setState({
            loading: false,
            discardPileTopCard: newState.discardPile,
            opponents: opps
        });
    }

    handleNewHand(newHand) {
        this.setState({
            playerCards: newHand.cards
        });
    }

    handlePlayableCards(playableCards) {
        this.setState({
            availableCards: playableCards.playable
        });
    }

    handleNewDraw(newAmount) {
        this.setState({
            drawAmount: newAmount.amount,
            drawKey: this.state.drawKey + 1
        });
    }

    handleTurnStart(t) {
        this.setState({
            activePlayer: t.currentPlayer,
            turnTime: t.time,
            turnNumber: Math.random()
        });
        //TODO: turnNumber: t.turn
    }

    handleChatSend(msg) {
        try {
            if (sockClient.isConnected()) {
                sockClient.sendToLobby('/chat', {message: msg});
            }
        } catch {
        }
    }

    handleDisconnect(reason) {
        this.setState({
            error: {
                title: "Disconnected!",
                description:
                    <p>
                        Connection to the server was disrupted.
                        <br/>
                        <strong>Reason:</strong>
                        <br/>
                        {reason}
                    </p>
            }
        });
        sockClient.clearMessageSubscriptions();
        sockClient.clearDisconnectSubscriptions();
    }

    handleCardClick(i) {
        try {
            if (sockClient.isConnected()) {
                sockClient.sendToLobby('/play', {
                    index: i
                });
            }
        } catch {
        }
    }

    handleCardDraw() {
        try {
            if (sockClient.isConnected()) {
                sockClient.sendToLobby('/draw');
            }
        } catch {
        }
    }
}

export default GameView;