import React, {Component} from 'react';
import "styles/ui/events/GamblingManAnimation.scss";
import Icon from "components/ui/Icon";

class GamblingManAnimation extends Component {
    render() {
        return (
            <div className="gambling-man-animation">
                <div className="slot-machine">
                    <Slot/>
                </div>

            </div>
        );
    }
}

class Slot extends Component {
    /*constructor(props) {
        super(props);
        this.state = {icons: };
    }*/
    render() {
        let icons = [];
        icons.push(<Icon from="event" className="slot">the-all-seeing-eye</Icon>);
        icons.push(<Icon from="event" className="slot">time-bomb</Icon>);
        icons.push(<Icon from="event" className="slot">finish-line</Icon>);
        icons.push(<Icon from="event" className="slot">doomsday</Icon>);
        icons.push(<Icon from="event" className="slot">robin-hood</Icon>);
        icons.push(<Icon from="event" className="slot">surprise-party</Icon>);
        icons.push(<Icon from="event" className="slot">gambling-man</Icon>);
        icons.push(<Icon from="event" className="slot">the-all-seeing-eye</Icon>);
        icons.push(<Icon from="event" className="slot">time-bomb</Icon>);

        return (
            <div>
                {icons}
            </div>
        )
    }
}

export default GamblingManAnimation;