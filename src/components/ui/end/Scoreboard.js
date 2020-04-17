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

        let same = false;

        for (let i = 0; i < players.length; i++) {
            if (same) {
                players[i]["rank"] = i;
                same = false;
            } else {
                players[i]["rank"] = i+1;
            }
            if (i+1 < players.length && players[i]["points"] === players[i+1]["points"]) {
                same = true;
            }
        }

        if (!this.props.showWinners) {
            for (let p of players) {
                playerContainers.push(
                    <div className="rank-container">
                        <div className="rank">
                            {p.rank + "."}
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
            }
            return (
                <ul className="scoreboard-container">
                    {playerContainers}
                </ul>
            );
        } else {
            for (let p of players) {
                if (p.rank === 1) {
                    podium.push(
                        <li className="podium-item gold">
                            <PlayerAvatar
                                name={p.username}
                                style={this.props.avatarType}
                                size="4.84em"
                            />
                            <div className="podium-text">
                                {p.username}
                            </div>
                            <div className="podium-text">
                                {p.points}
                            </div>
                        </li>
                    );
                } else if (p.rank === 2) {
                    podium.push(
                        <li className="podium-item silver">
                            <PlayerAvatar
                                name={p.username}
                                style={this.props.avatarType}
                                size="4.84em"
                            />
                            <div className="podium-text">
                                {p.username}
                            </div>
                            <div className="podium-text">
                                {p.points}
                            </div>
                        </li>
                    );
                } else if (p.rank === 3) {
                    podium.push(
                        <li className="podium-item bronze">
                            <PlayerAvatar
                                name={p.username}
                                style={this.props.avatarType}
                                size="4.84em"
                            />
                            <div className="podium-text">
                                {p.username}
                            </div>
                            <div className="podium-text">
                                {p.points}
                            </div>
                        </li>
                    );
                } else {
                    playerContainers.push(
                        <div className="rank-container">
                            <div className="rank">
                                {p.rank + "."}
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