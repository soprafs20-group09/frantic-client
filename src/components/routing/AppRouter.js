import React from 'react';
import 'components/routing/AppRouter';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MainMenu from "components/views/MainMenu";
import LobbyView from "components/views/LobbyView";
import LobbyBrowserView from "components/views/LobbyBrowserView";
import CardDisplay from "components/views/CardDisplay";
import HelpView from "components/views/HelpView";
import JoinLobbyView from "components/views/JoinLobbyView";

class AppRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <MainMenu/>
                    </Route>
                    <Route exact path="/create">
                        <LobbyView mode="create"/>
                    </Route>
                    <Route exact path="/join">
                        <LobbyView mode="join"/>
                    </Route>
                    <Route exact path="/join/:id">
                        <JoinLobbyView/>
                    </Route>
                    <Route exact path="/browse">
                        <LobbyBrowserView mode="join"/>
                    </Route>
                    <Route exact path="/cards">
                        <CardDisplay/>
                    </Route>
                    <Route exact path="/help">
                        <HelpView/>
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default AppRouter;
