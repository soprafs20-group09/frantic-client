import React from 'react';
import 'components/routing/AppRouter';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MainMenu from "components/views/MainMenu";
import CreateLobbyView from "components/views/CreateLobbyView";
import JoinLobbyView from "components/views/JoinLobbyView";
import CardDisplay from "components/views/CardDisplay";

class AppRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <MainMenu/>
                    </Route>
                    <Route exact path="/create">
                        <CreateLobbyView/>
                    </Route>
                    <Route exact path="/browse">
                        <JoinLobbyView/>
                    </Route>
                    <Route exact path="/cards">
                        <CardDisplay/>
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default AppRouter;
