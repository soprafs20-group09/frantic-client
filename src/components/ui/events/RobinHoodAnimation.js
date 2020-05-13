import React, {Component} from 'react';
import Bow from "assets/animations/bow.svg";
import CharityLogo from "assets/frantic/event-cards/charity.svg"
import InlineSVG from "react-inlinesvg";
import "styles/ui/events/RobinHoodAnimation.scss";

class RobinHoodAnimation extends Component {
    render() {
        return (
            <div className="robin-hood-container">
                <InlineSVG src={Bow} className="bow"/>
                <div className="wall"/>
                <div className="bow-cover"/>
                <div className="bow-string-stretched1"/>
                <div className="bow-string-stretched2"/>
                <div className="arrow">
                    <div className="point"/>
                    <div className="shaft"/>
                    <div className="tail">
                        <div className="upper"/>
                        <div className="lower"/>
                    </div>
                </div>
                <div className="sack-of-gold">
                    <div className="upper">
                        <div className="circle1"/>
                        <div className="circle2"/>
                        <div className="circle3"/>
                        <div className="triangle-left"/>
                        <div className="triangle-right"/>
                    </div>
                    <div className="middle"/>
                    <div className="lower"/>
                    <InlineSVG src={CharityLogo} className="dollar-sign"/>
                </div>
                <div className="arrow-cover1"/>
                <div className="arrow-cover2"/>
            </div>
        );
    }
}

export default RobinHoodAnimation;