import React from 'react';
import 'components/routing/AppRouter';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import MainMenu from "components/views/MainMenu";
import LobbyView from "components/views/LobbyView";
import LobbyBrowserView from "components/views/LobbyBrowserView";
import CardDisplay from "components/views/CardDisplay";
import HelpView from "components/views/HelpView";
import JoinLobbyView from "components/views/JoinLobbyView";
import GameView from "components/views/GameView";
import EndView from "components/views/EndView";
import LobbyGuard from "components/routing/guards/LobbyGuard";
import SingleAnimationView from "components/views/SingleAnimationView";
import GameGuard from "components/routing/guards/GameGuard";
import AnimationGalleryView from "components/views/AnimationGalleryView";
import AboutView from "components/views/AboutView";

class AppRouter extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <MainMenu/>
                    </Route>
                    <Route exact path="/create">
                        <LobbyGuard>
                            <LobbyView mode="create"/>
                        </LobbyGuard>
                    </Route>
                    <Route exact path="/join">
                        <LobbyGuard>
                            <LobbyView mode="join"/>
                        </LobbyGuard>
                    </Route>
                    <Route exact path="/rematch">
                        <LobbyGuard>
                            <LobbyView mode="rematch"/>
                        </LobbyGuard>
                    </Route>
                    <Route exact path="/join/:id">
                        <JoinLobbyView/>
                    </Route>
                    <Route exact path="/browse">
                        <LobbyBrowserView mode="join"/>
                    </Route>
                    <Route exact path="/game">
                        <GameGuard>
                            <GameView/>
                        </GameGuard>
                    </Route>
                    <Route exact path="/help">
                        <HelpView/>
                    </Route>
                    <Route exact path="/cards">
                        <CardDisplay/>
                    </Route>
                    <Route exact path="/end/round">
                        <EndView mode="round"/>
                    </Route>
                    <Route exact path="/end/game">
                        <EndView mode="game"/>
                    </Route>
                    <Route exact path="/about">
                        <AboutView/>
                    </Route>
                    <Route exact path="/animations">
                        <AnimationGalleryView/>
                    </Route>
                    <Route exact path="/animations/:event">
                        <SingleAnimationView/>
                    </Route>
                    <Route>
                        <Redirect to="/"/>
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default AppRouter;
