import React, {Component} from 'react';
import "styles/ui/pickers/Pickers.scss";
import PlayerAvatar from "components/ui/PlayerAvatar";

/**
 * This component allows the user to pick a number of players.
 * PROPS:
 * players: array of objects with following props:
 *  - username: string
 *  - disabled : bool              - if true, this player won't be selectable
 *  maxSelectAmount: number        - a limit for how many players can be selected.
 *  onSelectionChange: func(array) - function that is called every time the selection changes
 *                                   params: usernames of all selected players
 */
class PlayerPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedPlayers: []};
    }

    render() {
        let playerItems = [];

        for (let player of this.props.players) {
            playerItems.push(
                <PlayerItem
                    username={player.username}
                    active={this.state.selectedPlayers.includes(player.username)}
                    disabled={player.disabled}
                    onClick={() => this.handlePlayerClick(player)}
                    key={player.username}
                />
            );
        }

        return (
            <div className="picker-container">
                {playerItems}
            </div>
        );
    }

    handlePlayerClick(player) {
        let i = this.state.selectedPlayers.indexOf(player.username);
        let newPlayers = this.state.selectedPlayers.slice();
        if (i >= 0) {
            newPlayers.splice(i, 1);
        } else {
            newPlayers.push(player.username)
        }

        // remove first selected player if array gets too long
        if (newPlayers.length > this.props.maxAmount) {
            newPlayers.shift();
        }

        this.setState({selectedPlayers: newPlayers});

        if (this.props.onSelectionChange) {
            this.props.onSelectionChange(newPlayers);
        }
    }
}

PlayerPicker.defaultProps = {
    players: [],
    maxAmount: 1
};

/**
 * PROPS:
 * username: string
 * active: bool
 * disabled: bool
 * onCLick: func
 */
class PlayerItem extends Component {
    render() {
        return (
            <div
                className={
                    "picker-item"
                    + (this.props.active ? " active" : "")
                    + (this.props.disabled ? " disabled" : "")
                }
                onClick={() => this.handleClick()}
            >
                <PlayerAvatar
                    size="3.5em"
                    name={this.props.username}
                    active={this.props.active}
                />
                <p className="picker-name">{this.props.username}</p>
            </div>
        );
    }

    handleClick() {
        if (!this.props.disabled && this.props.onClick) {
            this.props.onClick();
        }
    }
}


PlayerPicker.defaultProps = {
    title: "Pick players"
};

export default PlayerPicker;