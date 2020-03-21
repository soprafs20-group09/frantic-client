import * as React from "react";
import {withRouter} from "react-router-dom";
import Logo from 'assets/frantic/logo-hollow.svg';
import InlineSVG from "react-inlinesvg";
import "styles/views/MainMenu.scss";
import MainMenuItem from "components/ui/MainMenuItem";
import AppContainer from "components/ui/AppContainer";
import {MainMenuItemTransition, MainMenuLogoTransition} from "components/ui/Transitions";

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
                </div>
            </AppContainer>
        );
    }
}

export default withRouter(MainMenu);