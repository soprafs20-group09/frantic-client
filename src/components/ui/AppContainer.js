import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import MainMenuItem from "components/ui/MainMenuItem";

import 'styles/ui/AppContainer.scss'
import HelpWindow from "components/ui/help/HelpWindow";
import {WindowTransition} from "components/ui/Transitions";
import Icon from "./Icon";
import SettingsWindow from "./SettingsWindow";
import settingsManager from "utils/settingsManager";

/**
 * This is a container that holds most app contents,
 * and has the ability to show a help and back button.
 *
 * PROPS:
 * withHelp: bool               - whether to show the help button
 * withBack: bool               - whether to show the back button
 * withSettings: bool           - whether to show the settings button
 * backRoute: (optional) string - where the back button should point to, default: ".."
 */
class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {overlay: false};
    }

    componentDidMount() {
        window.addEventListener('resize', () => this.handleResize());
    }

    componentWillUnmount() {
        window.removeEventListener('resize', () => this.handleResize());
    }

    render() {
        const backButton =
            <div className="back-button">
                <MainMenuItem to={this.props.backRoute || '..'} style={{fontSize: "1.33rem"}}>
                    ◀ Back to Menu
                </MainMenuItem>
            </div>;
        const helpButton = <MainMenuItem onClick={() => this.toggleHelp()}>?</MainMenuItem>;
        const settingsButton =
            <MainMenuItem onClick={() => this.toggleSettings()}>
                <Icon className="settings-button" from="misc">gear</Icon>
            </MainMenuItem>;
        return (
            <div className="app-container">
                <div className={`app-container ${this.state.overlay && 'blur'}`}>
                    {this.props.children}
                    <div className="ac-top-right-buttons">
                        {this.props.withHelp && helpButton}
                        {this.props.withSettings && settingsButton}
                    </div>
                    {this.props.withBack && backButton}
                </div>
                <WindowTransition trail={0}>
                    {this.getOverlay()}
                </WindowTransition>
            </div>
        );
    }

    getOverlay() {
        switch (this.state.overlay) {
            case 'help':
                return <HelpWindow
                    withClose
                    withNewTab
                    onClose={() => this.toggleHelp()}
                    key="help"
                />;

            case 'settings':
                return <SettingsWindow
                    onClose={() => this.toggleSettings()}
                    key="settings"
                />;

            case 'resize':
                return <CalibrateMessage key="resize"/>;

            default:
                return false;
        }
    }

    toggleSettings() {
        if (this.state.overlay == 'settings') {
            this.setState({overlay: false});
        } else {
            this.setState({overlay: 'settings'});
        }
    }

    toggleHelp() {
        if (this.state.overlay == 'help') {
            this.setState({overlay: false});
        } else {
            this.setState({overlay: 'help'})
        }
    }

    handleResize() {
        if ((window.innerHeight >= 860 && this.lastWindowSize >= 860) || this.lastWindowSize === window.innerHeight) {
            this.lastWindowSize = window.innerHeight;
            return;
        }

        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }

        this.resizeTimeout = setTimeout(() => {
            this.lastWindowSize = window.innerHeight;
            this.setState({overlay: 'resize'});
            this.resizeTimeout = setTimeout(() =>
                    this.setState({overlay: false}),
                1500);
        }, 100);
    }
}

class CalibrateMessage extends Component {
    render() {
        return (
            <div className="overlay-message">
                <h1
                    style={{
                        fontSize: `${settingsManager.constants.maxFontSize * 2}px`
                    }}
                >
                    calibrating...
                </h1>
            </div>
        );
    }
}

export default withRouter(AppContainer);