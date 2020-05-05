import React, {Component} from 'react';
import "styles/ui/Chat.scss";
import InlineSVG from "react-inlinesvg";
import sessionManager from "utils/sessionManager";

/**
 * This component renders a chat message or announcement.
 * PROPS:
 * style: string    - 'msg' or 'event'. Determines in what style the ChatItem should be rendered.
 *                    'msg' for normal text messages with a sender
 *                    'event' for event messages.
 * sender: string   - sets a sender for msg-style ChatItems.
 * color: string    - determines the sender's color if style='msg', otherwise colors the event itself.
 * icon: string     - a source string for an image to be rendered left of the message.
 * svgIcon: boolean - if this is set, the icon is loaded as an SVG and filled.
 *
 * Children are the message!
 */
class ChatItem extends Component {
    render() {
        let style = this.props.style || 'msg';
        let sender, icon;
        let youAddition = " ";
        if (this.props.sender === sessionManager.username) {
            youAddition += "chat-username-highlight";
        }

        if (this.props.sender) {
            sender =
                <p
                    className={"chat-item-sender" + youAddition}
                    style={{color: this.props.color}}
                >
                    {this.props.sender}:
                </p>;
        }
        if (this.props.icon) {
            if (this.props.svgIcon) {
                icon =
                    <InlineSVG
                        src={this.props.icon}
                        className="chat-item-icon"
                    />;
            } else {
                icon =
                    <img
                        src={this.props.icon}
                        className="chat-item-icon"
                    />;
            }
        } else {
            icon = <div className="chat-item-icon"/>;
        }

        return (
            <div className={`chat-item ${style}`}>
                {icon}
                {sender}
                <p className="chat-item-text">{this.props.children}</p>
            </div>
        );
    }
}

export default ChatItem;