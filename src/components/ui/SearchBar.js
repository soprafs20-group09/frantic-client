import React, {Component} from 'react';
import "styles/ui/UiElements.scss"
import InlineSVG from "react-inlinesvg";
import ReloadArrow from "assets/icons/reload-arrow.svg";

/**
 * Renders a Search Bar.
 * PROPS:
 * withRefresh: bool      - will render a refresh button if true.
 * onRefresh: func()      - a function that is called when the user clicks on the refresh-button.
 * onSearch: func(string) - a function that is called when the user searches for a query.
 */
class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const refreshButton =
            <InlineSVG
                src={ReloadArrow}
                className="search-refresh"
                onClick={() => this.handleRefresh()}
            />;

        return (
            <div className="input-container">
                <input
                    className="action search input-input"
                    placeholder="Search by lobby or creator..."
                    onChange={e => this.handleInputChange(e)}
                    onKeyUp={e => this.handleKeyUp(e)}
                />
                <button
                    className="search input-action"
                    onClick={() => this.handleSearch()}
                >
                    Search
                </button>
                {this.props.withRefresh && refreshButton}
            </div>
        );
    }

    handleInputChange(e) {
        this.setState({value: e.target.value});
    }

    handleKeyUp(e) {
        if (e.key === 'Enter') {
            this.handleSearch();
        }
    }

    handleRefresh() {
        if (this.props.onRefresh) {
            this.props.onRefresh();
        }
    }

    handleSearch() {
        if (this.props.onSearch && this.state.value) {
            this.props.onSearch(this.state.value);
        }
    }
}

export default SearchBar;