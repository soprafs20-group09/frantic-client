import React, {Component} from 'react';
import MexicanStandoffLogo from "assets/frantic/event-cards/mexican-standoff-animation.svg";
import MexicanStandoffHole from"assets/frantic/event-cards/mexican-standoff-hole.svg";
import InlineSVG from "react-inlinesvg";
import "styles/ui/events/MexicanStandoffAnimation.scss";

class MexicanStandoffAnimation extends Component {
    render() {
        return (
            <div className="mexican-standoff-container">
                <div className="revolver-body">
                    <InlineSVG src={MexicanStandoffLogo} className="revolver"/>
                    <InlineSVG src={MexicanStandoffHole} className="shot-hole"/>
                    <InlineSVG src={MexicanStandoffHole} className="shot-hole"/>
                    <InlineSVG src={MexicanStandoffHole} className="shot-hole"/>
                    <div className="smoke"/>
                    <div className="smoke"/>
                    <div className="smoke"/>
                    <div className="smoke"/>
                    <div className="smoke"/>
                    <div className="smoke"/>
                    <div className="smoke"/>
                    <div className="smoke"/>
                    <div className="smoke"/>
                    <div className="smoke"/>
                    <div className="smoke"/>
                    <div className="smoke"/>
                    <div className="smoke"/>
                    <div className="smoke"/>
                    <div className="smoke"/>
                    <div className="smoke"/>
                </div>
            </div>
        );
    }
}

export default MexicanStandoffAnimation;