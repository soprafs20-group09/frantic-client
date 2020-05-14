import React, {Component} from 'react';
import "styles/ui/events/GamblingManAnimation.scss";
import Icon from "components/ui/Icon";

class GamblingManAnimation extends Component {
    render() {
        return (
            <div className="gambling-man-animation">
                <div className="slot-machine">
                    <Slot/>
                    <Slot/>
                    <Slot/>
                </div>
                <div className="pull-stick"/>
                <div className="pull-handle"/>
            </div>
        );
    }
}

class Slot extends Component {
    render() {
        let icons = [];
        icons.push(<Icon from="event" className="slot">the-all-seeing-eye</Icon>);
        icons.push(<Icon from="event" className="slot">time-bomb</Icon>);
        icons.push(<Icon from="event" className="slot">friday-the-13th</Icon>);
        icons.push(<Icon from="event" className="slot">finish-line</Icon>);
        icons.push(<Icon from="event" className="slot">the-all-seeing-eye</Icon>);
        icons.push(<Icon from="event" className="slot">doomsday</Icon>);
        icons.push(<Icon from="event" className="slot">robin-hood</Icon>);
        icons.push(<Icon from="event" className="slot">surprise-party</Icon>);
        icons.push(<Icon from="event" className="slot">gambling-man</Icon>);
        icons.push(<Icon from="event" className="slot">the-all-seeing-eye</Icon>);
        icons.push(<Icon from="event" className="slot">time-bomb</Icon>);

        return (
            <div className="slot-container">
                {icons}
            </div>
        )
    }
}

export default GamblingManAnimation;