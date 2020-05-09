import React, {Component} from 'react';
import"styles/ui/events/AllSeeingEyeAnimation.scss";
import InlineSVG from "react-inlinesvg";
import AllSeeingEye from "assets/frantic/event-cards/the-all-seeing-eye.svg";
import LightRays from "assets/animations/light-rays.svg";


class AllSeeingEyeAnimation extends Component {
    render() {
        return (
            <div className="all-seeing-eye-animation">
                <InlineSVG src={AllSeeingEye} className="eye"/>
                <InlineSVG src={LightRays} className="rays"/>
            </div>
        );
    }
}

export default AllSeeingEyeAnimation;