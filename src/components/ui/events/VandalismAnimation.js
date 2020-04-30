import React, {Component} from 'react';
import VandalismLogo from "assets/icons/vandalism-animation.svg";
import Logo from "assets/frantic/logo-text.svg";
import InlineSVG from "react-inlinesvg";
import "styles/ui/events/VandalismAnimation.scss";

class VandalismAnimation extends Component {
    render() {
        return (
            <div className="vandalism-container">
                <div className="logo-container">
                    <InlineSVG src={Logo} className="vandalism-frantic-logo"/>
                    <div className="cover"/>
                    <div className="cover top"/>
                    <div className="cover"/>
                    <div className="cover top"/>
                    <div className="cover"/>
                    <div className="cover top"/>
                    <div className="cover"/>
                    <InlineSVG src={VandalismLogo} className="vandalism-logo"/>
                </div>
            </div>
        );
    }
}

export default VandalismAnimation;