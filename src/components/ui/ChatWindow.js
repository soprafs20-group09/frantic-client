import React, {Component} from 'react';
import ChatBox from "components/ui/chat/ChatBox";
import "styles/ui/Chat.scss";
import ChatInput from "components/ui/chat/ChatInput";

/**
 * A floating chat window with 100% height.
 * PROPS:
 * maxHeight: string    - a CSS override.
 * onSend: func(string) - a function that is called whenever the user tries to send a message
 */
class ChatWindow extends Component {
    render() {
        return (
            <div className="window-container chat" style={{maxHeight: this.props.maxHeight}}>
                <ChatBox>
                    {this.props.children}
                </ChatBox>
                <ChatInput onSend={msg => this.handleSend(msg)}/>
            </div>
        );
    }

    handleSend(msg) {
        if (this.props.onSend) {
            this.props.onSend(msg);
        }
    }
}

export default ChatWindow;