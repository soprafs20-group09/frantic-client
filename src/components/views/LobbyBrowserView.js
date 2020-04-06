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

class NoLobbiesMessage extends Component {
    render() {
        return (
            <div className="no-lobbies container">
                <p className="no-lobbies msg">
                    {
                        this.props.withQuery ?
                            "no lobbies matched your search." :
                            "looks like no one is playing right now :("
                    }
                </p>
            </div>
        );
    }
}

/**
 * Renders a list of available lobbies.
 *
 */
class LobbyBrowserView extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: true, lobbies: [], query: ''};
    }

    componentDidMount() {
        this.refreshLobbies(this.state.filter);
    }

    render() {
        let content;

        if (this.state.error) {
            content = this.getCenterTransition(
                <ErrorBox
                    maxWidth="40vw"
                    title={this.state.error.title}
                    key="error-box"
                >
                    {this.state.error.description}
                </ErrorBox>
            );
        } else if (this.state.loading) {
            content = this.getCenterTransition(
                <Spinner key="spinner"/>
            );
        } else if (this.state.lobbies.length === 0) {
            content = this.getCenterTransition(
                <NoLobbiesMessage key="no-lobbies" withQuery={this.state.query}/>
            );
        } else {
            content = <LobbyList key="lobby-list" lobbies={this.state.lobbies}/>;
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

    getCenterTransition(component) {
        return (
            <div className="lobbies-centerer">
                <WindowTransition>
                    {component}
                </WindowTransition>
            </div>
        );
    }

    async refreshLobbies(query) {
        try {
            let response = await api.get(`/lobbies?q=${query || ''}`);
            this.setState({loading: false, lobbies: response.data});
        } catch (err) {
            this.setState({error: parseCommonErrors(err)});
        }
    }

    handleRefresh() {
        this.setState({error: null, loading: true});
        this.refreshLobbies(this.state.query);
    }

    handleSearch(query) {
        this.setState({error: null, loading: true, query: query});
        this.refreshLobbies(query);
    }
}

export default withRouter(LobbyBrowserView);