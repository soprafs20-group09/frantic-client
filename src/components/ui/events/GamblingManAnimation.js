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
        icons.push(<Icon from="event" className="slot">the-all-seeing-eye</Icon>);
        icons.push(<Icon from="event" className="slot">time-bomb</Icon>);
        this.shuffleArray(icons);

        icons.splice(icons.length - 2, 0, <Icon from="event" className="slot">gambling-man</Icon>);

        return (
            <div className="slot-container">
                {icons}
            </div>
        )
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
}

export default GamblingManAnimation;