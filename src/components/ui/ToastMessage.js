import React, {Component} from 'react';
import "styles/ui/UiElements.scss";
import IconTitle from "components/ui/IconTitle";
import {ToastMessageTransition} from "components/ui/Transitions";

/**
 * Shows a message that flies in from the bottom and stays for
 * a defined amount of time.
 * PROPS:
 * icon: string     - icon in the format <from>:<icon>
 * duration: number - duration the message should stay for in seconds. (default: 3)
 * children: string - the message to display.
 * show: boolean    - whether to show the message at all. (default: true)
 */
class ToastMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {show: this.props.show};
    }

    componentDidMount() {
        setTimeout(() => this.hide(), this.props.duration * 1000);
    }

    render() {
        return (
            <div className="toast-container">
                <ToastMessageTransition containerClass="toast-transition">
                    {this.state.show &&
                    <div className="toast-message">
                        <IconTitle icon={this.props.icon}>
                            {this.props.children}
                        </IconTitle>
                    </div>}
                </ToastMessageTransition>
            </div>
        );
    }

    hide() {
        this.setState({show: false});
    }
}

ToastMessage.defaultProps = {
    duration: 3,
    show: true
};

export default ToastMessage;