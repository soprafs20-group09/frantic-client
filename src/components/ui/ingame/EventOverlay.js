import React, {Component} from 'react';
import "styles/ui/ingame/OverlayMessage.scss";
import TextOverlay from "components/ui/ingame/TextOverlay";
import uiUtils from "utils/uiUtils";

/**
 * Renders a message, to be used as overlay over GameView.
 * PROPS:
 * style: string    - 'event', 'small': defines the style of the message
 * event: string    - event name, for displaying animation and title
 * children: any    - whatever to display under the title.
 */
class EventOverlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: 'event:' + this.props.event,
            title: this.props.event.replace(/-/g, ' ').toUpperCase() + '!',
            animation: true
        };
    }

    componentDidMount() {
        this.resetAnimationTimeout();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.event !== prevProps.event) {
            this.resetAnimationTimeout();
        }
    }

    render() {
        return (
            <div className="event-overlay-container">
                {this.getContent()}
            </div>
        );
    }

    getContent() {
        let content;
        let key = this.state.animation ? 'out' : 'in';

        if (this.state.animation) {
            content = uiUtils.getEventAnimation(this.props.event);
        } else {
            content =
                <TextOverlay icon={this.state.icon} title={this.state.title}>
                    {this.props.children}
                </TextOverlay>;
        }

        return <div className={"event-overlay-content " + key} key={key}>{content}</div>;
    }

    resetAnimationTimeout() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
            this.timeout = null;
            this.setState({animation: false});
        }, 5500);
    }
}

EventOverlay.defaultProps = {
    style: "small"
};


export default EventOverlay;