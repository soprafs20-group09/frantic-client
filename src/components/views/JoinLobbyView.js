import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import AppContainer from "components/ui/AppContainer";
import {WindowTransition} from "components/ui/Transitions";
import Window from "components/ui/Window";
import SearchBar from "components/ui/SearchBar";
import LobbyList from "components/ui/LobbyList";

/**
 * Renders a list of available lobbies.
 *
 */
class JoinLobbyView extends Component {
    constructor(props) {
        super(props);
        this.state = {lobbies: []}
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                lobbies: [
                    {
                        name: "ueli's lobby",
                        creator: "ueli",
                        players: "3/8",
                        link: "https://frant.ic/join?id=2103"
                    },
                    {
                        name: "crocodiles",
                        creator: "schnappi",
                        players: "5/8",
                        link: "https://frant.ic/join?id=1234"
                    },
                    {
                        name: "happy place :)",
                        creator: "niceGuyTM",
                        players: "7/8",
                        link: "https://frant.ic/join?id=0124"
                    },
                    {
                        name: "tryhards only!",
                        creator: "DarkKnight98",
                        players: "6/8",
                        link: "https://frant.ic/join?id=3564"
                    },
                    {
                        name: "cats are awesome :3",
                        creator: "Karen",
                        players: "8/8",
                        link: "https://frant.ic/join?id=1398"
                    },
                ]
            });
        }, 1000);
    }

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
                <LobbyList lobbies={this.state.lobbies}/>
            </Window>
        );
    }
}

export default withRouter(JoinLobbyView);