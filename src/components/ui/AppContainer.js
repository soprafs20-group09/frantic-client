import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import 'styles/ui/AppContainer.scss'
import MainMenuItem from "components/ui/MainMenuItem";

/**
 * This is a container that holds most app contents,
 * and has the ability to show a help and back button.
 *
 * PROPS:
 * showHelp: bool               - whether to show the help button
 * showBack: bool               - whether to show the back button
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
                {this.props.showBack && backButton}
                {this.props.showHelp && helpButton}
                {this.props.children}
            </div>
        );
    }
}

export default withRouter(AppContainer);