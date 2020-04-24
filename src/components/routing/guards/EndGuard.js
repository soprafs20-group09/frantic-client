import React, {Component} from 'react';
import sessionManager from "utils/sessionManager";
import {Redirect} from "react-router-dom";

class EndGuard extends Component {
    render() {
        if (sessionManager.endPlayers) {
            return this.props.children;
        }
        return <Redirect to="/"/>;
    }
}

export default EndGuard;