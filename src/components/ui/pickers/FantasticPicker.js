import React, {Component} from 'react';
import "styles/ui/pickers/ConcretePickers.scss";
import ToolWindow from "components/ui/ToolWindow";
import ColorNumberPicker from "components/ui/pickers/parts/ColorNumberPicker";
import Separator from "components/ui/Separator";
import Button from "components/ui/Button";
import CardsToPlayersPicker from "components/ui/pickers/parts/CardsToPlayersPicker";
import franticUtils from "utils/franticUtils";
import IconTitle from "components/ui/IconTitle";

/**
 * Shows a dialog that lets the player fill in needed information
 * for Fantastic or Fantastic Four cards.
 * PROPS:
 * withFour: boolean         - if true, will put dialog in "Fantastic Four" mode.
 * IF WITHFOUR:
 * players: array of players - array of distributable players
 *
 * onFinish: func(obj)       - function that is called when user is done
 *                           - param: (either color OR number, players only if withFour)
 *                           {
 *                               color: string
 *                               number: num
 *                               players: {
 *                                   "jan": 2,
 *                                   "sina": 2
 *                               }
 *                           }
 */
class FantasticPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {step: 1, width: '30em', wish: null};
    }

    render() {
        return (
            <ToolWindow
                noScroll
                title={this.getTitle()}
                style={{width: this.state.width, transition: '0.5s'}}
            >
                {this.getContent()}
            </ToolWindow>
        );
    }

    getContent() {
        if (this.state.step === 1) {
            return (
                <div className="concrete-picker-container" key="step-1">
                    <Separator {...this.getStep()}>
                        make your wish
                    </Separator>
                    <ColorNumberPicker
                        withNumbers
                        onSelectionChange={s => this.handleWishChange(s)}
                    />
                    <div className="concrete-picker-spacer"/>
                    <Button
                        width="10em"
                        disabled={!this.state.wish}
                        onClick={() => this.handleClick()}
                    >
                        {this.getButtonText()}
                    </Button>
                </div>
            );
        } else {
            return (
                <div className="concrete-picker-container" key="step-2">
                    <Separator step={2}>
                        distribute four cards
                    </Separator>
                    <CardsToPlayersPicker
                        players={this.props.players}
                        cards={franticUtils.generateBackCards(4)}
                        onFinish={p => this.handleCtpFinish(p)}
                    />
                </div>
            );
        }
    }

    getTitle() {
        return this.props.withFour ?
            <IconTitle icon="special:fantastic-four">Fantastic Four</IconTitle> :
            <IconTitle icon="special:fantastic">Fantastic</IconTitle>;
    }

    getButtonText() {
        return this.props.withFour ? "Next" : "Done";
    }

    getStep() {
        return this.props.withFour ? {step: 1} : {};
    }

    handleWishChange(w) {
        this.setState({wish: w});
    }

    buildWishObject() {
        if (isNaN(parseInt(this.state.wish))) {
            return {color: this.state.wish};
        } else {
            return {number: parseInt(this.state.wish)};
        }
    }

    handleClick() {
        if (this.props.withFour) {
            this.setState({step: 2, width: '42em'});
        } else if (this.props.onFinish) {
            this.props.onFinish(this.buildWishObject());
        }
    }

    handleCtpFinish(players) {
        if (this.props.onFinish) {
            let distribution = {};
            for (let p of players) {
                if (p.cards.length > 0) {
                    distribution[p.username] = p.cards.length;
                }
            }

            this.props.onFinish({
                ...this.buildWishObject(),
                targets: distribution
            });
        }
    }
}

FantasticPicker.defaultProps = {
    withFour: false,
    players: []
};

export default FantasticPicker;