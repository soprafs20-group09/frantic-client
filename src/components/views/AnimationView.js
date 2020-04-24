import React, {Component} from 'react';
import AppContainer from "components/ui/AppContainer";
import "styles/ui/ingame/OverlayMessage.scss";
import EventAnimations from "components/ui/ingame/EventAnimations";
import {withRouter} from "react-router-dom";
import {EventOverlayTransition} from "components/ui/Transitions";

class AnimationView extends Component {
    render() {
        return (
            <AppContainer>
                <EventOverlayTransition>
                    <div className="event-overlay-container" style={{overflow: 'visible'}}>
                        <div className="event-overlay-content" style={{border: "1px solid black", overflow: 'hidden'}}>
                            {EventAnimations.getAnimation(this.props.match.params.event)}
                        </div>
                    </div>
                </EventOverlayTransition>
            </AppContainer>
        );
    }
}

export default withRouter(AnimationView);