import React, {Component} from 'react';
import sessionManager from "utils/sessionManager";
import {Redirect} from "react-router-dom";
import {isProduction} from "utils/DomainUtils";

class GameGuard extends Component {
    render() {
        if (sessionManager.inGame || !isProduction()) {
            return this.props.children;
        }
        return <Redirect to="/"/>;
    }
}

export default GameGuard;