import React, {Component} from 'react';
import "styles/ui/events/EarthquakeAnimation.scss";
import InlineSVG from "react-inlinesvg";
import EqLeft from "assets/animations/eq-left.svg";
import EqRight from "assets/animations/eq-right.svg";

class EarthquakeAnimation extends Component {

    componentDidMount() {
        // we hack the container and append a class to make it shake
        try {
            let container = document.getElementsByClassName('event-overlay-container')[0].parentElement;
            container.classList.add('earthquake-shaker');
        } catch {
        }
    }

    render() {
        return (
            <div className="earthquake-animation">
                <div className="crack left">
                    <InlineSVG src={EqLeft} className="crack-border left"/>
                </div>
                <div className="crack right">
                    <InlineSVG src={EqRight} className="crack-border right"/>
                </div>
                <div className="crack-reveal"/>
            </div>
        );
    }
}

export default EarthquakeAnimation;