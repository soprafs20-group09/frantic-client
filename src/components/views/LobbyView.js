import React, {Component} from 'react';
import AppContainer from "components/ui/AppContainer";
import 'styles/views/LobbyView.scss';
import ChooseUsernameWindow from "components/ui/ChooseUsernameWindow";
import {WindowTransition} from "components/ui/Transitions";
import {api, parseCommonErrors} from "utils/api";
import Spinner from "components/ui/Spinner";
import LobbyWindow from "components/ui/lobby/LobbyWindow";
import sessionManager from "utils/sessionManager";
import ErrorBox from "components/ui/ErrorBox";

/**
 * Asks the user for a username, then sends a request
 * and renders a LobbyWindow with received token.
 *
 * PROPS:
 * mode: string - "join" or "create", sets whether the view should try to create or join a lobby
 */
class LobbyView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let closeRoute = this.props.mode === 'join' ? '/browse' : '/';

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
        } else if (this.state.loading) {
            content = <Spinner key="spinner"/>;
        } else if (this.state.authToken) {
            content =
                <LobbyWindow
                    key="lobby-window"
                    adminMode={this.props.mode === 'create'}
                    authToken={this.state.authToken}
                />;
        } else {
            content =
                <ChooseUsernameWindow
                    key="username-window"
                    onConfirm={u => this.confirmUsername(u)}
                    closeRoute={closeRoute}
                />;
        }

        if (!this.state.authToken) {
            content =
                <WindowTransition>
                    {content}
                </WindowTransition>;
        }

        return (
            <AppContainer withBack withHelp withSettings>
                {content}
            </AppContainer>
        );
    }

    async confirmUsername(username) {
        this.setState({loading: true});
        try {
            let response;
            if (this.props.mode === 'create') {
                response = await api.post('/lobbies', {username: username});
            } else if (this.props.mode === 'join') {
                response = await api.put(`/lobbies/${sessionManager.lobbyId}`, {username: username});
            }
            this.setState({loading: false, authToken: response.data.token});
        } catch (err) {
            this.setState({error: parseCommonErrors(err, "couldn't join the lobby!")})
        }
    }
}

export default LobbyView;