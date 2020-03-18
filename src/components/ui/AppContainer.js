import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import MainMenuItem from "components/ui/MainMenuItem";

import 'styles/ui/AppContainer.scss'

/**
 * This is a container that holds most app contents,
 * and has the ability to show a help and back button.
 *
 * PROPS:
 * withHelp: bool               - whether to show the help button
 * withBack: bool               - whether to show the back button
 * backRoute: (optional) string - where the back button should point to, default: ".."
 */
class AppContainer extends Component {
    render() {
        const backButton =
            <div className="back-button">
                <MainMenuItem to={this.props.backRoute || '..'} style={{fontSize: "24px"}}>◀ Back to Menu</MainMenuItem>
            </div>;
        const helpButton =
            <div className="help-button">
                <MainMenuItem>?</MainMenuItem>
            </div>;

        return (
            <div className="app-container">
                {this.props.children}
                {this.props.withBack && backButton}
                {this.props.withHelp && helpButton}
            </div>
        );
    }
}

export default withRouter(AppContainer);