import React, {Component} from 'react';
import "styles/ui/Chat.scss";

/**
 * This component holds chat messages.
 * Add ChatItems as children to display them.
 */
class ChatBox extends Component {
    render() {
        return (
            <div className="chat-box">
                {this.props.children}
                <div ref={e => this.msgDummy = e}/>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.msgDummy.scrollIntoView({behavior: "smooth"});
    }
}

export default ChatBox;