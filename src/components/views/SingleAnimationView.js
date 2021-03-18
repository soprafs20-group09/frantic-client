import React, {Component} from 'react';
import AppContainer from "components/ui/AppContainer";
import "styles/ui/ingame/OverlayMessage.scss";
import {withRouter} from "react-router-dom";
import {EventOverlayTransition} from "components/ui/Transitions";
import uiUtils from "utils/uiUtils";
import Button from "components/ui/Button";
import TurnTimer from "components/ui/ingame/TurnTimer";

class SingleAnimationView extends Component {
    constructor(props) {
        super(props);
        this.state = {overflow: 'hidden'}
    }

    render() {
        return (
            <AppContainer>
                <EventOverlayTransition>
                    <div className="event-overlay-container" style={{overflow: this.state.overflow}}>
                        <div className="event-overlay-content" style={{overflow: 'hidden'}}>
                            {uiUtils.getEventAnimation(this.props.match.params.event)}
                        </div>
                    </div>
                </EventOverlayTransition>
                <div style={{position: 'absolute', bottom: '0.5em', right: '0.5em'}}>
                    <Button style='end-turn' onClick={() => this.toggleOverflow()}>toggle overflow</Button>
                </div>
                <div style={{position: 'absolute', bottom: '0.5em', left: '0.5em'}}>
                    <TurnTimer start seconds={5}/>
                </div>
            </AppContainer>
        );
    }

    toggleOverflow() {
        this.setState({overflow: this.state.overflow === 'hidden' ? 'visible' : 'hidden'});
    }
}

export default withRouter(SingleAnimationView);