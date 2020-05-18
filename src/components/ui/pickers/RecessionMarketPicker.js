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
 * mode: string           - 'recession'/'market': this sets what the picker displays
 * cards: array           - array of cards
 * amount: number         - the amount of cards to discard if in 'recession' mode.
 * onFinish: func(array)  - a function that is called when the user is finished.
 *                          parameter is an array of indices of the cards the user chose.
 */
class RecessionMarketPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {cards: []};
    }

    render() {
        return (
            <ToolWindow noScroll title={this.getTitle()} style={{maxWidth: '30em'}}>
                <div className="concrete-picker-container">
                    <p>
                        {this.getDescription()}
                    </p>
                    <Separator>{this.getSeparatorText()}</Separator>
                    <CardPicker
                        cards={this.props.cards}
                        disableFuckYous={this.props.mode !== 'market'} // don't disable fuck-you cards in market
                        maxAmount={this.props.mode === 'recession' ? this.props.amount : 1}
                        onSelectionChange={(s, a) => this.handleSelectionChange(s, a)}
                    />
                    <div className="concrete-picker-spacer"/>
                    <Button
                        width="10em"
                        disabled={this.getButtonDisabled()}
                        onClick={() => this.handleFinish()}
                    >
                        Done
                    </Button>
                </div>
            </ToolWindow>
        );
    }

    getTitle() {
        switch (this.props.mode) {
            case 'recession':
                return <IconTitle icon="event:recession">Recession</IconTitle>;

            case 'market':
                return <IconTitle icon="event:market">Market</IconTitle>;
        }
    }

    getDescription() {
        switch (this.props.mode) {
            case 'recession':
                return "Due to the current recession," +
                    ` you need to discard ${this.props.amount} ${this.getCardsWord()}!`;

            case 'market':
                return "The market has opened! Choose a fresh card to buy!";

            default:
                return null;
        }
    }

    getCardsWord() {
        return this.props.amount > 1 ? 'cards' : 'card';
    }

    getSeparatorText() {
        switch (this.props.mode) {
            case 'recession':
                return `Choose ${this.props.amount} ${this.getCardsWord()} to discard`;

            case 'market':
                return "Pick one card";

            default:
                return null;
        }
    }

    getButtonDisabled() {
        switch (this.props.mode) {
            case 'recession':
                return this.state.cards.length !== Math.min(this.props.amount, this.state.availableAmount);

            case 'market':
                return this.state.cards.length !== 1;

            default:
                return true;
        }
    }

    handleSelectionChange(selection, available) {
        this.setState({cards: selection, availableAmount: available});
    }

    handleFinish() {
        let cards = [];

        for (let c of this.state.cards) {
            let i = this.props.cards.indexOf(c);
            if (i >= 0) {
                cards.push(i);
            }
        }

        if (this.props.onFinish) {
            this.props.onFinish(cards);
        }
    }
}

RecessionMarketPicker.defaultProps = {
    mode: 'recession'
};

export default RecessionMarketPicker;