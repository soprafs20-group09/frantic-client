import React, {Component} from 'react';
import {ChatItemTransition} from "components/ui/Transitions";
import "styles/ui/Chat.scss";

const animationTrail = 200;

/**
 * This component holds chat messages.
 * Add ChatItems as children to display them.
 */
class ChatBox extends Component {
    render() {
        return (
            <div className="chat-box">
                <ChatItemTransition trail={animationTrail}>
                    {this.props.children}
                </ChatItemTransition>
                <div ref={e => this.msgDummy = e}/>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.scrollToBottom();
    }

    scrollToBottom() {
        //this timeout is needed because of the animation trail
        setTimeout(() => {
            if (this.msgDummy) {
                this.msgDummy.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }
        }, animationTrail);
    }
}

export default ChatBox;