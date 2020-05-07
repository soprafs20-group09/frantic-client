import React, {Component} from 'react';
import ToolWindow from "components/ui/ToolWindow";
import IconTitle from "components/ui/IconTitle";
import CardsToPlayersPicker from "components/ui/pickers/parts/CardsToPlayersPicker";
import Separator from "components/ui/Separator";

/**
 * Shows a picker that allows the player to redistribute all of their cards.
 * PROPS:
 * cards: array of cards     - the cards to distribute
 * players: array of players - the players to distribute to
 * onFinish:
 */
class MerryChristmasPicker extends Component {
    render() {
        return (
            <ToolWindow
                noScroll title={
                <IconTitle icon="event:merry-christmas">
                    Merry Christmas
                </IconTitle>
            }
                style={{width: '42em'}}
            >
                <p>
                    It's that time of the year again.
                    <br/>
                    Distribute all of your cards to your other beloved opponents!
                </p>
                <Separator>
                    Distribute all cards
                </Separator>
                <CardsToPlayersPicker
                    cards={this.props.cards}
                    players={this.props.players}
                    onFinish={c => this.handleFinish(c)}
                />
            </ToolWindow>
        );
    }

    handleFinish(players) {
        let result = {};

        for (let p of players) {
            let cards = [];
            for (let c of p.cards) {
                let i = this.props.cards.indexOf(c);
                if (i >= 0) {
                    cards.push(i);
                }
            }
            result[p.username] = cards;
        }

        console.log(result);

        if (this.props.onFinish) {
            this.props.onFinish(result);
        }
    }
}

export default MerryChristmasPicker;