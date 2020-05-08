import React, {Component} from 'react';
import "styles/ui/events/ExpansionRecessionAnimation.scss";

class RecessionAnimation extends Component {
    render() {
        return (
            <div className="expansion-animation recession">

                <div className="arrow">
                    <div className="arrow-1st"/>
                    <div className="arrow-2nd"/>
                    <div className="arrow-3rd"/>
                    <div className="arrow-4th"/>
                    <div className="arrow-5th"/>
                    <div className="arrow-head"/>
                    <div className="hide-box"/>
                </div>
                <div className="grid"/>
            </div>
        );
    }
}

export default RecessionAnimation;