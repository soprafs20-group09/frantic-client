import React, {Component} from 'react';
import "styles/ui/events/ExpansionAnimation.scss";

class ExpansionAnimation extends Component {
    render() {
        return (
            <div className="expansion-animation">
                <div className="grid"/>
                <div className="arrow">
                    <div className="arrow-1st"/>
                    <div className="arrow-2nd"/>
                    <div className="arrow-3rd"/>
                    <div className="arrow-4th"/>
                    <div className="arrow-5th"/>
                    <div className="arrow-head"/>
                </div>
            </div>
        );
    }
}

export default ExpansionAnimation;