import React, {Component} from 'react';

import "styles/ui/events/DoomsdayAnimation.scss";

class DoomsdayAnimation extends Component {
    render() {
        return (
            <div className="doomsday-animation">
                <div className="doomsday-mushroom">
                    <div className="ring top"/>
                    <div className="head"/>
                    <div className="stem top"/>
                    <div className="ring bottom"/>
                    <div className="stem bottom"/>
                    <div className="splash-container">
                        <div className="splash left"/>
                        <div className="splash left"/>
                        <div className="splash left"/>
                        <div className="splash right"/>
                        <div className="splash right"/>
                        <div className="splash right"/>
                    </div>
                    <div className="ground"/>
                    <div className="cover"/>
                </div>
                <div className="doomsday-explosion"/>
            </div>
        );
    }
}

export default DoomsdayAnimation;