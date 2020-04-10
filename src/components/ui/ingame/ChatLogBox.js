import React, {Component} from 'react';
import ChatBox from "components/ui/chat/ChatBox";
import "styles/ui/Chat.scss";
import "styles/ui/ingame/ChatLogBox.scss";
import {animated, Spring} from "react-spring/renderprops";
import ChatInput from "components/ui/chat/ChatInput";

/**
 * Shows a chat and game log box.
 * PROPS:
 * onSend: function(string) - a function to be called whenever the user tries to send a message.
 * children: array of <ChatItem>.
 */
class ChatLogBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    render() {
        const minimizedStyle = {
            boxStyle: {
                height: '15vh'
            },
            inputStyle: {
                height: '0em'
            }
        };
        const boxMin = {
                height: '15vh'
            },
            boxMax = {
                height: '80vh'
            },
            inputMin = {
                height: '0em'
            },
            inputMax = {
                height: '1.9em'
            };

        return (
            <Spring
                from={this.state.expanded ? boxMin : boxMax}
                to={this.state.expanded ? boxMax : boxMin}
            >
                {boxProps =>
                    <animated.div className="chat-log-container" style={boxProps}>
                        <div
                            className={"chat-expand-icon" + (this.state.expanded ? ' expanded' : '')}
                            onClick={() => this.toggleExpand()}
                        />
                        <div className={"chat-log-content" + (this.state.expanded ? ' expanded' : '')}>
                            <ChatBox>
                                {this.props.children}
                            </ChatBox>
                            <Spring
                                from={this.state.expanded ? inputMin : inputMax}
                                to={this.state.expanded ? inputMax : inputMin}
                            >
                                {inputProps =>
                                    <div className="chat-log-input-container" style={inputProps}>
                                        <ChatInput onSend={this.props.onSend}/>
                                    </div>
                                }
                            </Spring>
                        </div>
                    </animated.div>
                }
            </Spring>
        );
    }

    toggleExpand() {
        this.setState({expanded: !this.state.expanded});
    }
}

export default ChatLogBox;