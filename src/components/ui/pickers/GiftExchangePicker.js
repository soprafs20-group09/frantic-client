import React, {Component} from 'react';
import "styles/ui/pickers/ConcretePickers.scss";
import ToolWindow from "components/ui/ToolWindow";
import PlayerPicker from "components/ui/pickers/parts/PlayerPicker";
import CardPicker from "components/ui/pickers/parts/CardPicker";
import Separator from "components/ui/Separator";
import Button from "components/ui/Button";
import IconTitle from "components/ui/IconTitle";

/**
 * Renders a ToolWindow to get information about a Gift or Exchange action from the user.
 * PROPS:
 * mode: string        - either 'gift' or 'exchange', sets what kind of text and title is displayed.
 * players: array      - the players that should be available to choose.
 * cards: array        - the cards the player can choose between.
 * onFinish: func(obj) - function that is called when user clicks 'done'.
 *                       parameter:
 *                       {
 *                           target: string - username
 *                           cards: array of card objects
 *                       }
 */
class GiftExchangePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedCards: [], selectedPlayer: null}
    }

    render() {
        return (
            <ToolWindow title={this.getTitle()} style={{width: "30em"}}>
                <div className="concrete-picker-container">
                    <Separator step={1}>
                        {this.getText1()}
                    </Separator>
                    <CardPicker
                        cards={this.props.cards}
                        maxAmount={2}
                        onSelectionChange={c => this.handleCardChange(c)}
                    />
                    <br/>
                    <Separator step={2}>
                        {this.getText2()}
                    </Separator>
                    <PlayerPicker
                        players={this.props.players}
                        maxAmount={1}
                        onSelectionChange={p => this.handlePlayerChange(p)}
                    />
                    <div className="concrete-picker-spacer"/>
                    <Button
                        width="10em"
                        disabled={!this.enableButton()}
                        onClick={() => this.handleFinish()}
                    >
                        Done!
                    </Button>
                </div>
            </ToolWindow>
        );
    }

    enableButton() {
        return this.state.selectedCards.length === 2 && this.state.selectedPlayer;
    }

    getTitle() {
        return this.props.mode === 'gift' ?
            <IconTitle icon="special:gift">Gift</IconTitle> :
            <IconTitle icon="special:exchange">Exchange</IconTitle>;
    }

    getText1() {
        return this.props.mode === 'gift' ?
            "Pick two cards to gift" :
            "Pick two cards to exchange";
    }

    getText2() {
        return this.props.mode === 'gift' ?
            "Pick who will receive them" :
            "Pick your exchange partner";
    }

    handleCardChange(c) {
        this.setState({selectedCards: c});
    }

    handlePlayerChange(p) {
        this.setState({selectedPlayer: p.length ? p[0] : null});
    }

    handleFinish() {
        if (this.props.onFinish) {
            this.props.onFinish({
                target: this.state.selectedPlayer,
                cards: this.state.selectedCards
            });
        }
    }
}

export default GiftExchangePicker;