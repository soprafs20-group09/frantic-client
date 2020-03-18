import React, {Component} from 'react';
import AppContainer from "components/ui/AppContainer";

import 'styles/views/CreateLobbyView.scss';
import Window from "components/ui/Window";
import Input from "components/ui/Input";
import Header from "components/ui/Header";
import SingleSelect from "components/ui/SingleSelect";
import Switch from "components/ui/Switch";
import Button from "components/ui/Button";
import PlayerList from "components/ui/PlayerList";
import ChooseUsernameWindow from "components/ChooseUsernameWindow";
import {animated, Transition} from "react-spring/renderprops";
import ChatWindow from "components/ui/ChatWindow";

class CreateLobbyView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const fromStyle = {
            position: 'absolute',
            opacity: 0,
            transform: 'translateX(20%)'
        };
        const enterStyle = {
            position: 'absolute',
            opacity: 1,
            transform: 'translateX(0%)'
        };
        const leaveStyle = {
            position: 'absolute',
            opacity: 0,
            transform: 'translateX(-20%)'
        };

        let content = this.state.username ? this.getMainWindow() : this.getUsernameWindow();

        return (
            <AppContainer withBack withHelp>
                <Transition
                    items={content}
                    keys={item => item.key}
                    from={fromStyle}
                    enter={enterStyle}
                    leave={leaveStyle}
                    trail={200}
                >
                    {item => style => <animated.div style={style}>{item}</animated.div>}
                </Transition>
            </AppContainer>
        );
    }

    getUsernameWindow() {
        return (
            <ChooseUsernameWindow
                key="UsernameWindow"
                onConfirm={u => this.confirmUsername(u)}
            />
        );
    }

    getMainWindow() {
        const spacingStyle = {marginBottom: '30px'};

        const durationItems = [
            {
                name: 'Short',
                value: 'short'
            },
            {
                name: 'Medium',
                value: 'medium'
            },
            {
                name: 'Long',
                value: 'long'
            }
        ];
        const players = [
            {name: "sina"},
            {name: "kyrill"},
            {name: "davide"},
            {name: "jan", admin: true},
            {name: "remy"},
            {name: "hans"},
            {name: "joe"},
            {name: "mama"},
        ];

        return (
            <div className="createlobby-container">
                <div className="createlobby-column main">
                    <Window key="LobbyWindow" title={this.state.lobbyName} width="870px">
                        <div className="createlobby-window-container">
                            <div className="createlobby-window-column">
                                <Header>Settings</Header>
                                <Input
                                    style={spacingStyle}
                                    title="Join Link"
                                    action="Copy"
                                    readOnly={true}
                                />
                                <Input
                                    style={spacingStyle}
                                    title="Lobby Name"
                                    initialValue={this.state.lobbyName}
                                />
                                <SingleSelect
                                    style={spacingStyle}
                                    title="Game Duration"
                                    items={durationItems}
                                    initialValue="short"
                                />
                                <Switch
                                    style={spacingStyle}
                                    title="Public"
                                    on="yes"
                                    off="no"
                                    initialValue={true}
                                />
                                <Button disabled width="100%">Start Game</Button>
                            </div>
                            <div className="createlobby-window-column">
                                <Header>Players</Header>
                                <PlayerList
                                    players={players}
                                    adminMode={false}
                                />
                            </div>
                        </div>
                    </Window>
                </div>
                <div className="createlobby-column chat">
                    <ChatWindow/>
                </div>
            </div>

        );
    }

    confirmUsername(username) {
        this.setState({username: username, lobbyName: `${username}'s lobby`});
    }
}

export default CreateLobbyView;