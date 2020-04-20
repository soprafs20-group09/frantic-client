import React, {Component} from 'react';
import sessionManager from "utils/sessionManager";
import {Redirect} from "react-router-dom";

class LobbyGuard extends Component {
    render() {
        if (!sessionManager.inGame) {
            return this.props.children;
        }
        return <Redirect to="/game"/>;
    }
}

export default LobbyGuard;