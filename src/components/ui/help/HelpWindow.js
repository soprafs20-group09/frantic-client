import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import 'styles/ui/help/HelpWindow.scss';
import 'styles/ui/ToolWindow.scss';
import Logo from "assets/frantic/logo-text.svg";
import Cross from "assets/icons/cross.svg";
import NewTab from "assets/icons/external-link.svg";
import InlineSVG from "react-inlinesvg";
import TabSwitcher from "components/ui/TabSwitcher";
import {animated, Spring} from "react-spring/renderprops";
import RulesSection from "components/ui/help/RulesSection";
import CardsSection from "components/ui/help/CardsSection";
import EventsSection from "components/ui/help/EventsSection";

class RulesIcon extends Component {
    render() {
        const fromStyle = {
            opacity: 0,
            width: '0%',
        };
        const toStyle = {
            opacity: 1,
            width: '75%'
        };

        return (
            <div className="icon-container rules">
                <Spring from={fromStyle} to={toStyle} reset={this.props.reset}>
                    {style => <animated.div className="rules-icon-lines" style={style}/>}
                </Spring>
                <Spring from={fromStyle} to={toStyle} delay={200} reset={this.props.reset}>
                    {style => <animated.div className="rules-icon-lines" style={style}/>}
                </Spring>
                <Spring from={fromStyle} to={toStyle} delay={400} reset={this.props.reset}>
                    {style => <animated.div className="rules-icon-lines" style={style}/>}
                </Spring>
            </div>
        );
    }
}

class CardsIcon extends Component {
    render() {
        const fromStyle = {
            opacity: 0,
            transform: 'translateY(-50%)'
        };
        const toStyle = {
            opacity: 1,
            transform: 'translateY(0%)'
        };

        return (
            <div className="icon-container cards">
                <Spring from={fromStyle} to={toStyle} reset={this.props.reset}>
                    {style => <div style={style} className="cards-icon-cards n1"/>}
                </Spring>
                <Spring from={fromStyle} to={toStyle} delay={200} reset={this.props.reset}>
                    {style => <div style={style} className="cards-icon-cards n2"/>}
                </Spring>
            </div>
        );
    }
}

class EventIcon extends Component {
    render() {
        const fromStyle = {offset: 100};
        const toStyle = {offset: 0};
        return (
            <div className="icon-container event">
                <Spring
                    from={fromStyle}
                    to={toStyle}
                    reset={this.props.reset}
                    config={{tension: 100, friction: 50}}
                >
                    {props =>
                        <svg className="event-icon-lightning" viewBox="0 0 32 32" strokeDasharray={100}
                             strokeDashoffset={props.offset}>
                            <animated.path
                                d="M18 13 L26 2 8 13 14 19 6 30 24 19 Z"
                            />
                        </svg>
                    }
                </Spring>
            </div>
        );
    }
}

/**
 * Shows a Help Window.
 * PROPS:
 * withNewTab: boolean  - will display a button to open help in a new page.
 * withClose: boolean   - will display a close button if true.
 * onClose: func        - a function to be called when the close button has been clicked.
 */
class HelpWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {reset: [0, 0, 0]};
    }

    render() {
        const tabs = [
            {
                icon: <RulesIcon reset={this.state.reset[0]}/>,
                title: "Rules",
                content: <RulesSection/>,
                onHover: () => this.onTabHover(0)
            },
            {
                icon: <CardsIcon reset={this.state.reset[1]}/>,
                title: "Cards",
                content: <CardsSection/>,
                onHover: () => this.onTabHover(1)
            },
            {
                icon: <EventIcon reset={this.state.reset[2]}/>,
                title: "Events",
                content: <EventsSection/>,
                onHover: () => this.onTabHover(2)
            }
        ];

        return (
            <div className="toolwindow-container" style={{height: "90vh"}}>
                <div className="help-nav-container">
                    {this.props.withClose &&
                    <InlineSVG
                        src={Cross}
                        className="help-nav-button"
                        onClick={() => this.onClose()}
                    />}
                    {this.props.withNewTab &&
                    <a target="_blank" href="/help" className="help-nav-button new-tab">
                        <InlineSVG src={NewTab} className="help-nav-button new-tab"/>
                    </a>}
                </div>
                <div className="toolwindow-content" style={{height: "100%", maxHeight: "100%"}}>
                    <div className="help-container">
                        <InlineSVG src={Logo} className="help-logo"/>
                        <h3>
                            Welcome to the Help Page!
                        </h3>
                        <p>
                            Please click one of the sections below to learn about the game.
                        </p>

                        {/*height="calc(90vh - 21em)"*/}
                        <TabSwitcher selected={1}>
                            {tabs}
                        </TabSwitcher>
                    </div>
                </div>
            </div>
        );
    }

    onClose() {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    onTabHover(i) {
        let reset = [false, false, false];
        reset[i] = true;
        this.setState({reset: reset});
    }
}

export default withRouter(HelpWindow);