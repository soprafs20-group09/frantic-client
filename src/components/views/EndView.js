import React, {Component} from 'react';
import "styles/views/EndView.scss";
import AppContainer from "components/ui/AppContainer";
import EndWindow from "components/ui/end/EndWindow";
import ChatWindow from "components/ui/ChatWindow";
import TurnTimer from "components/ui/ingame/TurnTimer";
import Button from "components/ui/Button";
import {withRouter} from "react-router-dom";
import sockClient from "utils/sockClient";
import sessionManager from "utils/sessionManager";
import {WindowTransition} from "components/ui/Transitions";
import ErrorBox from "components/ui/ErrorBox";
import uiUtils from "utils/uiUtils";

/**
 * View with an EndRound or EndGame Window and chat.
 * PROPS:
 * mode: string     - either 'round' or 'game'.
 */
class EndView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: {},
            chatItems: sessionManager.chat.getCurrent()
        };
    }

    componentDidMount() {
        sessionManager.inGame = false;
        let msg = sessionManager.endMessage;
        if (!msg) {
            msg = {};
        }
        this.setState({
            players: sessionManager.endPlayers,
            changes: sessionManager.endChanges,
            adminMode: sessionManager.username === sessionManager.endAdmin,
            icon: msg.icon,
            message: msg.message,
            endTimer: false
        });
        sockClient.onDisconnect(r => this.handleDisconnect(r));
        sockClient.onLobbyMessage('/chat', r => this.handleChatMessage(r));
        sockClient.onLobbyMessage('/start-round', () => this.handleRoundStart());
        sockClient.onLobbyMessage('/timer',  t => this.handleTimer(t));

        document.title = "End of " + (this.props.mode === 'game' ? 'Game' : 'Round') + " - Frantic";
    }

    componentWillUnmount() {
        sockClient.clearMessageSubscriptions();
        sockClient.clearDisconnectSubscriptions();
    }

    render() {
        let appContainerProps = {withHelp: true};
        if (this.props.mode === 'game') {
            appContainerProps.withBack = true;
            appContainerProps.closeRoute = '/';
        }

        let content;

        if (this.state.error) {
            content =
                <ErrorBox
                    key="error-box"
                    title={this.state.error.title}
                    maxWidth="50vw"
                >
                    {this.state.error.description}
                </ErrorBox>;
        } else {
            content =
                <div className="end-container" key="end-container">
                    <div className="end-column">
                        <EndWindow
                            mode={this.props.mode}
                            players={this.state.players}
                            changes={this.state.changes}
                            pointLimit={sessionManager.pointLimit}
                            icon={this.state.icon}
                            message={this.state.message}
                        >
                            {this.getActions()}
                        </EndWindow>
                    </div>
                    <div className="end-column rest">
                        <ChatWindow onSend={msg => this.handleChatSend(msg)}>
                            {this.state.chatItems}
                        </ChatWindow>
                    </div>
                </div>;
        }

        return (
            <AppContainer {...appContainerProps}>
                <WindowTransition>
                    {content}
                </WindowTransition>
            </AppContainer>
        );
    }

    getActions() {
        if (this.props.mode === 'round') {
            if (this.state.endTimer) {
                return [
                    <p className="end-actions-text" key="d">next round in</p>,
                    <TurnTimer key="t" start seconds={this.state.endTimer}/>
                ];
            }
            else if (this.state.adminMode) {
                return (
                  <Button
                      style={{paddingLeft: '1em', paddingRight: '1em'}}
                      onClick={() => this.handleContinueClick()}
                  >
                      continue to next round
                  </Button>
                );
            }
            else {
                return (
                    <p className="end-actions-text" key="d">Please wait for the host to continue...</p>
                );
            }
        } else {
            return [
                <Button
                    key="leave"
                    width="10em"
                    type="secondary"
                    onClick={() => this.props.history.push('/')}
                >
                    leave
                </Button>,
                <div style={{width: "2em"}} key="spacer"/>,
                <Button key="rematch" width="10em" onClick={() => this.handleRematch()}>
                    Rematch
                </Button>
            ]
        }
    }

    handleChatSend(msg) {
        try {
            if (sockClient.isConnected()) {
                sockClient.sendToLobby('/chat', {message: msg});
            }
        } catch {
        }
    }

    handleRematch() {
        this.props.history.push('/rematch');
    }

    handleChatMessage(msg) {
        let newItem = uiUtils.parseChatObject(msg);
        if (newItem) {
            this.setState({
                chatItems: sessionManager.chat.addMessage(newItem)
            });
        }
    }

    handleTimer(t) {
        this.setState({endTimer: t.seconds});
    }

    handleRoundStart() {
        sessionManager.endPlayers = undefined;
        sessionManager.inGame = true;
        this.props.history.push('/game');
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
        sockClient.clearMessageSubscriptions();
        sockClient.clearDisconnectSubscriptions();
        sessionManager.reset();
    }

    handleContinueClick() {
        sockClient.sendToLobby('/start-round');
    }
}

EndView.defaultProps = {
    mode: 'round'
};

export default withRouter(EndView);