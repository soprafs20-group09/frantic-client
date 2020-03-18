import React, {Component} from 'react';
import InlineSVG from "react-inlinesvg";
import Send from "assets/icons/send.svg";
import "styles/ui/ChatWindow.scss";

class ChatWindow extends Component {
    render() {
        return (
            <div className="window-container chat">
                <div className="chat-box"/>
                <div className="chat-input-container">
                    <input className="chat-input"/>
                    <InlineSVG src={Send} className="chat-send-button"/>
                </div>
            </div>
        );
    }
}

export default ChatWindow;