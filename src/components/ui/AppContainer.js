import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import MainMenuItem from "components/ui/MainMenuItem";

import 'styles/ui/AppContainer.scss'
import HelpWindow from "components/ui/help/HelpWindow";
import {WindowTransition} from "components/ui/Transitions";

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
    constructor(props) {
        super(props);
        this.state = {showHelp: false};
    }

    render() {
        const backButton =
            <div className="back-button">
                <MainMenuItem to={this.props.backRoute || '..'} style={{fontSize: "1.33rem"}}>
                    ◀ Back to Menu
                </MainMenuItem>
            </div>;
        const helpButton =
            <div className="help-button">
                <MainMenuItem onClick={() => this.toggleHelp()}>?</MainMenuItem>
            </div>;
        const helpPage =
            <HelpWindow
                withClose
                withNewTab
                onClose={() => this.toggleHelp()}
            />;

        return (
            <div className="app-container">
                <div className={`app-container ${this.state.showHelp && 'blur'}`}>
                    {this.props.children}
                    {this.props.withBack && backButton}
                    {this.props.withHelp && helpButton}
                </div>
                <WindowTransition trail={0}>
                    {this.state.showHelp && helpPage}
                </WindowTransition>
            </div>
        );
    }

    toggleHelp() {
        this.setState({showHelp: !this.state.showHelp});
    }
}

export default withRouter(AppContainer);