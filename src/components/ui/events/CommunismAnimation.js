import React, {Component} from 'react';
import "styles/ui/events/CommunismAnimation.scss";
import Card from "components/ui/cards/Card";
import InlineSVG from "react-inlinesvg";
import Icon from "components/ui/Icon";
import Cap from "assets/animations/communism-hat.svg";
import Rays from "assets/animations/light-rays.svg";

class CommunismAnimation extends Component {
    render() {
        return (
            <div className="communism-animation">
                <div className="communism-card flipped">
                    <div className="card-face front">
                        <Card
                            type="back"
                            color="accent"
                        />
                    </div>
                    <div className="card-face back">
                        <Card
                            type="special"
                            value="equality"
                            color="accent"
                        />
                    </div>
                </div>
                <InlineSVG src={Cap} className="hat"/>
                <span className="exclamation">!</span>
                <Icon from="special" className="fist">counterattack</Icon>
                <div className="communism-logo">
                    <InlineSVG src={Rays} className="rays"/>
                    <Icon from="event" className="communism">communism</Icon>
                </div>
            </div>
        );
    }
}

export default CommunismAnimation;