import React, {Component} from 'react';
import "styles/ui/pickers/BasicPickers.scss";
import PlayerAvatar from "components/ui/PlayerAvatar";
import {WindowTransition} from "components/ui/Transitions";

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

    componentDidMount() {
        if (this.props.players.length === 1) {
            this.handlePlayerClick(this.props.players[0]);
        }
    }

    render() {
        let playerItems = [];

        for (let player of this.props.players) {
            playerItems.push(
                <PlayerItem
                    username={player.username}
                    cards={player.cards.length}
                    points={player.points}
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
 * cards: number
 * points: number
 * active: bool
 * disabled: bool
 * onCLick: func
 */
class PlayerItem extends Component {
    constructor(props) {
        super(props);
        this.state = {showStats: false};
    }

    render() {
        const stats =
            <div className="opponent-stats-container" key="player-stats">
                <h2 className="opponent-username">{this.props.username}</h2>
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
                className={
                    "picker-item"
                    + (this.props.active ? " active" : "")
                    + (this.props.disabled ? " disabled" : "")
                }
                onClick={() => this.handleClick()}
                onMouseOver={e => this.handleMouseOver(e)}
                onMouseLeave={() => this.handleMouseLeave()}
            >
                <PlayerAvatar
                    size="3.5em"
                    name={this.props.username}
                    active={this.props.active}
                />
                <p className="picker-name">{this.props.username}</p>
                <WindowTransition
                    mode="relative"
                    trail={0}
                    containerClass="opponent-transition-container"
                >
                    {this.state.showStats && stats}
                </WindowTransition>
            </div>
        );
    }

    handleClick() {
        if (!this.props.disabled && this.props.onClick) {
            this.props.onClick();
        }
    }

    handleMouseOver(e) {
        if (this.leaveTimeout) {
            clearTimeout(this.leaveTimeout);
            this.leaveTimeout = null;
        }
        if (!this.state.showStats) {
            for (let element of document.getElementsByClassName('opponent-transition-container')) {
                if (element.contains(e.target)) {
                    return;
                }
            }
            this.setState({showStats: true});
        }
    }

    handleMouseLeave() {
        if (!this.leaveTimeout) {
            this.leaveTimeout = setTimeout(() => {
                this.leaveTimeout = null;
                this.setState({showStats: false});
            }, 200);
        }
    }
}


PlayerPicker.defaultProps = {
    title: "Pick players"
};

export default PlayerPicker;