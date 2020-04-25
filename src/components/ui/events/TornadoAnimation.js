import React, {Component} from 'react';
import "styles/ui/events/TornadoAnimation.scss";

class TornadoAnimation extends Component {
    render() {
        return (
            <div className="tornado-container">
                <div className="whirl"/>
                <div className="whirl"/>
                <div className="whirl"/>
                <div className="whirl"/>
                <div className="whirl"/>
                <div className="ground"/>
                <span className="rubble-container top"><span className="rubble"/></span>
                <span className="rubble-container mid"><span className="rubble"/></span>
                <span className="rubble-container bot"><span className="rubble"/></span>
            </div>
        );
    }
}

export default TornadoAnimation;