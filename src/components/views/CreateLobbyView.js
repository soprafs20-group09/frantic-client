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
import {WindowTransition} from "components/ui/Transitions";
import ChatWindow from "components/ui/ChatWindow";
import ChatItem from "components/ui/chat/ChatItem";
import {api, getPlayerAvatar} from "utils/api";
import Spinner from "components/ui/Spinner";
import SockClient from "utils/sockClient";

class CreateLobbyView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatItems: [
                <ChatItem key={Math.random() + "a"} sender="sina" icon={getPlayerAvatar('sina')}>is everyone
                    ready?</ChatItem>,
                <ChatItem key={Math.random() + "b"} sender="kyrill" icon={getPlayerAvatar('kyrill')}>yee</ChatItem>,
                <ChatItem key={Math.random() + "c"} sender="jan" icon={getPlayerAvatar('jan')}>ofc</ChatItem>,
                <ChatItem key={Math.random() + "d"} sender="joe" icon={getPlayerAvatar('joe')}>1 min pls</ChatItem>,
                <ChatItem key={Math.random() + "e"} style="event">Game starting in 30 seconds.</ChatItem>,
                <ChatItem key={Math.random() + "f"} sender="joe" icon={getPlayerAvatar('joe')}>ok ready!</ChatItem>
            ]
        };
    }

    render() {
        return (
            <AppContainer withBack withHelp>
                <WindowTransition>
                    {
                        this.state.loading ? <Spinner key="spinner"/> :
                            (this.state.username ? this.getMainWindow() : this.getUsernameWindow())}
                </WindowTransition>
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
        const spacingStyle = {marginBottom: '1.8em'};

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
                    <Window key="LobbyWindow" title={this.state.lobbyName} width="48em" height="41.2em">
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
                                <Button
                                    disabled={true}
                                    width="100%"
                                >
                                    Start Game
                                </Button>
                            </div>
                            <div className="createlobby-window-column">
                                <Header>Players</Header>
                                <PlayerList
                                    players={players}
                                    adminMode={true}
                                />
                            </div>
                        </div>
                    </Window>
                </div>
                <div className="createlobby-column chat">
                    <ChatWindow onSend={msg => this.handleSend(msg)}>
                        {this.state.chatItems}
                    </ChatWindow>
                </div>
            </div>

        );
    }

    handleSend(msg) {
        try {
            if (SockClient.isConnected()) {
                SockClient.send(`/app/lobby/${this.state.lobbyId}/chat`, {message: msg});
            }
        }
        catch (ignored) {
        }
    }

    handleChatMessage(msg) {
        let newItem =
            <ChatItem
                style={msg.type}
                sender={msg.username}
                icon={getPlayerAvatar(msg.username)}
                key={new Date().getTime()}
            >
                {msg.message}
            </ChatItem>;
        this.setState({
            chatItems: this.state.chatItems.concat(newItem)
        });
    }

    async confirmUsername(username) {
        this.setState({loading: true});
        try {
            let response = await api.post('/lobbies', {username: username});
            this.setState({username: response.data.username, lobbyName: response.data.name, authToken: response.data.token});
            SockClient.onRegister(r => this.onSocketRegistered(r));
            SockClient.connectAndRegister(response.data.token);
            SockClient.onLobbyMessage('/chat', r => this.handleChatMessage(r));
        }
        catch (ignore) {
            console.error(ignore);
        }
    }

    onSocketRegistered(response) {
        this.setState({loading: false, lobbyId: response.lobbyId});
    }
}

export default CreateLobbyView;