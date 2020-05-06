import React, {Component} from 'react';
import CharityLogo from "assets/frantic/event-cards/charity.svg";
import InlineSVG from "react-inlinesvg";
import "styles/ui/events/CharityAnimation.scss";

class CharityAnimation extends Component {
    render() {
        return (
            <div className="charity-container">
                <div className="charity-coin">
                    <div className="outer-coin"/>
                    <div className="inner-coin"/>
                </div>
                <div className="charity-coin">
                    <div className="outer-coin"/>
                    <div className="inner-coin"/>
                </div>
                <div className="charity-coin">
                    <div className="outer-coin"/>
                    <div className="inner-coin"/>
                </div>
                <div className="charity-box">
                    <div className="bot"/>
                    <InlineSVG src={CharityLogo} className="charity-logo"/>
                    <div className="top-side"/>
                    <div className="top-side-shadow1"/>
                    <div className="top-side-shadow2"/>
                    <div className="top-front"/>
                    <div className="opening"/>
                </div>
                <div className="top-back"/>
                <InlineSVG src={CharityLogo} className="big-charity-logo"/>
            </div>
        );
    }
}

export default CharityAnimation;