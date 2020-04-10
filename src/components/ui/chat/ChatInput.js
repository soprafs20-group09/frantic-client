import React, {Component} from 'react';
import InlineSVG from "react-inlinesvg";
import Send from "assets/icons/send.svg";

/**
 * Displays a chat-input.
 * PROPS:
 * onSend: function(string) - a function to be called whenever the user tries to send a message.
 */
class ChatInput extends Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.value || ''};
    }

    render() {
        let disabled = this.state.value ? '' : ' disabled';

        return (
            <div className="chat-input-container">
                <input
                    className="chat-input"
                    onChange={e => this.handleInputChange(e)}
                    onKeyUp={e => this.handleKeyUp(e)}
                    value={this.state.value}
                />
                <InlineSVG
                    src={Send}
                    className={"chat-send-button" + disabled}
                    onClick={() => this.handleSend()}
                />
            </div>
        );
    }

    handleInputChange(e) {
        this.setState({value: e.target.value});
    }

    handleKeyUp(e) {
        if (e.key === 'Enter') {
            this.handleSend();
        }
    }

    handleSend() {
        if ( this.state.value) {
            if (this.props.onSend) {
                this.props.onSend(this.state.value);
            }
            this.setState({value: ''});
        }
    }
}

export default ChatInput;