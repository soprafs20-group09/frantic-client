import * as React from "react";
import {withRouter} from "react-router-dom";
import Logo from 'assets/frantic/logo-hollow.svg';
import InlineSVG from "react-inlinesvg";
import {animated, Transition} from "react-spring/renderprops";
import "styles/views/MainMenu.scss";
import MainMenuItem from "components/ui/MainMenuItem";
import AppContainer from "components/ui/AppContainer";

class MainMenu extends React.Component {
    render() {
        const up = {
            height: 0,
            opacity: 0,
            transform: 'translateY(-100%) rotate(0deg) scale(1)'
        };
        const neutral = {
            height: '300px',
            opacity: 1,
            transform: 'translateY(0%) rotate(0deg) scale(1)',
            marginBottom: '15px'
        };
        const down = {
            height: 0,
            opacity: 0,
            transform: 'translateY(20%) rotate(0deg) scale(1)',
            marginbottom: 0
        };
        const logoFrom = {
            height: 0,
            opacity: 0,
            transform: 'translateY(-100%) rotate(-180deg) scale(1.5)'
        };


        const itemStyle = {
            marginBottom: '15px'
        };

        const menuItems = [
            <MainMenuItem key="create" to="/create" style={itemStyle}>create</MainMenuItem>,
            <MainMenuItem key="browse" to="/browse" style={itemStyle}>join</MainMenuItem>
        ];

        return (
            <AppContainer withHelp>
                <div className="mainmenu-container">
                    <Transition
                        items={this.props.children}
                        from={logoFrom}
                        enter={neutral}
                        leave={up}
                        trail={200}
                    >
                        {item => style =>
                            <animated.div className="mainmenu-logo-shadow-container" style={style}>
                                <InlineSVG src={Logo} className="mainmenu-logo"/>
                            </animated.div>
                        }
                    </Transition>
                    <div className="mainmenu-items-container">
                        <Transition
                            items={menuItems}
                            keys={item => item.key}
                            from={down}
                            enter={neutral}
                            leave={down}
                            trail={400}
                        >
                            {item => style => <animated.div style={style}>{item}</animated.div>}
                        </Transition>
                    </div>
                </div>
            </AppContainer>
        );
    }
}

export default withRouter(MainMenu);