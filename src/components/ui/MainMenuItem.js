import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";

import "styles/views/MainMenu.scss";

/**
 * This component shows a label in the style of the main menu entries.
 * PROPS:
 * to: string              - location where to go when clicked.
 * onClick: func           - function that is called when clicked.
 * size: string (optional) - overrides the text size
 */
class MainMenuItem extends Component {
    render() {
        return (
            <Link className="mainmenu-item"
                  style={this.props.style}
                  to={this.props.to}
                  onClick={this.props.onClick}>
                {this.props.children}
            </Link>
        );
    }
}

export default withRouter(MainMenuItem);