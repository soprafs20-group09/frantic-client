import React, {Component} from 'react';
import "styles/ui/events/MatingSeasonAnimation.scss";
import InlineSVG from "react-inlinesvg";
import Wave from "assets/animations/wave.svg";

class MatingSeasonAnimation extends Component {
    render() {
        return (
            <div className="mating-season-animation">
                <div className="egg"/>
                <Sperm/>
            </div>
        );
    }
}

class Sperm extends Component {
    render() {
        return (
            <div className="sperm">
                <div className="tail">
                    <InlineSVG src={Wave} className="tail-inner"/>
                </div>
            </div>
        );
    }
}

export default MatingSeasonAnimation;