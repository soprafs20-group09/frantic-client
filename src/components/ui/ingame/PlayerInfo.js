import React, {Component} from "react";
import IconTitle from "components/ui/IconTitle";
import PlayerAvatar from "components/ui/PlayerAvatar";
import InlineSVG from "react-inlinesvg";
import Skip from "assets/frantic/special-cards/skip.svg";
import {WindowTransition} from "components/ui/Transitions";

/**
 * Renders a player avatar with more info on hover.
 * PROPS:
 * mode: string         - top, left, right, bottom: makes the hover info appear on the opposite side.
 * username: string
 * cards: number        - the amount of cards the player has
 * points: number
 * skipped: bool
 * admin: bool
 * active: bool
 * avatarSize: string   - the size of the shown avatar icon.
 */
class PlayerInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {showStats: false};
    }

    render() {
        let name = this.props.username;
        if (this.props.admin) {
            name = <IconTitle icon="misc:crown">{name}</IconTitle>;
        }

        const stats = <div className={"opponent-stats-container " + this.props.mode} key="player-stats">
            <h2 className="opponent-username">{name}</h2>
            <table className="opponent-stats">
                <tbody>
                <tr>
                    <th>Cards</th>
                    <td>{this.props.cards}</td>
                </tr>
                <tr>
                    <th>Points</th>
                    <td>{this.props.points}</td>
                </tr>
                </tbody>
            </table>
        </div>;

        return (
            <div
                className={"opponent-info " + this.props.mode}
                onMouseOver={() => this.handleMouseOver()}
                onMouseLeave={() => this.handleMouseLeave()}
            >
                <div className="opponent-avatar-container">
                    <PlayerAvatar
                        size={this.props.avatarSize}
                        name={this.props.username}
                        active={this.props.active}
                    />
                    {this.props.skipped &&
                    <InlineSVG
                        className="opponent-skip"
                        src={Skip}
                        style={{
                            width: this.props.avatarSize,
                            height: this.props.avatarSize
                        }}
                    />}
                </div>
                <WindowTransition mode='relative' trail={0}>
                    {this.state.showStats && stats}
                </WindowTransition>
            </div>
        );
    }

    handleMouseOver() {
        if (this.leaveTimeout) {
            clearTimeout(this.leaveTimeout);
            this.leaveTimeout = null;
        }
        if (!this.state.showStats) {
            this.setState({showStats: true});
        }
    }

    handleMouseLeave() {
        if (!this.leaveTimeout) {
            this.leaveTimeout = setTimeout(() => {
                this.leaveTimeout = null;
                this.setState({showStats: false});
            }, 500);
        }
    }
}

PlayerInfo.defaultProps = {
    avatarSize: "4.5em"
};

export default PlayerInfo;