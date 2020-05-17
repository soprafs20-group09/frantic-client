import React, {Component} from 'react';
import "styles/ui/ingame/OpponentHand.scss";
import Card from "components/ui/cards/Card";
import {HandTransition} from "components/ui/Transitions";
import PlayerInfo from "components/ui/ingame/PlayerInfo";

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
                <PlayerInfo
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

export default OpponentHand;