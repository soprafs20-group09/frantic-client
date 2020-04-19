import React, {Component} from 'react';
import "styles/ui/pickers/ConcretePickers.scss";
import ToolWindow from "components/ui/ToolWindow";
import PlayerPicker from "components/ui/pickers/parts/PlayerPicker";
import Separator from "components/ui/Separator";
import Button from "components/ui/Button";
import ColorNumberPicker from "components/ui/pickers/parts/ColorNumberPicker";
import IconTitle from "components/ui/IconTitle";

/**
 * This component allows the player to pick a player to skip
 * maxCards: number                  - the amount of cards the player is holding
 * players: array of player objects  - the players to be selectable (players with >= maxCards are automatically disabled)
 * onFinish: func(string)            - a function to be called when the user is done.
 *                                   - parameter is the username of the selected player.
 */
class EqualityPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {players: [], wish: null, selectedPlayer: null};
    }

    componentDidMount() {
        let players = JSON.parse(JSON.stringify(this.props.players));
        for (let p of players) {
            p.disabled = p.cards.length >= this.props.maxCards;
        }
        this.setState({players: players});
    }

    render() {
        return (
            <ToolWindow
                noScroll
                title={<IconTitle icon="special:equality">Equality</IconTitle>}
                style={{width: "30em"}}
            >
                <div className="concrete-picker-container">
                    <Separator step={1}>
                        Make your wish
                    </Separator>
                    <ColorNumberPicker
                        onSelectionChange={w => this.handleWishChange(w)}
                    />
                    <div className="concrete-picker-spacer"/>
                    <Separator step={2}>
                        Pick a player to equalize
                    </Separator>
                    <PlayerPicker
                        players={this.state.players}
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

    handleWishChange(w) {
        this.setState({wish: w});
    }

    handlePlayerChange(p) {
        this.setState({selectedPlayer: p.length ? p[0] : null});
    }

    enableButton() {
        return this.state.wish !== null;
    }

    handleFinish() {
        if (this.props.onFinish) {
            let result = this.buildWishObject();
            if (this.state.selectedPlayer) {
                result.target = this.state.selectedPlayer;
            }
            this.props.onFinish(result);
        }
    }

    buildWishObject() {
        if (isNaN(parseInt(this.state.wish))) {
            return {color: this.state.wish};
        }
        else {
            return {number: parseInt(this.state.wish)};
        }
    }

}

export default EqualityPicker;