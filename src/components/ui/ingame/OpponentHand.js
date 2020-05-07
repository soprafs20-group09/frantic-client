import React, {Component} from 'react';
import "styles/ui/ingame/OpponentHand.scss";
import Card from "components/ui/cards/Card";
import {HandTransition, WindowTransition} from "components/ui/Transitions";
import Skip from "assets/frantic/special-cards/skip.svg";
import InlineSVG from "react-inlinesvg";
import PlayerAvatar from "components/ui/PlayerAvatar";
import IconTitle from "components/ui/IconTitle";

/**
 * This component renders the hand (cards) of an opponent.
 * PROPS:
 * mode: string             - controls how the component is shown, possibilities: top, left, right,
 * opponent: object         - an opponent object which contains the following:
 *  - username: string
 *  - points: number
 *  - cards: array of card objects
 *  -skipped: boolean
 *  -active: boolean - highlights the player
 *  -admin: boolean
 * infoOverride: object     - an optional override for the displayed information.
 *  - points: number
 *  - cards: number
 *  trail: number           - how long it should take between each card add/remove animation
 */
class OpponentHand extends Component {
    render() {
        const {opponent, mode, active, infoOverride, trail} = this.props;

        let oc = opponent.cards;

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
            <div className={"opponent-hand " + mode}>
                <div className={"opponent-hand-cards " + mode}>
                    <HandTransition trail={trail}>
                        {cards}
                    </HandTransition>
                </div>
                <OpponentInfo
                    mode={mode}
                    username={opponent.username}
                    cards={infoOverride ? infoOverride.cards : opponent.cards.length}
                    points={infoOverride ? infoOverride.points : opponent.points}
                    skipped={opponent.skipped}
                    admin={opponent.admin}
                    active={active}
                />
            </div>
        );
    }
}

OpponentHand.defaultProps = {
    mode: 'bottom',
    trail: 500
};

class OpponentInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {showStats: false};
    }

    render() {
        let name = this.props.username;
        if (this.props.admin) {
            name = <IconTitle icon="misc:crown">{name}</IconTitle>;
        }

        const stats = <div className={"opponent-stats-container " + this.props.mode} key="player-stats">
            <h2 className="opponent-username">{name}</h2>
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
                    <PlayerAvatar
                        size="4.5em"
                        name={this.props.username}
                        active={this.props.active}
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