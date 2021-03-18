import React, {Component} from 'react';
import MexicanStandoffLogo from "assets/animations/mexican-standoff-animation.svg";
import MexicanStandoffHole1 from "assets/animations/bullet-hole-1.svg";
import MexicanStandoffHole2 from "assets/animations/bullet-hole-2.svg";
import MexicanStandoffHole3 from "assets/animations/bullet-hole-3.svg";
import MexicanStandoffFlash from "assets/animations/muzzle-flash-png.svg";
import InlineSVG from "react-inlinesvg";
import "styles/ui/events/MexicanStandoffAnimation.scss";

class MexicanStandoffAnimation extends Component {
    render() {
        return (
            <div className="mexican-standoff-container">
                <div className="mexican-standoff-body">
                    <InlineSVG src={MexicanStandoffLogo} className="revolver"/>
                    <InlineSVG src={MexicanStandoffHole1} className="shot-hole"/>
                    <InlineSVG src={MexicanStandoffHole2} className="shot-hole"/>
                    <InlineSVG src={MexicanStandoffHole3} className="shot-hole"/>
                    <InlineSVG src={MexicanStandoffFlash} className="muzzle-flash"/>
                    <InlineSVG src={MexicanStandoffFlash} className="muzzle-flash muzzle2"/>
                    <InlineSVG src={MexicanStandoffFlash} className="muzzle-flash muzzle3"/>
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