import React, {Component} from 'react';
import "styles/ui/pickers/ConcretePickers.scss";
import ToolWindow from "components/ui/ToolWindow";
import PlayerPicker from "components/ui/pickers/parts/PlayerPicker";
import CardPicker from "components/ui/pickers/parts/CardPicker";
import Separator from "components/ui/Separator";
import Button from "components/ui/Button";
import IconTitle from "components/ui/IconTitle";

/**
 * Renders a ToolWindow to get information about a Gift, Exchange and Surprise Party action from the user.
 * PROPS:
 * mode: string        - either 'gift'/'exchange'/'surprise-party', sets what kind of text and title is displayed.
 * players: array      - the players that should be available to choose.
 * cards: array        - the cards the player can choose between.
 * onFinish: func(obj) - function that is called when user clicks 'done'.
 *                       parameter:
 *                       {
 *                           target: string - username
 *                           cards: array of card indices
 *                       }
 */
class GiftAndCoPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedCards: [], availableAmount: this.props.cards.length, selectedPlayer: null}
    }

    render() {
        let description = this.getDescription();
        return (
            <ToolWindow title={this.getTitle()} style={{width: "30em"}}>
                <div className="concrete-picker-container">
                    {description && <p>{description}</p>}
                    <Separator step={1}>
                        {this.getText1()}
                    </Separator>
                    <CardPicker
                        disableFuckYous={false}
                        cards={this.props.cards}
                        maxAmount={this.getAmount()}
                        onSelectionChange={(c, a) => this.handleCardChange(c, a)}
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
                        Done
                    </Button>
                </div>
            </ToolWindow>
        );
    }

    enableButton() {
        switch (this.props.mode) {
            case 'gift':
            case 'exchange':
                return (this.state.selectedCards.length === Math.min(2, this.state.availableAmount)
                    && this.state.selectedPlayer);

            case 'surprise-party':
                return (this.state.selectedCards.length === 1 && this.state.selectedPlayer);

            default:
                return false;
        }

    }

    getTitle() {
        switch (this.props.mode) {
            case 'gift':
                return <IconTitle icon="special:gift">Gift</IconTitle>;

            case 'exchange':
                return <IconTitle icon="special:exchange">Exchange</IconTitle>;

            case 'surprise-party':
                return <IconTitle icon="event:surprise-party">Surprise Party</IconTitle>;

            default:
                return null;
        }
    }

    getText1() {
        switch (this.props.mode) {
            case 'gift':
                return "Pick two cards to gift";

            case 'exchange':
                return "Pick two cards to exchange";

            case 'surprise-party':
                return "Pick your gift";

            default:
                return null;
        }
    }

    getText2() {
        switch (this.props.mode) {
            case 'gift':
                return "Pick who will receive them";

            case 'exchange':
                return "Pick your exchange partner";

            case 'surprise-party':
                return 'Pick who will receive it';

            default:
                return null;
        }
    }

    getAmount() {
        switch (this.props.mode) {
            case 'gift':
            case 'exchange':
                return 2;

            case 'surprise-party':
                return 1;

            default:
                return 0;
        }
    }

    getDescription() {
        switch (this.props.mode) {
            case 'surprise-party':
                return "Surprise another player by gifting them one of your cards!";

            default:
                return null;
        }
    }

    handleCardChange(c, a) {
        this.setState({selectedCards: c, availableAmount: a});
    }

    handlePlayerChange(p) {
        this.setState({selectedPlayer: p.length ? p[0] : null});
    }

    handleFinish() {
        if (this.props.onFinish) {
            let indices = [];

            for (let c of this.state.selectedCards) {
                indices.push(this.props.cards.indexOf(c));
            }

            this.props.onFinish({
                target: this.state.selectedPlayer,
                cards: indices
            });
        }
    }
}

export default GiftAndCoPicker;