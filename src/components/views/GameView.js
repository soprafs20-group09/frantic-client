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
import Button from "components/ui/Button";
import {EndTurnTransition, WindowTransition} from "components/ui/Transitions";
import GiftExchangePicker from "components/ui/pickers/GiftExchangePicker";
import SkipPicker from "components/ui/pickers/SkipPicker";
import FantasticPicker from "components/ui/pickers/FantasticPicker";
import EqualityPicker from "components/ui/pickers/EqualityPicker";
import GenericColorPicker from "components/ui/pickers/GenericColorPicker";
import IconTitle from "components/ui/IconTitle";

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
            hasDrawn: false,
            actionResponse: null,
            chatItems: []
        };
    }

    componentDidMount() {
        this.setState({
            playerCards: franticUtils.generateRandomCards(7, true),
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
                    cards: franticUtils.generateBackCards(9)
                },
                {
                    username: "sina",
                    points: 69,
                    skipped: false,
                    cards: franticUtils.generateBackCards(3)
                },
                {
                    username: "kyrill",
                    points: 69,
                    skipped: true,
                    cards: franticUtils.generateBackCards(5)
                },
                {
                    username: "remy",
                    points: 69,
                    skipped: false,
                    cards: franticUtils.generateBackCards(10)
                },
                {
                    username: "davide",
                    points: 69,
                    skipped: false,
                    cards: franticUtils.generateBackCards(5)
                },
                {
                    username: "joe",
                    points: 69,
                    skipped: false,
                    cards: franticUtils.generateBackCards(1)
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
        sockClient.onLobbyMessage('/action-response', r => this.handleActionResponse(r))
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
        let leftOpps = [];
        let topOpps = [];
        let rightOpps = [];

        // fill the players in counter-clockwise direction, so we have the
        // "correct" turn order
        let amount = Math.floor((remaining.length - 3) / 2);
        if (remaining.length > 3) {
            for (let i = 0; i < amount; i++) {
                const opp = remaining.shift();
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
        amount = Math.min(remaining.length, 3);
        for (let i = 0; i < amount; i++) {
            const opp = remaining.shift();
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
            const opp = remaining.shift();
            leftOpps.push(
                <OpponentHand
                    mode="left"
                    opponent={opp}
                    active={opp.username === this.state.activePlayer}
                    key={remaining.length}
                />
            );
        }

        let overlay = false;
        if (this.state.actionResponse) {
            overlay = this.getActionResponse(this.state.actionResponse);
        }

        return (
            <AppContainer withHelp>
                <div className={"game-table" + (overlay ? " overlayed" : "")}>
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
                    <div className="end-turn-container">
                        <EndTurnTransition>
                            {
                                this.state.hasDrawn &&
                                <Button type="end-turn" onClick={() => this.handleTurnEnd()}>
                                    End Turn
                                </Button>
                            }
                        </EndTurnTransition>
                    </div>
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
                <div className="game-overlay">
                    <WindowTransition trail={0}>
                        {overlay}
                    </WindowTransition>
                </div>
            </AppContainer>
        );
    }

    // region react logic

    getActionResponse(ar) {
        switch (ar) {
            case 'gift':
                return (
                    <GiftExchangePicker
                        mode="gift"
                        players={this.state.opponents}
                        cards={this.state.playerCards}
                        onFinish={p => this.handleFinishActionResponse(ar, p)}
                    />
                );

            case 'exchange':
                return (
                    <GiftExchangePicker
                        mode="exchange"
                        players={this.state.opponents}
                        cards={this.state.playerCards}
                        onFinish={p => this.handleFinishActionResponse(ar, p)}
                    />
                );

            case 'skip':
                return (
                    <SkipPicker
                        players={this.state.opponents}
                        onFinish={p => this.handleFinishActionResponse(ar, {target: p})}
                    />
                );

            case 'fantastic':
                return (
                    <FantasticPicker
                        onFinish={p => this.handleFinishActionResponse(ar, p)}
                    />
                );

            case 'fantastic-four':
                return (
                    <FantasticPicker
                        withFour
                        players={this.state.opponents}
                        onFinish={p => this.handleFinishActionResponse(ar, p)}
                    />
                );

            case 'equality':
                return (
                    <EqualityPicker
                        maxCards={this.state.playerCards.length}
                        players={this.state.opponents}
                        onFinish={p => this.handleFinishActionResponse(ar, p)}
                    />
                );

            case 'counterattack':
                return (
                    <GenericColorPicker
                        title={<IconTitle icon="special:counterattack">Counterattack</IconTitle>}
                        onFinish={p => this.handleFinishActionResponse(ar, p)}
                    />
                );

            case 'nice-try':
                return (
                    <GenericColorPicker
                        title={<IconTitle icon="special:nice-try">Nice Try</IconTitle>}
                        onFinish={p => this.handleFinishActionResponse(ar, p)}
                    />
                );

            default:
                return null;
        }
    }

    // endregion

    // region incoming

    handleChatMessage(msg) {
        let newItem = uiUtils.parseChatObject(msg);
        if (newItem) {
            this.setState({
                chatItems: this.state.chatItems.concat(newItem)
            });
        }
    }

    handleGameState(newState) {
        let opps = newState.players.slice();
        if (opps.length > 0) {
            while (opps[0].username !== sessionManager.username) {
                opps.unshift(opps.pop());
            }
            opps.shift();
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
            turnNumber: t.turn,
            hasDrawn: false,
            actionResponse: null
        });
    }

    handleActionResponse(r) {
        this.setState({actionResponse: r.action});
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

    // endregion

    // region outgoing

    handleChatSend(msg) {
        try {
            if (sockClient.isConnected()) {
                sockClient.sendToLobby('/chat', {message: msg});
            }
        } catch {
        }
    }

    handleCardClick(i) {
        try {
            if (sockClient.isConnected()) {
                sockClient.sendToLobby('/play', {
                    index: i
                });
            }
            if (this.state.hasDrawn && this.props.playerCards[i].value === 'second-chance') {
                this.setState({hasDrawn: false});
            }
        } catch {
        }
    }

    handleCardDraw() {
        if (!this.state.hasDrawn) {
            this.setState({hasDrawn: true});
        }
        try {
            if (sockClient.isConnected()) {
                sockClient.sendToLobby('/draw');
            }
        } catch {
        }
    }

    handleTurnEnd() {
        try {
            if (sockClient.isConnected()) {
                sockClient.sendToLobby('/end-turn');
            }
        } catch {
        }
    }

    handleFinishActionResponse(ar, payload) {
        try {
            if (sockClient.isConnected()) {
                sockClient.sendToLobby(`/${ar}`, payload);
            }
        } catch {
        }
        this.setState({actionResponse: null});
    }

    // endregion
}

export default GameView;