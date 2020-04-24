import React, {Component} from 'react';
import "styles/ui/end/EndWindow.scss";
import Window from "components/ui/Window";
import Scoreboard from "components/ui/end/Scoreboard";
import Separator from "components/ui/Separator";

/**
 * This window shows essential end of round or game information.
 * PROPS:
 * mode: string     - 'round' or 'game'.
 * players: array   - list of players to show in the scoreboard
 * children: JSX    - actions to show below the scoreboard.
 */
class EndWindow extends Component {
    render() {
        return (
            <Window title={"End of " + this.props.mode} width="35em" height="41.2em">
                <p className="end-p">
                    {this.getText()}
                </p>
                <Separator/>
                <div className="end-scoreboard-container">
                    <Scoreboard players={this.props.players} showWinners={this.props.mode === 'game'} pointLimit={113}/>
                </div>
                <div className="end-actions-container">
                    {this.props.children}
                </div>
            </Window>
        );
    }

    getText() {
        if (this.props.mode === 'round') {
            return "This round is over! Watch everyone's standings and wait for the next round to start!";
        } else {
            return "The game is over! See who won below, and challenge them to a rematch!";
        }
    }
}

export default EndWindow;