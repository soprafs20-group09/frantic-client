import React, {Component} from 'react';
import "styles/ui/ingame/OverlayMessage.scss";
import TextOverlay from "components/ui/ingame/TextOverlay";

/**
 * Renders a message, to be used as overlay over GameView.
 * PROPS:
 * style: string    - 'event', 'small': defines the style of the message
 *
 */
class EventOverlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: 'event:' + this.props.event,
            title: this.props.event.replace(/-/g, ' ').toUpperCase() + '!'
        };
    }

    render() {
        return (
            <div className="event-overlay-container">
                <TextOverlay icon={this.state.icon} title={this.state.title}>
                    {this.props.children}
                </TextOverlay>
            </div>
        );
    }
}

EventOverlay.defaultProps = {
    style: "small"
};


export default EventOverlay;