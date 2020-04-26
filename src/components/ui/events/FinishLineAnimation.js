import React, {Component} from 'react';
import "styles/ui/events/FinishLineAnimation.scss";
import Icon from "components/ui/Icon";

class FinishLineAnimation extends Component {
    render() {
        return (
            <div className="finishline-container">
                <div className="fl-runners-container">
                    <span className="finish-line"/>
                    <div className="running-man"/>
                    <div className="running-man"/>
                    <div className="running-man"/>
                </div>
                <Icon from="event" className="finish-flag">finish-line</Icon>
            </div>
        );
    }
}

export default FinishLineAnimation;