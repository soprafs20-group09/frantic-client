import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";

import "styles/ui/MainMenuItem.scss";

/**
 * This component shows a label in the style of the main menu entries.
 * PROPS:
 * to: string/func - location where to go when clicked, or function that is called when clicked.
 * size: string (optional) - overrides the text size
 */
class MainMenuItem extends Component {
    render() {
        return (
            <Link className="mainmenu-item"
                  style={this.props.style}
                  to={this.props.to}>
                {this.props.children}
            </Link>
        );
    }
}

export default withRouter(MainMenuItem);