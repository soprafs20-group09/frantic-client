import React from 'react';
import 'styles/App.scss';
import 'components/routing/AppRouter';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MainMenu from "components/MainMenu";

class AppRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path = "/">
                        <MainMenu/>
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default AppRouter;
