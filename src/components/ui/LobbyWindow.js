import React, {Component} from 'react';
import Window from "components/ui/Window";
import Header from "components/ui/Header";
import Input from "components/ui/Input";
import SingleSelect from "components/ui/SingleSelect";
import Switch from "components/ui/Switch";
import Button from "components/ui/Button";
import PlayerList from "components/ui/PlayerList";
import ChatWindow from "components/ui/ChatWindow";
import Spinner from "components/ui/Spinner";
import sessionManager from "utils/sessionManager";
import sockClient from "utils/sockClient";
import ChatItem from "components/ui/chat/ChatItem";
import {getPlayerAvatar} from "utils/api";
import {withRouter} from "react-router-dom";
import ErrorBox from "components/ui/ErrorBox";
import {WindowTransition} from "components/ui/Transitions";

/**
 * This component renders the lobby settings window,
 * as well as a chat window next to it.
 * PROPS:
 * adminMode: boolean - sets if values should be editable for the user.
 * authToken: string  - sets the authToken that should be used to connect to the backend.
 */
class LobbyWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            chatItems: [],
            players: [],
            settings: {},
            joinLink: `${window.location.origin}/join/${sessionManager.lobbyId}`
        };
    }

    componentDidMount() {
        sockClient.onLobbyMessage('/chat', r => this.handleChatMessage(r));
        sockClient.onLobbyMessage('/lobby-state', r => this.handleLobbyUpdate(r));
        sockClient.onDisconnect( r => this.handleDisconnect(r));
        sockClient.onRegister(r => this.handleSocketRegister(r));
        sockClient.connectAndRegister(this.props.authToken);
        sessionManager.token = undefined;
    }

    componentWillUnmount() {
        sockClient.clearDisconnectSubscriptions();
        sockClient.clearMessageSubscriptions();
        sockClient.disconnect();
    }

    render() {
        const spacingStyle = {marginBottom: '1.8em'};
        let content;

        if (this.state.error) {
            content = (
                <ErrorBox
                    key="error-box"
                    title={this.state.error.title}
                    maxWidth="50vw"
                >
                    {this.state.error.description}
                </ErrorBox>
            );
        } else if (this.state.loading) {
            content = <Spinner key="spinner"/>;
        } else {
            content = (
                <div className="lobby-container" key="lobby-window">
                    <div className="lobby-column main">
                        <Window key="LobbyWindow" title={this.state.settings.lobbyName} width="48em" height="41.2em">
                            <div className="lobby-window-container">
                                <div className="lobby-window-column">
                                    <Header>Settings</Header>
                                    <Input
                                        style={spacingStyle}
                                        title="Join Link"
                                        action="Copy"
                                        readOnly={true}
                                        initialValue={this.state.joinLink}
                                        onActionClick={() => this.handleLinkCopy()}
                                    />
                                    <Input
                                        style={spacingStyle}
                                        title="Lobby Name"
                                        disabled={!this.props.adminMode}
                                        initialValue={this.state.settings.lobbyName}
                                        onChange={v => this.handleSettingsUpdate({lobbyName: v})}
                                    />
                                    <SingleSelect
                                        style={spacingStyle}
                                        title="Game Duration"
                                        items={this.state.settings.durationItems}
                                        disabled={!this.props.adminMode}
                                        initialValue={this.state.settings.duration}
                                        onValueChanged={v => this.handleSettingsUpdate({duration: v})}
                                    />
                                    <Switch
                                        style={spacingStyle}
                                        title="Public"
                                        on="yes"
                                        off="no"
                                        disabled={!this.props.adminMode}
                                        initialValue={this.state.settings.publicLobby}
                                        onSwitch={v => this.handleSettingsUpdate({publicLobby: v})}
                                    />
                                    <Button
                                        disabled={!this.props.adminMode || this.state.players.length < 2}
                                        width="100%"
                                    >
                                        Start Game
                                    </Button>
                                </div>
                                <div className="lobby-window-column">
                                    <Header>Players</Header>
                                    <PlayerList
                                        players={this.state.players}
                                        adminMode={this.props.adminMode}
                                        onKick={p => this.handleKick(p)}
                                    />
                                </div>
                            </div>
                        </Window>
                    </div>
                    <div className="lobby-column chat">
                        <ChatWindow onSend={msg => this.handleSend(msg)}>
                            {this.state.chatItems}
                        </ChatWindow>
                    </div>
                </div>
            );
        }

        return (
            <WindowTransition>
                {content}
            </WindowTransition>
        );
    }

    handleKick(player) {
        try {
            sockClient.sendToLobby('/kick', {username: player});
        } catch {
        }
    }

    handleSettingsUpdate(settingsChanges) {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => this.handleSettingsTimeout(), 1000);
        this.setState({settings: {...this.state.settings, ...settingsChanges}});
    }

    handleSettingsTimeout() {
        try {
            // console.log(this.state.settings);
            sockClient.sendToLobby('/settings', {
                lobbyName: this.state.settings.lobbyName,
                duration: this.state.settings.duration,
                publicLobby: this.state.settings.publicLobby
            });
        } catch {
        }
    }

    handleLinkCopy() {
        let dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = this.state.joinLink;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }

    handleSend(msg) {
        try {
            if (sockClient.isConnected()) {
                sockClient.sendToLobby('/chat', {message: msg});
            }
        } catch {
        }
    }

    handleChatMessage(msg) {
        let newItem;
        switch (msg.type) {
            case 'msg':
                newItem =
                    <ChatItem
                        style={msg.type}
                        sender={msg.username}
                        icon={getPlayerAvatar(msg.username)}
                        key={new Date().getTime()}
                    >
                        {msg.message}
                    </ChatItem>;
                break;

            case 'event':
                let icon;

                if (msg.icon) {
                    let iconType = msg.icon.substr(0, msg.icon.indexOf(':'));
                    let iconValue = msg.icon.substr(msg.icon.indexOf(':') + 1);

                    switch (iconType) {
                        case 'avatar':
                            icon = getPlayerAvatar(iconValue);
                            break;

                        case 'event':
                            icon = require("assets/frantic/event-cards/" + iconValue + ".svg");
                            break;

                        case 'special':
                            icon = require("assets/frantic/special-cards/" + iconValue + ".svg");
                            break;
                    }
                }

                newItem =
                    <ChatItem
                        style={msg.type}
                        icon={icon}
                        key={new Date().getTime()}
                    >
                        {msg.message}
                    </ChatItem>;
                break;
        }
        if (newItem) {
            this.setState({
                chatItems: this.state.chatItems.concat(newItem)
            });
        }
    }

    handleSocketRegister(response) {
        sessionManager.lobbyId = response.lobbyId;
        this.setState({joinLink: `${window.location.origin}/join/${sessionManager.lobbyId}`});
    }

    handleLobbyUpdate(update) {
        this.setState({
            loading: false,
            ...update
        });
    }

    handleDisconnect(reason) {
        this.setState({
            error: {
                title: "Disconnected!",
                description:
                    <p>
                        Connection to the server was disrupted.
                        <br/>
                        <strong>Reason:</strong>
                        <br/>
                        {reason}
                    </p>
            }
        });
        sockClient.clearDisconnectSubscriptions();
    }
}

export default withRouter(LobbyWindow);