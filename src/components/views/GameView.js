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
import {EndTurnTransition, EventOverlayTransition, WindowTransition} from "components/ui/Transitions";
import GiftAndCoPicker from "components/ui/pickers/GiftAndCoPicker";
import SkipPicker from "components/ui/pickers/SkipPicker";
import FantasticPicker from "components/ui/pickers/FantasticPicker";
import EqualityPicker from "components/ui/pickers/EqualityPicker";
import GenericColorPicker from "components/ui/pickers/GenericColorPicker";
import IconTitle from "components/ui/IconTitle";
import EventOverlay from "components/ui/ingame/EventOverlay";
import TextOverlay from "components/ui/ingame/TextOverlay";
import {withRouter} from "react-router-dom";
import RecessionPicker from "components/ui/pickers/RecessionPicker";
import GamblingPicker from "components/ui/pickers/GamblingPicker";

class GameView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            playerCards: [],
            availableCards: [],
            discardPileTopCard: undefined,
            opponents: [],
            drawAmount: 0,
            drawKey: 0,
            activePlayer: undefined,
            timerSeconds: 0,
            timerKey: 0,
            canDraw: false,
            canEnd: false,
            actionResponse: null,
            recessionAmount: 0,
            gamblingCards: [],
            timebombRounds: 0,
            overlay: null,
            event: null,
            animationTrail: {
                hand: 500
            },
            chatItems: []
        };
    }

    loadFakePlayers(cardAmount) {
        this.setState({
            loading: false,
            playerCards: franticUtils.generateRandomCards(cardAmount, true),
            opponents: [
                {
                    username: "jan",
                    points: 12,
                    skipped: false,
                    cards: franticUtils.generateBackCards(cardAmount),
                    admin: true
                },
                {
                    username: "jon",
                    points: 69,
                    skipped: false,
                    cards: franticUtils.generateBackCards(cardAmount)
                },
                {
                    username: "sina",
                    points: 69,
                    skipped: false,
                    cards: franticUtils.generateBackCards(cardAmount)
                },
                {
                    username: "kyrill",
                    points: 69,
                    skipped: true,
                    cards: franticUtils.generateBackCards(cardAmount)
                },
                {
                    username: "remy",
                    points: 69,
                    skipped: false,
                    cards: franticUtils.generateBackCards(cardAmount)
                },
                {
                    username: "davide",
                    points: 69,
                    skipped: false,
                    cards: franticUtils.generateBackCards(cardAmount)
                },
                {
                    username: "joe",
                    points: 69,
                    skipped: false,
                    cards: franticUtils.generateBackCards(cardAmount)
                }
            ],
            activePlayer: "jan"
        });
    }

    componentDidMount() {
        this.loadFakePlayers(7);

        sockClient.onDisconnect(r => this.handleDisconnect(r));
        sockClient.onLobbyMessage('/chat', r => this.handleChatMessage(r));
        sockClient.onLobbyMessage('/game-state', s => this.handleGameState(s));
        sockClient.onLobbyMessage('/start-turn', t => this.handleTurnStart(t));
        sockClient.onLobbyMessage('/timer', t => this.handleTimer(t));
        sockClient.onLobbyMessage('/hand', h => this.handleNewHand(h));
        sockClient.onLobbyMessage('/playable', pc => this.handlePlayable(pc));
        sockClient.onLobbyMessage('/draw', a => this.handleNewDraw(a));
        sockClient.onLobbyMessage('/action-response', r => this.handleActionResponse(r));
        sockClient.onLobbyMessage('/event', e => this.handleEvent(e));
        sockClient.onLobbyMessage('/attack-window', r => this.handleAttackOpportunity(r));
        sockClient.onLobbyMessage('/nice-try-window', r => this.handleAttackOpportunity(r));
        sockClient.onLobbyMessage('/attack-turn', t => this.handleAttackTurn(t));
        sockClient.onLobbyMessage('/recession', r => this.handleRecessionAR(r));
        sockClient.onLobbyMessage('/gambling-man-window', r => this.handleGamblingManAR(r));
        sockClient.onLobbyMessage('/overlay', o => this.handleOverlay(o));
        sockClient.onLobbyMessage('/animation-speed', s => this.handleAnimationSpeed(s));
        sockClient.onLobbyMessage('/end-round', r => this.handleRoundEnd(r));
        sockClient.onLobbyMessage('/end-game', r => this.handleGameEnd(r));
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
                        trail={this.state.animationTrail.hand}
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
                    trail={this.state.animationTrail.hand}
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
                    trail={this.state.animationTrail.hand}
                    key={remaining.length}
                />
            );
        }

        let overlay = false;
        let event = false;
        if (this.state.actionResponse) {
            overlay = this.getActionResponse(this.state.actionResponse);
        } else if (this.state.event) {
            event =
                <EventOverlay
                    event={this.state.event.name}
                >
                    {this.state.event.message}
                </EventOverlay>;
            this.resetOverlayIn(11);
        } else if (this.state.overlay) {
            overlay =
                <TextOverlay
                    title={this.state.overlay.title}
                    icon={this.state.overlay.icon}
                >
                    {this.state.overlay.message}
                </TextOverlay>;
            this.resetOverlayIn(this.state.overlay.duration || 1);
        }

        return (
            <AppContainer withHelp>
                <div className={"game-opponents" + ((overlay || event) ? " overlayed" : "")}>
                    <div className="game-opponent-container right">
                        {rightOpps}
                    </div>
                    <div className="game-opponent-container top">
                        {topOpps}
                    </div>
                    <div className="game-opponent-container left">
                        {leftOpps}
                    </div>
                </div>
                <div className={"game-table" + ((overlay || event) ? " overlayed" : "")}>
                    <DrawStack
                        animated
                        interactive={isPlayerTurn && this.state.canDraw}
                        drawAmount={this.state.drawAmount}
                        drawKey={this.state.drawKey}
                        onClick={() => this.handleCardDraw()}
                    />
                    <div className="end-turn-container">
                        <EndTurnTransition>
                            {
                                this.state.canEnd &&
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
                            trail={this.state.animationTrail.hand}
                        />
                    </div>

                    <div className="timer-container">
                        <TurnTimer
                            start
                            seconds={this.state.timerSeconds}
                            turn={this.state.timerKey}
                            timebomb={this.state.timebombRounds}
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
                    <EventOverlayTransition>
                        {event}
                    </EventOverlayTransition>
                </div>
            </AppContainer>
        );
    }

    // region react logic

    getActionResponse(ar) {
        switch (ar) {
            case 'gift':
                return (
                    <GiftAndCoPicker
                        mode="gift"
                        players={this.state.opponents}
                        cards={this.state.playerCards}
                        onFinish={p => this.handleFinishActionResponse(ar, p)}
                    />
                );

            case 'exchange':
                return (
                    <GiftAndCoPicker
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

            case 'recession':
                return (
                    <RecessionPicker
                        cards={this.state.playerCards}
                        amount={this.state.recessionAmount}
                        onFinish={p => this.handleFinishActionResponse(ar, {cards: p})}
                    />
                );

            case 'surprise-party':
                return (
                    <GiftAndCoPicker
                        mode="surprise-party"
                        players={this.state.opponents}
                        cards={this.state.playerCards}
                        onFinish={p => this.handleFinishActionResponse(ar,
                            {
                                card: p.cards[0],
                                target: p.target
                            })}
                    />
                );

            case 'gambling-man':
                return (
                    <GamblingPicker
                        cards={this.state.playerCards}
                        available={this.state.gamblingCards}
                        onFinish={p => this.handleFinishActionResponse(ar, {bet: p})}
                    />
                );

            default:
                return null;
        }
    }

    resetOverlayIn(seconds) {
        setTimeout(
            () => this.setState({event: null, overlay: null}),
            seconds * 1000
        );
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
        this.setState({playerCards: newHand.cards});
    }

    handlePlayable(playable) {
        this.setState({
            availableCards: playable.cards,
            canDraw: playable.canDraw,
            canEnd: playable.canEnd
        });
    }

    handleNewDraw(newAmount) {
        this.setState({
            drawAmount: newAmount.amount,
            drawKey: this.state.drawKey + 1
        });
    }

    handleTimer(t) {
        this.setState({
            timerSeconds: t.seconds,
            timerKey: (this.state.timerKey + 1) % 2
        });
    }

    handleTurnStart(t) {
        let overlay = null;
        if (t.currentPlayer === sessionManager.username) {
            overlay = {
                title: "it's your turn!",
                duration: 1
            }
        }

        this.setState({
            activePlayer: t.currentPlayer,
            actionResponse: null,
            timebombRounds: t.timebombRounds,
            overlay: overlay
        });
    }

    handleAttackTurn(t) {
        this.setState({activePlayer: t.currentPlayer});
    }

    handleActionResponse(r) {
        this.setState({actionResponse: r.action});
    }

    handleRecessionAR(r) {
        this.setState({
            actionResponse: 'recession',
            recessionAmount: r.amount
        });
    }

    handleGamblingManAR(r) {
        this.setState({
           actionResponse: 'gambling-man',
           gamblingCards: r.playable
        });
    }

    handleAttackOpportunity(r) {
        this.setState({availableCards: r.playable});
    }

    handleEvent(e) {
        this.setState({
            event: {
                name: e.event,
                message: e.message
            }
        });
    }

    handleOverlay(o) {
        this.setState({overlay: o});
    }

    handleAnimationSpeed(speed) {
        this.setState({animationTrail: speed});
    }

    handleRoundEnd(r) {
        sessionManager.inGame = false;
        sessionManager.endPlayers = r.players;
        sessionManager.pointLimit = r.pointLimit;
        this.props.history.push('/end/round');
    }

    handleGameEnd(r) {
        sessionManager.inGame = false;
        sessionManager.endPlayers = r.players;
        sessionManager.pointLimit = r.pointLimit;
        this.props.history.push('/end/game');
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
                sockClient.sendToLobby(`/action/${ar}`, payload);
            }
        } catch {
        }
        // set the active player to null in order to prevent the user
        // from clicking anything until next turn starts
        this.setState({actionResponse: null, activePlayer: null});
    }

    // endregion
}

export default withRouter(GameView);
