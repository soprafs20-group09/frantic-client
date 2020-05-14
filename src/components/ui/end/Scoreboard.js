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
 * changes: object       - object of following structure:
 *  {
 *      "jan": 0,
 *      "jon": 5
 *  }
 *  showWinners: boolean - whether to highlight winners.
 */
class Scoreboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        //calculate ranks
        let points = [];

        for (let username in this.props.players) {
            points.push(this.props.players[username]);
        }

        let sorted = points.slice().sort(function(a,b){return a-b});
        let ranks = points.map(function(v){ return sorted.indexOf(v)+1 });

        //separate player information and add ranks & round-points
        let players = [];
        let i = 0;

        for (let username in this.props.players) {
            players.push({
                username: username,
                points: this.props.players[username],
                rank: ranks[i],
                change: this.props.changes[username]
            });
            i++;
        }

        //sort based on rank (may contain duplicates)
        function compare(a,b) {
            if (a.rank < b.rank)
                return -1;
            if (a.rank > b.rank)
                return 1;
            return 0;
        }
        players.sort(compare);

        //give unique rank (no duplicates)
        for (i = 0; i < players.length; i++) {
            players[i].absoluteRank = i;
        }

        let playerContainers = [];
        let podium = [];

        if (!this.props.showWinners) {
            playerContainers.push(
                <div className="point-limit-container">
                    {"point limit: " + this.props.pointLimit}
                </div>
            );
            playerContainers.push(
                <div className="player-list-caption-container">
                    <p className="player-list-caption c1">rank</p>
                    <p className="player-list-caption c2">player</p>
                    <p className="player-list-caption c3">total</p>
                    <p className="player-list-caption c4">round</p>
                </div>
            );
            for (let p of players) {
                playerContainers.push(
                    <li className="scoreboard-item-container" key={p.username}>
                        <div className="rank">
                            {p.rank + "."}
                        </div>
                        <div className="player-item scoreboard-item" >
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
                            {p.change >= 50 &&
                                <div className="change-text-over-50">
                                    {"+" + p.change}
                                </div>
                            }
                            {50 > p.change && p.change >= 30 &&
                                <div className="change-text-over-30">
                                    {"+" + p.change}
                                </div>
                            }
                            {30 > p.change && p.change >= 15 &&
                                <div className="change-text-over-15">
                                    {"+" + p.change}
                                </div>
                            }
                            {15 > p.change && p.change >= 1 &&
                                <div className="change-text-over-0">
                                    {"+" + p.change}
                                </div>
                            }
                            {(p.change === 0) &&
                                <div className="change-text-0">
                                    {"+" + p.change}
                                </div>
                            }
                            {0 > p.change &&
                                <div className="change-text-under-0">
                                    {p.change}
                                </div>
                            }
                        </div>
                    </li>
                );
            }
            return (
                <ul className="scoreboard-container">
                    {playerContainers}
                </ul>
            );
        } else {
            playerContainers.push(
                <div className="player-list-caption-container">
                    <p className="player-list-caption c1">rank</p>
                    <p className="player-list-caption c2">player</p>
                    <p className="player-list-caption c3">total</p>
                    <p className="player-list-caption c4">round</p>
                </div>
            );
            for (let p of players) {
                if (p.rank === 1 && p.absoluteRank < 3) {
                    podium.push(
                        <li className="podium-item">
                            <div className="avatar-container">
                                <PlayerAvatar
                                    name={p.username}
                                    style={this.props.avatarType}
                                    size="3.6em"
                                />
                            </div>
                            <li className="podium-text-container gold gold-height">
                                <div className="rank-text gold-margin">
                                    {p.rank + "."}
                                </div>
                                <div className="podium-text">
                                    {p.username}
                                </div>
                                <div className="podium-text">
                                    {p.points + " points"}
                                </div>
                                {0 > p.change &&
                                    <div className="podium-text-bottom">
                                        {p.change}
                                    </div>
                                }
                                {p.change >= 0 &&
                                    <div className="podium-text-bottom">
                                        {"+" + p.change}
                                    </div>
                                }
                            </li>
                        </li>
                    );
                } else if (p.rank === 2 && p.absoluteRank < 3) {
                    podium.push(
                        <li className="podium-item">
                            <div className="avatar-container">
                                <PlayerAvatar
                                    name={p.username}
                                    style={this.props.avatarType}
                                    size="3.6em"
                                />
                            </div>
                            <li className="podium-text-container silver silver-height">
                                <div className="rank-text silver-margin">
                                    {p.rank + "."}
                                </div>
                                <div className="podium-text">
                                    {p.username}
                                </div>
                                <div className="podium-text">
                                    {p.points + " points"}
                                </div>
                                {0 > p.change &&
                                    <div className="podium-text-bottom">
                                        {p.change}
                                    </div>
                                }
                                {p.change >= 0 &&
                                    <div className="podium-text-bottom">
                                        {"+" + p.change}
                                    </div>
                                }
                            </li>
                        </li>
                    );
                } else if (p.rank === 3 && p.absoluteRank < 3) {
                    podium.push(
                        <li className="podium-item">
                            <div className="avatar-container">
                                <PlayerAvatar
                                    name={p.username}
                                    style={this.props.avatarType}
                                    size="3.6em"
                                />
                            </div>
                            <li className="podium-text-container bronze bronze-height">
                                <div className="rank-text">
                                    {p.rank + "."}
                                </div>
                                <div className="podium-text">
                                    {p.username}
                                </div>
                                <div className="podium-text">
                                    {p.points + " points"}
                                </div>
                                {0 > p.change &&
                                    <div className="podium-text-bottom">
                                        {p.change}
                                    </div>
                                }
                                {p.change >= 0 &&
                                    <div className="podium-text-bottom">
                                        {"+" + p.change}
                                    </div>
                                }
                            </li>
                        </li>
                    );
                } else {
                    playerContainers.push(
                        <li className="scoreboard-item-container" key={p.username}>
                            <div className="rank">
                                {p.rank + "."}
                            </div>
                            <div className="player-item scoreboard-item" >
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
                                {p.change >= 50 &&
                                    <div className="change-text-over-50">
                                        {"+" + p.change}
                                    </div>
                                }
                                {50 > p.change && p.change >= 30 &&
                                    <div className="change-text-over-30">
                                        {"+" + p.change}
                                    </div>
                                }
                                {30 > p.change && p.change >= 15 &&
                                    <div className="change-text-over-15">
                                        {"+" + p.change}
                                    </div>
                                }
                                {15 > p.change && p.change >= 1 &&
                                    <div className="change-text-over-0">
                                        {"+" + p.change}
                                    </div>
                                }
                                {(p.change === 0) &&
                                    <div className="change-text-0">
                                        {"+" + p.change}
                                    </div>
                                }
                                {0 > p.change &&
                                    <div className="change-text-under-0">
                                        {p.change}
                                    </div>
                                }
                            </div>
                        </li>
                    );
                }
            }

            //reorder podium
            let third = podium.pop();
            let second = podium.pop();
            let first = podium.pop();
            podium.push(second);
            podium.push(first);
            podium.push(third);

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