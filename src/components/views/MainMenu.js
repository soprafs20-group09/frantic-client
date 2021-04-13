import React from "react";
import {withRouter} from "react-router-dom";
import Logo from 'assets/frantic/logo-hollow.svg';
import InlineSVG from "react-inlinesvg";
import {Twemoji} from "react-emoji-render";
import "styles/views/MainMenu.scss";
import MainMenuItem from "components/ui/MainMenuItem";
import AppContainer from "components/ui/AppContainer";
import {MainMenuItemTransition, MainMenuLogoTransition, MainMenuMadeWithTransition} from "components/ui/Transitions";
import sessionManager from "utils/sessionManager";
import sockClient from "utils/sockClient";
import uiUtils from "../../utils/uiUtils";

const madeWithIcons = [
    ':heart:',
    ':heart:',
    ':heart:',
    ':avocado:',
    ':microbe:',
    ':mask:',
    ':beers:',
    ':alien:',
    ':brain:',
    ':bug:',
    ':money_bag:'
];

class MadeWithLabel extends React.Component {
    render() {
        return (
            <p className="madewith label">
                <MainMenuMadeWithTransition>
                    <div className="madewith" key="madewith">
                        a fan project made with <Twemoji svg text={this.props.symbol}/> by students @ UZH
                    </div>
                    <div className="copyright-disclaimer" key="copyright">
                        The card game Frantic, the associated logo
                        and game assets are under copyright by the original
                        creators <a
                        href="https://rulefactory.ch"
                        className="copyright-disclaimer link"
                        target="_blank"
                    >
                        Rulefactory
                    </a>.
                    </div>
                </MainMenuMadeWithTransition>
            </p>
        );
    }
}

class MainMenu extends React.Component {
    componentDidMount() {
        sessionManager.reset();
        try {
            if (sockClient.isConnected()) {
                sockClient.clearDisconnectSubscriptions();
                sockClient.clearMessageSubscriptions();
                sockClient.disconnect();
            }
        }
        catch {
        }
        document.title = "Frantic";
    }

    render() {
        const menuItems = [
            <MainMenuItem key="create" to="/create">create</MainMenuItem>,
            <MainMenuItem key="browse" to="/browse">join</MainMenuItem>
        ];
        if (!uiUtils.isChrome()) {
            menuItems.unshift(
                <label key="workswith" className="mainmenu-workswith">Works best with Google Chrome!</label>
            );
        }

        return (
            <AppContainer withHelp withSettings withAbout withPopup>
                <div className="mainmenu-container">
                    <MainMenuLogoTransition containerClass="mainmenu-logo-shadow-container">
                        <InlineSVG src={Logo} className="mainmenu-logo"/>
                    </MainMenuLogoTransition>
                    <div className="mainmenu-items-container">
                        <MainMenuItemTransition>
                            {menuItems}
                        </MainMenuItemTransition>
                    </div>
                    <MadeWithLabel symbol={this.getMadeWithSymbol()}/>
                </div>
            </AppContainer>
        );
    }

    getMadeWithSymbol() {
        return madeWithIcons[Math.floor(Math.random() * madeWithIcons.length)];
    }
}

export default withRouter(MainMenu);