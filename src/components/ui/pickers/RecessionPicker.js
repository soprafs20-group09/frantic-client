import React, {Component} from 'react';
import "styles/ui/pickers/ConcretePickers.scss";
import ToolWindow from "components/ui/ToolWindow";
import IconTitle from "components/ui/IconTitle";
import Separator from "components/ui/Separator";
import CardPicker from "components/ui/pickers/parts/CardPicker";
import Button from "components/ui/Button";

/**
 * Shows a picker that forces the user to select
 * an amount of cards to discard.
 * PROPS:
 * cards: array           - array of cards
 * amount: number         - the amount of cards to discard.
 * onFinish: func(array)  - a function that is called when the user is finished.
 *                          parameter is an array of indices of the cards the user chose.
 */
class RecessionPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {cards: []};
    }

    render() {
        return (
            <ToolWindow
                noScroll
                title={<IconTitle icon="event:recession">Recession</IconTitle>}
            >
                <div className="concrete-picker-container">
                    <p>
                        Due to the current recession, you need to discard
                        {this.props.amount} cards!
                    </p>
                    <Separator>Choose {this.props.amount} cards to discard</Separator>
                    <CardPicker
                        cards={this.props.cards}
                        maxAmount={this.props.amount}
                        onSelectionChange={s => this.handleSelectionChange(s)}
                    />
                    <div className="concrete-picker-spacer"/>
                    <Button
                        width="10em"
                        disabled={this.state.cards.length === this.props.amount}
                        onClick={this.handleFinish()}
                    >
                        Done
                    </Button>
                </div>
            </ToolWindow>
        );
    }

    handleSelectionChange(selection) {
        this.setState({cards: selection});
    }

    handleFinish() {
        let cards = [];

        for (let c of this.state.cards) {
            cards.push(this.props.cards.indexOf(c));
        }

        if (this.props.onFinish) {
            this.props.onFinish(cards);
        }
    }
}

export default RecessionPicker;