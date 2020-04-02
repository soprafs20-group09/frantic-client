import React, {Component} from 'react';
import sessionManager from "utils/sessionManager";
import {Redirect, withRouter} from "react-router-dom";

/**
 * this component saves the lobbyId and redirects to the LobbyView.
 */
class JoinLobbyView extends Component {

    componentDidMount() {
        sessionManager.lobbyId = this.props.match.params.id;
    }

    render() {
        return (
            <Redirect to="/join"/>
        );
    }
}

export default withRouter(JoinLobbyView);