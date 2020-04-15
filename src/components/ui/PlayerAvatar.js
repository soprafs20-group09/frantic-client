import React, {Component} from 'react';
import "styles/ui/UiElements.scss";
import {getPlayerAvatar} from "utils/api";

/**
 * Renders a round Player Avatar.
 * size: string (em)        - the height and width the avatar should have in em.
 * name: string             - the username for the avatar.
 * active: bool  (optional) - if true, the avatar will show a terracotta glow.
 * style: string (optional) - the avatar style that should be displayed (default: bottts)
 */
class PlayerAvatar extends Component {
    render() {
        return (
            <img
                className={"player-avatar" + (this.props.active ? " active": "")}
                style={this.props.size ? {fontSize: this.props.size} : {}}
                src={getPlayerAvatar(this.props.name, this.props.style)}
                alt={this.props.name}
            />
        );
    }
}

export default PlayerAvatar;