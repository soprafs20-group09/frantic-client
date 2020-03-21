import React, {Component} from 'react';
import {animated, Transition} from "react-spring/renderprops";
import "styles/ui/Chat.scss";

const animationTrail = 200;

/**
 * This component holds chat messages.
 * Add ChatItems as children to display them.
 */
class ChatBox extends Component {
    render() {
        const fromStyle = {
            opacity: 0,
            transform: 'translateY(50%) scale(0.7)'
        };
        const toStyle = {
            opacity: 1,
            transform: 'translateY(0%) scale(1)'
        };


        return (
            <div className="chat-box">
                <Transition
                    items={this.props.children}
                    keys={item => item.key}
                    from={fromStyle}
                    enter={toStyle}
                    leave={fromStyle}
                    trail={animationTrail}>
                    {item => style => <animated.div style={style}>{item}</animated.div>}
                </Transition>
                <div ref={e => this.msgDummy = e}/>
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.scrollToBottom();
    }

    scrollToBottom() {
        //this timeout is needed because of the animation trail
        setTimeout(() => this.msgDummy.scrollIntoView({behavior: "smooth"}), animationTrail);
    }
}

export default ChatBox;