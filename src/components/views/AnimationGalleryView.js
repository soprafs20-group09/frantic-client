import React, {Component} from 'react';
import AppContainer from "components/ui/AppContainer";
import franticUtils from "utils/franticUtils";
import uiUtils from "utils/uiUtils";
import "styles/views/AnimationGalleryView.scss";
import VisibilitySensor from "react-visibility-sensor";
import IconTitle from "components/ui/IconTitle";
import Logo from "assets/frantic/logo-text.svg";
import InlineSVG from "react-inlinesvg";
import {animated, Spring} from "react-spring/renderprops";

class AnimationGalleryView extends Component {
    componentDidMount() {
        document.title = "Animation Gallery - Frantic";
    }

    render() {
        let events = [];
        for (let event of franticUtils.constants.events) {
            events.push(
                <VisibilitySensor partialVisibility={true} key={event}>
                    {({isVisible}) =>
                        <div className="animation-gallery-item">
                            <div className="animation-gallery-title-outer">
                                <h1 className="animation-gallery-title">
                                    <IconTitle icon={'event:' + event}>
                                        {event.replace(/-/g, ' ')}
                                    </IconTitle>
                                </h1>
                            </div>
                            <div
                                className="event-overlay-container"
                                style={{overflow: 'hidden'}}
                                key={event}
                            >
                                <div className="event-overlay-content" style={{overflow: 'hidden'}}>
                                    {isVisible ? uiUtils.getEventAnimation(event) : null}
                                </div>
                            </div>
                        </div>
                    }
                </VisibilitySensor>
            );
        }

        const fromStyle = {
            transform: 'rotate(-2deg)'
        };
        const toStyle = {
            transform: 'rotate(0deg)'
        };

        return (
            <AppContainer withBack>
                <div className="animation-gallery">
                    <div className="animation-gallery-intro">
                        <div className="inner">
                            <InlineSVG src={Logo} className="logo"/>
                            <Spring
                                native
                                from={fromStyle}
                                to={toStyle}
                                config={{tension: 5, friction: 0}}
                            >
                                {style =>
                                    <animated.h2 className="subtitle" style={style}>Animation Gallery</animated.h2>
                                }
                            </Spring>

                            <p className="description">
                                Welcome to the Animation Gallery!
                                <br/>
                                Here you can find all the animations
                                our animation team has carefully crafted using HTML, SCSS
                                and sometimes a touch of JavaScript.
                                <br/>
                                All events are sorted alphabetically by name,
                                please keep that in mind when searching for a specific event.
                            </p>
                        </div>
                    </div>
                    {events}
                </div>
            </AppContainer>
        );
    }
}

export default AnimationGalleryView;