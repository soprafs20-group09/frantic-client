import React from "react";
import {withRouter} from "react-router-dom";
import Logo from 'assets/frantic/logo-hollow.svg';
import InlineSVG from "react-inlinesvg";
import {Twemoji} from "react-emoji-render";
import "styles/views/MainMenu.scss";
import MainMenuItem from "components/ui/MainMenuItem";
import AppContainer from "components/ui/AppContainer";
import {MainMenuItemTransition, MainMenuLogoTransition, MainMenuMadeWithTransition} from "components/ui/Transitions";

const madeWithIcons = [
    ':heart:',
    ':avocado:',
    ':microbe:',
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
                    <span className="madewith">
                        made with <Twemoji svg text={this.props.symbol}/> by sopra-fs20 group 9
                    </span>
                </MainMenuMadeWithTransition>
            </p>
        );
    }
}

class MainMenu extends React.Component {
    render() {
        return (
            <AppContainer withHelp>
                <div className="mainmenu-container">
                    <MainMenuLogoTransition containerClass="mainmenu-logo-shadow-container">
                        <InlineSVG src={Logo} className="mainmenu-logo"/>
                    </MainMenuLogoTransition>
                    <div className="mainmenu-items-container">
                        <MainMenuItemTransition>
                            <MainMenuItem key="create" to="/create">create</MainMenuItem>
                            <MainMenuItem key="browse" to="/browse">join</MainMenuItem>
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