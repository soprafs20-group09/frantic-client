import React, {Component} from 'react';
import "styles/ui/pickers/ConcretePickers.scss";
import ToolWindow from "components/ui/ToolWindow";
import IconTitle from "components/ui/IconTitle";
import Separator from "components/ui/Separator";
import CardPicker from "components/ui/pickers/parts/CardPicker";
import Button from "components/ui/Button";

/**
 * Shows a picker that forces the user to select
 * one card to gamble with.
 * PROPS:
 * cards: array           - array of card objects
 * available: array       - an array of indices to indicate which cards are available.
 * onFinish: func(array)  - a function that is called when the user is finished.
 *                          parameter is an array of indices of the cards the user chose.
 */
class GamblingPicker extends Component {
    constructor(props) {
        super(props);

        let cards = this.props.cards.slice();
        for (let i in cards) {
            cards[i].disabled = !this.props.available.includes(parseInt(i));
        }

        this.state = {cards: cards, selectedCard: null};
    }

    render() {
        return (
            <ToolWindow
                noScroll
                title={<IconTitle icon="event:gambling-man">Gambling Man</IconTitle>}
                style={{maxWidth: '30em'}}
            >
                <div className="concrete-picker-container">
                    <p>
                        It's time to gamble!
                        Choose a number card of the last played color.
                        The player with the highest digit has to take all of them.
                        So Choose Wisely!
                    </p>
                    <Separator>Choose your bet</Separator>
                    <CardPicker
                        cards={this.state.cards}
                        maxAmount={1}
                        onSelectionChange={s => this.handleSelectionChange(s)}
                    />
                    <div className="concrete-picker-spacer"/>
                    <Button
                        width="10em"
                        disabled={this.state.selectedCard === null}
                        onClick={() => this.handleFinish()}
                    >
                        Place Bet
                    </Button>
                </div>
            </ToolWindow>
        );
    }

    handleSelectionChange(selection) {
        if (selection.length > 0) {
            this.setState({selectedCard: this.props.cards.indexOf(selection[0])});
        }
        else {
            this.setState({selectedCard: null});
        }
    }

    handleFinish() {
        if (this.state.selectedCard !== null && this.props.onFinish) {
            this.props.onFinish(this.state.selectedCard);
        }
    }
}

export default GamblingPicker;