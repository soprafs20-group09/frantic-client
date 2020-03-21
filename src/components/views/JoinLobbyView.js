import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import AppContainer from "components/ui/AppContainer";
import {WindowTransition} from "components/ui/Transitions";
import Window from "components/ui/Window";
import SearchBar from "components/ui/SearchBar";

class JoinLobbyView extends Component {
    render() {
        return (
            <AppContainer withBack withHelp>
                <WindowTransition>
                    {this.getMainWindow()}
                </WindowTransition>
            </AppContainer>
        );
    }

    getMainWindow() {
        return (
            <Window title="Join a Lobby" width="70vw" maxHeight="90vh">
                <SearchBar withRefresh/>
            </Window>
        );
    }
}

export default withRouter(JoinLobbyView);