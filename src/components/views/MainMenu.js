import * as React from "react";
import {withRouter} from "react-router-dom";
import Logo from 'assets/frantic/logo-hollow.svg';
import InlineSVG from "react-inlinesvg";

import "styles/views/MainMenu.scss";
import MainMenuItem from "components/ui/MainMenuItem";
import AppContainer from "components/ui/AppContainer";

class MainMenu extends React.Component {
    render() {

        const itemStyle = {
          marginBottom: '15px'
        };

        return (
            <AppContainer showHelp={true}>
                <div className="mainmenu-container">
                    <div className="mainmenu-logo-shadow-container">
                        <InlineSVG src={Logo} className="mainmenu-logo"/>
                    </div>
                    <div className="mainmenu-items-container">
                        <MainMenuItem to="/create" style={itemStyle}>create</MainMenuItem>
                        <MainMenuItem to="/browse" style={itemStyle}>join</MainMenuItem>
                    </div>
                </div>
            </AppContainer>
        );
    }
}

export default withRouter(MainMenu);