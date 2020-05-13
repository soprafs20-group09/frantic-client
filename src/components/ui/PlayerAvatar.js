import React, {Component} from 'react';
import "styles/ui/UiElements.scss";
import {getPlayerAvatar} from "utils/api";
import sessionManager from "utils/sessionManager";

/**
 * Renders a round Player Avatar.
 * size: string (em)        - the height and width the avatar should have in em.
 * name: string             - the username for the avatar.
 * active: bool  (optional) - if true, the avatar will show a terracotta glow.
 * style: string (optional) - the avatar style that should be displayed (default: bottts)
 */
class PlayerAvatar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: getPlayerAvatar(this.props.name, this.props.style),
            reloads: 0,
            fallback: sessionManager.avatarBlacklist.includes(this.props.name)
        }
    }

    render() {
        if (!this.state.fallback) {
            return (
                <img
                    className={"player-avatar" + (this.props.active ? " active" : "")}
                    style={this.props.size ? {fontSize: this.props.size} : {}}
                    src={this.state.url}
                    onError={() => this.handleError()}
                />
            );
        } else {
            return (
                <div
                    className={"player-avatar text" + (this.props.active ? " active" : "")}
                    style={this.props.size ? {fontSize: this.props.size} : {}}
                >
                    <span>
                        {this.props.name[0]}
                    </span>
                </div>
            );
        }
    }

    handleError() {
        setTimeout(() => {
                if (this.state.reloads < 1) {
                    this.setState({
                        url: this.state.url + `?t=${new Date().getTime()}`,
                        reloads: this.state.reloads + 1
                    });
                } else {
                    this.setState({
                        fallback: true
                    });
                    // add this name to the session blacklist
                    sessionManager.avatarBlacklist = sessionManager.avatarBlacklist.concat(this.props.name);
                }
            },
            1000);
    }
}

export default PlayerAvatar;