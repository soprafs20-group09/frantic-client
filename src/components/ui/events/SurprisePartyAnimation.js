import React, {Component} from 'react';
import "styles/ui/events/SurprisePartyAnimation.scss";

class SurprisePartyAnimation extends Component {
    render() {
        return (
            <div className="surprise-party-container">
                <div className="present">
                    <div className="left"/>
                    <div className="right"/>
                    <div className="left-shadow"/>
                    <div className="right-shadow"/>
                    <div className="left-cover"/>
                    <div className="right-cover"/>
                    <div className="top-cover">
                        <div className="top-cover1"/>
                    </div>
                    <div className="present-ribbon">
                        <div className="top-left-ribbon"/>
                        <div className="top-right-ribbon"/>
                        <div className="left-ribbon"/>
                        <div className="right-ribbon"/>
                        <div className="top-ribbon">
                            <div className="rounded-triangle1">
                                <div className="triangle"/>
                            </div>
                            <div className="rounded-triangle2">
                                <div className="triangle"/>
                            </div>
                            <div className="circle"/>
                        </div>
                    </div>
                </div>
                <div className="surprise-text">
                    Surprise!
                </div>
                <div className="confetti-container">
                    <div className="confetti"/>
                    <div className="confetti"/>
                    <div className="confetti"/>
                    <div className="confetti"/>
                    <div className="confetti"/>
                    <div className="confetti"/>
                    <div className="confetti"/>
                    <div className="confetti"/>
                    <div className="confetti"/>
                    <div className="confetti"/>
                </div>
            </div>
        );
    }
}

export default SurprisePartyAnimation;