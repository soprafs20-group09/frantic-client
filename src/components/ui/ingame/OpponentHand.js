import React, {Component} from 'react';
import "styles/ui/ingame/OpponentHand.scss";
import Card from "components/ui/cards/Card";
import {getPlayerAvatar} from "utils/api";
import {HandTransition, WindowTransition} from "components/ui/Transitions";
import Skip from "assets/frantic/special-cards/skip.svg";
import InlineSVG from "react-inlinesvg";

/**
 * This component renders the hand (cards) of an opponent.
 * PROPS:
 * mode: string     - controls how the component is shown, possibilities: top, left, right,
 * opponent: object - an opponent object which contains the following:
 *  - username: string
 *  - points: number
 *  - cards: array of card objects
 *  -skipped: boolean
 */
class OpponentHand extends Component {
    render() {
        let oc = this.props.opponent.cards;

        // how much each card is tilted to the right
        let degChange = 10;
        // the maximum degree difference between the outermost cards
        let maxDegrees = 100;
        const maxWidth = 10; //in em
        const maxIndividualWidth = '3.1em';
        const maxHeight = Math.min(oc.length / 3, 2); // in em

        let totalDegrees = degChange * oc.length;
        if (totalDegrees > maxDegrees) {
            degChange = maxDegrees / oc.length;
            totalDegrees = maxDegrees;
        }

        let yOffsetChange = Math.PI / (oc.length - 1);
        let currentYOffset = 0;

        let itemWidth = maxWidth / (oc.length - 1) + 'em';

        let currentDegrees = -(totalDegrees - degChange) / 2;

        let cards = [];
        for (let c of oc) {
            const style = {
                transform: `translateY(${-Math.sin(currentYOffset) * maxHeight}em) rotate(${currentDegrees}deg)`,
                width: `min(${itemWidth}, ${maxIndividualWidth})`
            };

            cards.push(
                <div
                    className="opponent-card"
                    style={style}
                    key={c.key}
                >
                    <Card
                        withShadow
                        type={c.type}
                        value={c.value}
                        color={c.color}
                    />
                </div>
            );

            currentDegrees += degChange;
            currentYOffset += yOffsetChange;
        }

        return (
            <div className={"opponent-hand " + this.props.mode}>
                <div className={"opponent-hand-cards " + this.props.mode}>
                    <HandTransition>
                        {cards}
                    </HandTransition>
                </div>
                <OpponentInfo
                    mode={this.props.mode}
                    username={this.props.opponent.username}
                    cards={this.props.opponent.cards.length}
                    points={this.props.opponent.points}
                    skipped={this.props.opponent.skipped}
                    active={this.props.active}
                />
            </div>
        );
    }
}

OpponentHand.defaultProps = {
    mode: 'bottom'
};

class OpponentInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {showStats: false};
    }

    render() {
        const stats = <div className={"opponent-stats-container " + this.props.mode} key="player-stats">
            <h2 className="opponent-username">{this.props.username}</h2>
            <table className="opponent-stats">
                <tbody>
                <tr>
                    <th>Cards</th>
                    <td>{this.props.cards}</td>
                </tr>
                <tr>
                    <th>Points</th>
                    <td>{this.props.points}</td>
                </tr>
                </tbody>
            </table>
        </div>;

        return (
            <div
                className={"opponent-info " + this.props.mode}
                onMouseOver={() => this.handleMouseOver()}
                onMouseLeave={() => this.handleMouseLeave()}
            >
                <div className="opponent-avatar-container">
                    <img
                        className={"opponent-avatar" + (this.props.active ? ' active' : '')}
                        src={getPlayerAvatar(this.props.username)}
                    />
                    {this.props.skipped && <InlineSVG className="opponent-skip" src={Skip}/>}
                </div>
                <WindowTransition mode='relative' trail={0}>
                    {this.state.showStats && stats}
                </WindowTransition>
            </div>
        );
    }

    handleMouseOver() {
        if (this.leaveTimeout) {
            clearTimeout(this.leaveTimeout);
            this.leaveTimeout = null;
        }
        if (!this.state.showStats) {
            this.setState({showStats: true});
        }
    }

    handleMouseLeave() {
        if (!this.leaveTimeout) {
            this.leaveTimeout = setTimeout(() => {
                this.leaveTimeout = null;
                this.setState({showStats: false});
            }, 500);
        }
    }
}

export default OpponentHand;