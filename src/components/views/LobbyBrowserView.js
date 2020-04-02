import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import AppContainer from "components/ui/AppContainer";
import {WindowTransition} from "components/ui/Transitions";
import Window from "components/ui/Window";
import SearchBar from "components/ui/SearchBar";
import LobbyList from "components/ui/LobbyList";
import Spinner from "components/ui/Spinner";
import "styles/views/LobbyBrowserView.scss";
import {api, parseCommonErrors} from "utils/api";
import ErrorBox from "components/ui/ErrorBox";

/**
 * Renders a list of available lobbies.
 *
 */
class LobbyBrowserView extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: true, lobbies: [], filter: ''};
    }

    componentDidMount() {
        this.refreshLobbies(this.state.filter);
    }

    render() {
        let content;

        if (this.state.error) {
            content =
                <ErrorBox
                    center
                    maxWidth="50%"
                    title={this.state.error.title}
                    key="error-box"
                >
                    {this.state.error.description}
                </ErrorBox>;
        } else if (this.state.loading) {
            content = <Spinner center key="spinner"/>;
        } else {
            content = <LobbyList key="lobby-list" lobbies={this.state.lobbies}/>
        }

        return (
            <AppContainer withBack withHelp>
                <WindowTransition>
                    <Window title="Join a Lobby" width="70vw" height="80vh">
                        <SearchBar
                            withRefresh
                            onRefresh={() => this.handleRefresh()}
                            onSearch={q => this.handleSearch(q)}
                        />
                        <div className="lobbies-container">
                            {content}
                        </div>
                    </Window>
                </WindowTransition>
            </AppContainer>
        );
    }

    async refreshLobbies(filter) {
        try {
            let response = await api.get(`/lobbies?filter=${filter || ''}`);
            this.setState({loading: false, lobbies: response.data});
        } catch (err) {
            this.setState({error: parseCommonErrors(err)});
        }
    }

    handleRefresh() {
        this.setState({error: null, loading: true});
        this.refreshLobbies(this.state.filter);
    }

    handleSearch(query) {
        this.setState({error: null, loading: true, filter: query});
        this.refreshLobbies(query);
    }
}

export default withRouter(LobbyBrowserView);