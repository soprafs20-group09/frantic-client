import React, {Component} from 'react';
import {ChatItemTransition} from "components/ui/Transitions";
import "styles/ui/Chat.scss";

const animationTrail = 200;

/**
 * This component holds chat messages.
 * Add ChatItems as children to display them.
 */
class ChatBox extends Component {
    constructor(props) {
        super(props);
        this.state = {trail: 0};
    }


    render() {
        return (
            <div className="chat-box">
                <ChatItemTransition trail={this.state.trail}>
                    {this.props.children}
                </ChatItemTransition>
                <div ref={e => this.msgDummy = e}/>
            </div>
        );
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({trail: animationTrail});
            this.scrollToBottom();
        }, animationTrail + 200);
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
        }, this.state.trail + 200);
    }
}

export default ChatBox;