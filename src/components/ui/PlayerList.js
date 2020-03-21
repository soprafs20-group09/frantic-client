import React, {Component} from 'react';
import {animated, Transition} from "react-spring/renderprops";
import InlineSVG from "react-inlinesvg";
import Crown from "assets/icons/crown.svg";
import Cross from "assets/icons/cross.svg";
import {getPlayerAvatar} from "utils/api";
import 'styles/ui/PlayerList.scss';

/**
 * Renders a list of players.
 * PROPS:
 * players: array            - an array of player objects, they should have the following form:
 *  - name: string             - the display name of the player.
 *  - color: string (optional) - the color the player name should have.
 *  - admin: bool   (optional) - shows a crown icon next to this user if true.
 *  adminMode: bool          - sets whether to show player kick icons
 *  onKick: func(player) - a function that is called when a player is to be kicked.
 *  avatarType: string       - the type of DiceBear avatar that should be used, see https://avatars.dicebear.com/ (default: 'bottts')
 */
class PlayerList extends Component {
    render() {
        const fromStyle = {
            margin: 0,
            height: 0,
            opacity: 0,
            transform: 'translateX(100%)'
        };
        const toStyle = {
            margin: '10px 0',
            height: 55,
            opacity: 1,
            transform: 'translateX(0%)'
        };
        const avatarType = this.props.avatarType || 'bottts';

        return (
            <ul className="player-list">
                <Transition
                    items={this.props.players}
                    keys={item => item.name}
                    from={fromStyle}
                    enter={toStyle}
                    leave={fromStyle}
                    trail={200}>
                    {player => style => (
                        <PlayerItem
                            key={player.name}
                            name={player.name}
                            color={player.color}
                            admin={player.admin}
                            kickable={this.props.adminMode}
                            onKick={() => this.handleKick(player)}
                            avatarType={avatarType}
                            style={style}
                        />
                    )}
                </Transition>
            </ul>
        );
    }

    handleKick(player) {
        if (this.props.onKick) {
            this.props.onKick(player);
        }
    }
}

/**
 * Represents one player item
 * PROPS:
 * name: string
 * color: string
 * avatarType: string
 * admin: bool
 * kickable: bool
 * style: object
 */
class PlayerItem extends Component {
    render() {
        let decor;
        if (this.props.admin) {
            decor =
                <InlineSVG
                    src={Crown}
                    className="player-item-decor"
                />;
        } else if (this.props.kickable) {
            decor =
                <InlineSVG
                    src={Cross}
                    className="player-item-decor clickable"
                    onClick={() => this.onClick()}
                />
        }

        return (
            <animated.li className="player-item" style={this.props.style}>
                <img
                    className="player-item-avatar"
                    src={getPlayerAvatar(this.props.name, this.props.avatarType)}/>
                <p className="player-item-text" style={{color: this.props.color}}>{this.props.name}</p>
                {decor}
            </animated.li>
        );
    }

    onClick() {
        this.props.onKick(this.props.name);
    }
}

export default PlayerList;