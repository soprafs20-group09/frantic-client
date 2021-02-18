import React, {Component} from 'react';
import Draggable from 'react-draggable';
import "styles/ui/pickers/BasicPickers.scss";
import "styles/ui/pickers/CardsToPlayersPicker.scss";
import Card from "components/ui/cards/Card";
import {animated, Spring} from "react-spring/renderprops";
import OpponentHand from "components/ui/ingame/OpponentHand";
import {CTPCardTransition} from "components/ui/Transitions";
import Button from "components/ui/Button";
import uiUtils from "utils/uiUtils";

/**
 * This component allows the player to distribute
 * the given cards to a number of players.
 * PROPS:
 * players: array of player objects
 * cards: array of card objects
 * onFinish: func(array) - a function that is called when the user is done distributing cards
 *                         the parameter is a modified player array, containing all new cards the players have gotten.
 */
class CardsToPlayersPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {players: [], cards: [], init: true};
        this.draggedCard = null;
        this.playerRefs = {};
    }

    componentDidMount() {
        let players = JSON.parse(JSON.stringify(this.props.players));
        let playersByUsername = {};
        for (let p of players) {
            p.cards = [];
            p.skipped = false;
            playersByUsername[p.username] = p;
        }
        this.setState({
            players,
            playersByUsername,
            cards: this.props.cards.slice()
        });
    }

    render() {
        let cardItems = [];
        let playerItems = [];
        for (let c of this.state.cards) {
            let i = this.state.cards.indexOf(c);
            cardItems.push(
                <DraggableCard
                    type={c.type}
                    value={c.value}
                    color={c.color}
                    onDragStart={() => this.handleDragStart(i)}
                    onDragStop={() => this.handleDragStop()}
                    onDrag={(e, d) => this.handleCardDrag(i, c, e.target, d)}
                    key={c.key}
                />
            );
        }

        for (let p of this.state.players) {
            let op = this.props.players.find(pp => pp.username === p.username);
            playerItems.push(
                <div
                    className="ctp-player-item"
                    onClick={() => this.handlePlayerClick(p)}
                    ref={r => this.playerRefs[op.username] = r}
                    key={p.username}
                >
                    <OpponentHand
                        opponent={p}
                        active={this.draggedCard !== null && p === this.state.hoveredPlayer}
                        trail={0}
                        infoOverride={{cards: op.cards.length, points: op.points}}
                    />
                </div>
            );
        }

        const endButton =
            <Button
                onClick={() => this.handleFinish()}
                width="10em"
                key="done-btn"
            >
                Done
            </Button>;

        return (
            <div className="ctp-container">
                <div className="ctp-players">
                    {playerItems}
                </div>
                <div className="ctp-cards">
                    <CTPCardTransition containerClass="ctp-card-shrinker">
                        {cardItems.length || this.state.init ? cardItems : endButton}
                    </CTPCardTransition>
                </div>
            </div>
        );
    }

    handleFinish() {
        if (this.props.onFinish) {
            this.props.onFinish(this.state.players);
        }
    }

    handlePlayerClick(p) {
        if (this.draggedCard === null && p.cards.length > 0) {
            this.state.cards.push(p.cards.pop());
            this.setState({
                players: this.state.players,
                cards: this.state.cards
            });
        }
    }

    handleDragStart(i) {
        this.draggedCard = i;
    }

    handleCardDrag(i, card, cardRef, data) {
        // the players are always above the cards,
        // so ignore everything below starting line
        if (data.y >= 0) return;

        let intersect = false;
        for (let username in this.playerRefs) {
            if (uiUtils.rectIntersection(cardRef.getBoundingClientRect(), this.playerRefs[username].getBoundingClientRect())) {
                intersect = username;
                break;
            }
        }
        if (intersect) {
            if (this.state.hoveredPlayer && this.state.hoveredPlayer.username === intersect) {
                return;
            }
            console.log(`hovering over ${intersect}!`);
            this.setState({hoveredPlayer: this.state.playersByUsername[intersect]});
        } else if (this.state.hoveredPlayer !== null) {
            this.setState({hoveredPlayer: null});
        }
    }

    handleDragStop() {
        if (this.state.hoveredPlayer == null) {
            this.draggedCard = null;
        } else if (this.draggedCard !== null) {
            this.state.hoveredPlayer.cards.push(this.state.cards[this.draggedCard]);
            this.state.cards.splice(this.draggedCard, 1);
            this.setState({
                init: false,
                players: this.state.players,
                cards: this.state.cards
            });
            this.draggedCard = null;
        }
    }
}

/**
 * PROPS:
 * type: string
 * color: string
 * value: string
 * onDragStop: func()
 * onDragStart: func()
 * onDrag: func()
 */
class DraggableCard extends Component {
    constructor(props) {
        super(props);
        this.state = {from: {x: 0, y: 0}};
    }

    render() {
        const springConfig = {
            tension: 180,
            friction: 15
        };

        return (
            <Spring
                from={this.state.from}
                to={{x: 0, y: 0}}
                onRest={() => this.handleSpringRest()}
                reset={true}
                config={springConfig}
            >
                {style =>
                    <Draggable
                        defaultClassNameDragging="ctp-card-dragging"
                        onStart={() => this.handleDragStart()}
                        onStop={(e, p) => this.handleDragStop(e, p)}
                        onDrag={this.props.onDrag}
                        position={this.state.dragging ? null : style}
                    >
                        <animated.div className="ctp-card-item">
                            <Card
                                withShadow
                                type={this.props.type}
                                value={this.props.value}
                                color={this.props.color}
                            />
                        </animated.div>
                    </Draggable>
                }
            </Spring>
        );
    }

    handleSpringRest() {
        if (this.state.from.x || this.state.from.y) {
            this.setState({from: {x: 0, y: 0}});
        }
    }

    handleDragStart() {
        this.setState({dragging: true});
        if (this.props.onDragStart) {
            this.props.onDragStart();
        }
    }

    handleDragStop(e, pos) {
        this.setState({dragging: false, from: {x: pos.x, y: pos.y}});
        if (this.props.onDragStop) {
            this.props.onDragStop();
        }
    }
}


export default CardsToPlayersPicker;