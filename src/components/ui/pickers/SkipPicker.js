import React, {Component} from 'react';
import "styles/ui/pickers/ConcretePickers.scss";
import ToolWindow from "components/ui/ToolWindow";
import PlayerPicker from "components/ui/pickers/parts/PlayerPicker";
import Separator from "components/ui/Separator";
import Button from "components/ui/Button";

/**
 * This component allows the player to pick a player to skip
 * players: array of player objects  - the players to be selectable (skipped players are automatically disabled)
 * onFinish: func(string)            - a function to be called when the user is done.
 *                                   - parameter is the username of the selected player.
 */
class SkipPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {players: [], selectedPlayer: null};
    }

    componentDidMount() {
        let players = JSON.parse(JSON.stringify(this.props.players));
        for (let p of players) {
            p.disabled = p.skipped;
        }
        this.setState({players: players});
    }

    render() {
        return (
            <ToolWindow
                noScroll
                title="Skip"
                style={{width: "30em"}}
            >
                <div className="concrete-picker-container">
                    <Separator>
                        Pick a player to skip
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

    handlePlayerChange(p) {
        this.setState({selectedPlayer: p.length ? p[0] : null});
    }

    enableButton() {
        return this.state.selectedPlayer !== null;
    }

    handleFinish() {
        if (this.props.onFinish) {
            this.props.onFinish(this.state.selectedPlayer);
        }
    }

}

export default SkipPicker;