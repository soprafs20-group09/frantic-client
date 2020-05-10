import React, {Component} from 'react';
import "styles/ui/events/CommunismAnimation.scss";
import Card from "components/ui/cards/Card";
import InlineSVG from "react-inlinesvg";
import Icon from "components/ui/Icon";
import Cap from "assets/animations/communism-hat.svg";
import Rays from "assets/animations/light-rays.svg";
import franticUtils from "utils/franticUtils";

class CommunismAnimation extends Component {
    render() {
        return (
            <div className="communism-animation">
                <div className="dear-leader">
                    <div className="communism-card flipped">
                            <Card
                                type="special"
                                value="equality"
                                color="accent"
                            />
                        <Icon from="special" className="fist">counterattack</Icon>
                    </div>
                    <InlineSVG src={Cap} className="hat"/>
                </div>

                <CommunismFlow/>

                <div className="communism-logo">
                    <InlineSVG src={Rays} className="rays"/>
                    <Icon from="event" className="communism">communism</Icon>
                </div>
            </div>
        );
    }
}

class CommunismFlow extends Component {
    render() {
        return (
            <div className="communism-flow-container">
                <div className="communism-flow">
                    <CommunismFlowPart/>
                    <CommunismFlowPart/>
                </div>
            </div>
        );
    }
}

class CommunismFlowPart extends Component {
    constructor(props) {
        super(props);
        this.state = {cards: franticUtils.generateBackCards(8)}
    }

    render() {
        let cards = [];

        for (let c of this.state.cards) {
            cards.push(
                <div className="soldier">
                    <Card
                        type={c.type}
                        value={c.value}
                        color="accent"
                        key={c.key}
                    />
                    <Icon from="special" className="soldier-fist">counterattack</Icon>
                </div>
            );
        }

        return (
            <div className="part">
                {cards}
            </div>
        );
    }
}

export default CommunismAnimation;