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
            settings: {
                durationItems: [
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
                ]
            }
        };
    }

    componentDidMount() {
        sockClient.onLobbyMessage('/chat', r => this.handleChatMessage(r));
        sockClient.onLobbyMessage('/lobby-state', r => this.handleLobbyUpdate(r));
        sockClient.onLobbyMessage('/disconnect', r => this.handleDisconnect(r.reason));
        sockClient.onDisconnect(() => this.handleDisconnect("Socket closed."));
        sockClient.onRegister(r => this.handleSocketRegister(r));
        sockClient.connectAndRegister(this.props.authToken);
        sessionManager.token = undefined;
    }

    componentWillUnmount() {
        sockClient.clearDisconnectSubscriptions();
        sockClient.clearMessageSubscriptions();
    }

    render() {
        const spacingStyle = {marginBottom: '1.8em'};

        if (this.state.error) {
            return (
                <ErrorBox
                    key="error-box"
                    title={this.state.error.title}
                    maxWidth="50vw"
                >
                    {this.state.error.description}
                </ErrorBox>
            );
        }
        if (this.state.loading) {
            return <Spinner/>;
        }

        return (
            <div className="createlobby-container">
                <div className="createlobby-column main">
                    <Window key="LobbyWindow" title={this.state.settings.lobbyName} width="48em" height="41.2em">
                        <div className="createlobby-window-container">
                            <div className="createlobby-window-column">
                                <Header>Settings</Header>
                                <Input
                                    style={spacingStyle}
                                    title="Join Link"
                                    action="Copy"
                                    readOnly={true}
                                    initialValue={this.state.joinLink}
                                />
                                <Input
                                    style={spacingStyle}
                                    title="Lobby Name"
                                    readOnly={!this.props.adminMode}
                                    initialValue={this.state.settings.lobbyName}
                                />
                                <SingleSelect
                                    style={spacingStyle}
                                    title="Game Duration"
                                    items={this.state.settings.durationItems}
                                    readOnly={!this.props.adminMode}
                                    initialValue="short"
                                />
                                <Switch
                                    style={spacingStyle}
                                    title="Public"
                                    on="yes"
                                    off="no"
                                    readOnly={!this.props.adminMode}
                                    initialValue={this.state.settings.public}
                                />
                                <Button
                                    disabled={this.state.players.length < 2}
                                    width="100%"
                                >
                                    Start Game
                                </Button>
                            </div>
                            <div className="createlobby-window-column">
                                <Header>Players</Header>
                                <PlayerList
                                    players={this.state.players}
                                    adminMode={this.props.adminMode}
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
            if (sockClient.isConnected()) {
                sockClient.sendToLobby('/chat', {message: msg});
            }
        } catch (ignored) {
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

    handleSocketRegister(response) {
        sessionManager.lobbyId = response.lobbyId;
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
                    {reason}
                </p>
            }
        });
        sockClient.clearDisconnectSubscriptions();
    }
}

export default withRouter(LobbyWindow);