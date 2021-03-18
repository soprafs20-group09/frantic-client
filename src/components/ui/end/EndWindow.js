import React, {Component} from 'react';
import "styles/ui/end/EndWindow.scss";
import Window from "components/ui/Window";
import Scoreboard from "components/ui/end/Scoreboard";
import Separator from "components/ui/Separator";
import uiUtils from "utils/uiUtils";
import InlineSVG from "react-inlinesvg";

/**
 * This window shows essential end of round or game information.
 * PROPS:
 * mode: string       - 'round' or 'game'.
 * players: array     - list of players to show in the scoreboard
 * changes: array     - point changes for players
 * icon: string       - an icon in the format from:icon to show left of the text.
 * message: string    - a message to show above the scoreboard.
 * pointLimit: number - a point limit to display in the scoreboard.
 * children: JSX      - actions to show below the scoreboard.
 */
class EndWindow extends Component {
    render() {
        return (
            <Window title={"End of " + this.props.mode} width="35em" height="41.2em">
                {this.getText()}
                <Separator/>
                <div className="end-scoreboard-container">
                    <Scoreboard
                        players={this.props.players}
                        changes={this.props.changes}
                        showWinners={this.props.mode === 'game'}
                        pointLimit={this.props.pointLimit}
                    />
                </div>
                <div className="end-actions-container">
                    {this.props.children}
                </div>
            </Window>
        );
    }

    getText() {
        return (
            <div className="end-text-container">
                {
                    this.props.icon &&
                    <InlineSVG
                        src={uiUtils.resolveIconString(this.props.icon)}
                        className="end-icon"
                    />
                }
                <p className="end-p">
                    {this.props.message}
                </p>
            </div>
        );
    }
}

export default EndWindow;