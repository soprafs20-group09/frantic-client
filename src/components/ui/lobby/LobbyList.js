import React, {Component} from 'react';
import "styles/ui/LobbyList.scss";
import {animated, Transition} from "react-spring/renderprops";

/**
 * Renders a list of lobbies.
 * PROPS:
 * lobbies: array of objects - the list of lobbies to display. lobbies must be of the following structure:
 *  -name: string
 *  -creator: string
 *  -players: string
 *  -link: string
 */
class LobbyList extends Component {
    render() {
        const fromStyle = {
            margin: '0em 0',
            height: '0em',
            opacity: 0,
            transform: 'translateX(100%)'
        };
        const toStyle = {
            margin: '0.8em 0',
            height: '3em',
            opacity: 1,
            transform: 'translateX(0%)'
        };

        const activeLobbies = this.props.lobbies.filter(l => l.type === 'public' && !l.running);

        return (
            <div className="lobby-list-container">
                <div className="lobby-list-caption-container">
                    <p className="lobby-list-caption c1">Lobby Name</p>
                    <p className="lobby-list-caption c2">Creator</p>
                    <p className="lobby-list-caption c3">Players</p>
                </div>
                <ul className="lobby-list">
                    <Transition
                        native
                        items={activeLobbies}
                        keys={lobby => lobby.lobbyId}
                        from={fromStyle}
                        enter={toStyle}
                        leave={fromStyle}
                        trail={100}
                    >
                        {lobby => style =>
                            <LobbyItem
                                key={lobby.lobbyId}
                                name={lobby.name}
                                creator={lobby.creator}
                                players={lobby.players}
                                link={`/join/${lobby.lobbyId}`}
                                style={style}
                            />
                        }
                    </Transition>
                </ul>
            </div>
        );
    }
}

/**
 * Represents a single entry in the lobby list.
 * PROPS:
 * name: string
 * creator: string
 * players: string
 * style: object
 */
class LobbyItem extends Component {
    render() {
        return (
            <animated.a href={this.props.link}>
                <animated.li className="lobby-item" style={this.props.style}>
                    <p className="lobby-item-text c1">{this.props.name}</p>
                    <p className="lobby-item-text c2">{this.props.creator}</p>
                    <p className="lobby-item-text c3">{this.props.players ? this.props.players.length : '-'}</p>
                </animated.li>
            </animated.a>
        );
    }
}

export default LobbyList;