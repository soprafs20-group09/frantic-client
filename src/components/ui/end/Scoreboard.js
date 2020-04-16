import React, {Component} from 'react';
import "styles/ui/end/Scoreboard.scss";
import "styles/ui/PlayerList.scss";
import PlayerAvatar from "../PlayerAvatar";

/**
 * Renders a scoreboard for end-of-round or game.
 * PROPS:
 * players: object       - object of following structure:
 *  {
 *      "jan": 12,
 *      "jon": 15
 *  }
 *  showWinners: boolean - whether to highlight winners.
 */
class Scoreboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let playerContainers = [];
        let players = [];
        let podium = [];
        for (let username in this.props.players) {
            players.push({
                username: username,
                points: this.props.players[username]
            });
        }

        players.sort((a, b) => {
            return a.points - b.points;
        });

        let rank = 1;

        if (!this.props.showWinners) {
            for (let p of players) {
                playerContainers.push(
                    <div className="rank-container">
                        <div className="rank">
                            {rank + "."}
                        </div>
                    </div>
                );
                playerContainers.push(
                    <li className="player-item scoreboard-item" key={p.username}>
                        <PlayerAvatar
                            name={p.username}
                            style={this.props.avatarType}
                            size="2.2em"
                        />
                        <div className="username-text">
                            {p.username}
                        </div>
                        <div className="points-text">
                            {p.points}
                        </div>
                    </li>
                );
                playerContainers.push(
                    <div className="space-filler">

                    </div>
                );
                rank += 1
            }
            return (
                <ul className="scoreboard-container">
                    {playerContainers}
                </ul>
            );
        } else {
            for (let p of players) {
                if (rank === 1) {
                    podium.push(
                        <li className="podium-item gold">
                            <PlayerAvatar
                                name={p.username}
                                style={this.props.avatarType}
                                size="2.2em"
                            />
                            <div className="podium-text">
                                {p.username}
                            </div>
                            <div className="podium-text">
                                {p.points}
                            </div>
                        </li>
                    );
                    rank += 1
                } else if (rank === 2) {
                    podium.push(
                        <li className="podium-item silver">
                            <PlayerAvatar
                                name={p.username}
                                style={this.props.avatarType}
                                size="2.2em"
                            />
                            <div className="podium-text">
                                {p.username}
                            </div>
                            <div className="podium-text">
                                {p.points}
                            </div>
                        </li>
                    );
                    rank += 1
                } else if (rank === 3) {
                    podium.push(
                        <li className="podium-item bronze">
                            <PlayerAvatar
                                name={p.username}
                                style={this.props.avatarType}
                                size="2.2em"
                            />
                            <div className="podium-text">
                                {p.username}
                            </div>
                            <div className="podium-text">
                                {p.points}
                            </div>
                        </li>
                    );
                    rank += 1
                } else {
                    playerContainers.push(
                        <div className="rank-container">
                            <div className="rank">
                                {rank + "."}
                            </div>
                        </div>
                    );
                    playerContainers.push(
                        <li className="player-item scoreboard-item" key={p.username}>
                            <PlayerAvatar
                                name={p.username}
                                style={this.props.avatarType}
                                size="1em"
                            />
                            <div className="username-text">
                                {p.username}
                            </div>
                            <div className="points-text">
                                {p.points}
                            </div>
                        </li>
                    );
                    playerContainers.push(
                        <div className="space-filler">

                        </div>
                    );
                    rank += 1
                }
            }
            return (
                <ul className="scoreboard-container">
                    <div className="podium-container">
                        {podium}
                    </div>
                    {playerContainers}
                </ul>
            );
        }
    }
}

export default Scoreboard;