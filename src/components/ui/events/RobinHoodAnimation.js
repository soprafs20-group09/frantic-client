import React, {Component} from 'react';
import CharityLogo from "assets/frantic/event-cards/charity.svg"
import InlineSVG from "react-inlinesvg";
import "styles/ui/events/RobinHoodAnimation.scss";
import {animated, Spring} from "react-spring/renderprops";

class RobinHoodAnimation extends Component {
    render() {
        const drawnString = "M 316,80 s 50,98, 50,100 -50,100 -50,100";
        const sharpString = "M 316,80 s 0,95, 0,100 0,100 0,100";
        const curvedString = "M 316,80 s 0,55, 0,100 0,100 0,100";

        const fromStyle = {
            d: drawnString
        };
        const toStyle = {
            d: curvedString
        };

        return (
            <div className="robin-hood-container">
                <svg className="bow" xmlns="http://www.w3.org/2000/svg" viewBox="266.9 71.6 99.1 215">
                    <Spring
                        from={fromStyle}
                        to={toStyle}
                        delay={2500}
                        config={{tension: 4000, friction: 15}}
                    >
                        {style =>
                            <animated.path className="bow-string"
                                           d={style.d}/>
                        }
                    </Spring>
                    <path
                        className="st0" d="M314.2,286.7l-4.7-4.4l2.1-1.7c0,0,1.8-2.2,2.2-6c0.7-5.1-1.3-10.6-5.7-16.2c-2.8-3.6-5.7-7.1-8.7-10.6
	c-15-18-32.5-36.6-32.5-69.1c0-33,21.8-57.3,34.9-73.4c2.2-2.7,4.4-5.4,6.2-7.7c4-5.2,5.9-10,5.5-14.3c-0.3-4.2-4.1-7.6-4.2-7.6
	l5.1-4.1c0.2,0.2,4.3,4.1,4.9,11.2c0.4,6.2-1.8,12.7-6.9,19.3c-1.9,2.5-4,5.1-6.3,7.9c-13.3,16.2-29,38.4-29,68.8
	c0,29.8,11.7,46.6,26.5,64.5c2.9,3.5,5.9,7,8.8,10.7C328.6,274.7,314.3,286.6,314.2,286.7z"/>
                </svg>
                <div className="wall"/>
                <div className="arrow">
                    <div className="point"/>
                    <div className="shaft"/>
                    <div className="tail">
                        <div className="upper"/>
                        <div className="lower"/>
                    </div>
                </div>
                <div className="sack-of-gold">
                    <div className="upper">
                        <div className="circle1"/>
                        <div className="circle2"/>
                        <div className="circle3"/>
                        <div className="triangle-left"/>
                        <div className="triangle-right"/>
                    </div>
                    <div className="middle"/>
                    <div className="lower"/>
                    <InlineSVG src={CharityLogo} className="dollar-sign"/>
                </div>
                <div className="arrow-cover1"/>
                <div className="arrow-cover2"/>
            </div>
        );
    }
}

export default RobinHoodAnimation;