import React, {Component} from 'react';
import sessionManager from "utils/sessionManager";
import {Redirect} from "react-router-dom";
import {isProduction} from "utils/DomainUtils";
import sockClient from "utils/sockClient";

class GameGuard extends Component {
    render() {
        if ((sessionManager.inGame && sockClient.isConnected()) || !isProduction()) {
            return this.props.children;
        }
        return <Redirect to="/"/>;
    }
}

export default GameGuard;