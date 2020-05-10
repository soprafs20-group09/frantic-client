import React, {Component} from 'react';
import AppContainer from "components/ui/AppContainer";
import "styles/ui/ingame/OverlayMessage.scss";
import {withRouter} from "react-router-dom";
import {EventOverlayTransition} from "components/ui/Transitions";
import uiUtils from "utils/uiUtils";

class AnimationView extends Component {
    render() {
        return (
            <AppContainer>
                <EventOverlayTransition>
                    <div className="event-overlay-container" style={{overflow: 'hidden'}}>
                        <div className="event-overlay-content" style={{overflow: 'hidden'}}>
                            {uiUtils.getEventAnimation(this.props.match.params.event)}
                        </div>
                    </div>
                </EventOverlayTransition>
            </AppContainer>
        );
    }
}

export default withRouter(AnimationView);