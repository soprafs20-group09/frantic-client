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
        this.state = {value: ''};
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
                    className="search input-input"
                    placeholder="Search by name or creator..."
                    onChange={e => this.handleInputChange(e)}
                />
                {this.props.withRefresh && refreshButton}
            </div>
        );
    }

    handleInputChange(e) {
        this.setState({value: e.target.value});
        this.resetTimeout();
    }

    resetTimeout() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }

        this.timeout = setTimeout(() => this.handleSearch(), 500);
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
        if (this.props.onSearch) {
            this.props.onSearch(this.state.value);
        }
    }
}

export default SearchBar;