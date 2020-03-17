import React from 'react';
import 'styles/App.scss';
import 'components/routing/AppRouter';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MainMenu from "components/views/MainMenu";
import CreateLobbyView from "components/views/CreateLobbyView";

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
                </Switch>
            </BrowserRouter>
        );
    }
}

export default AppRouter;
