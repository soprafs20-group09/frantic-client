import React, {Component} from 'react';
import {animated, Transition} from "react-spring/renderprops";

class WindowTransition extends Component {
    render() {
        const fromStyle = {
            position: 'absolute',
            opacity: 0,
            transform: 'scale(0.8)'
        };
        const enterStyle = {
            position: 'absolute',
            opacity: 1,
            transform: 'scale(1)'
        };
        const leaveStyle = {
            position: 'absolute',
            opacity: 0,
            transform: 'scale(0.8)'
        };

        return (
            <Transition
                items={this.props.children}
                keys={item => item.key}
                from={fromStyle}
                enter={enterStyle}
                leave={leaveStyle}
                trail={200}
            >
                {item => style => <animated.div style={style}>{item}</animated.div>}
            </Transition>
        );
    }
}

class ChatItemTransition extends Component {
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
            <Transition
                items={this.props.children}
                keys={item => item.key}
                from={fromStyle}
                enter={toStyle}
                leave={fromStyle}
                trail={this.props.trail || 200}>
                {item => style => <animated.div style={style}>{item}</animated.div>}
            </Transition>
        );
    }
}

class MainMenuLogoTransition extends Component {
    render() {
        const fromStyle = {
            height: 0,
            opacity: 0,
            transform: 'translateY(-100%) rotate(-180deg) scale(1.5)',
            marginBottom: '1em'
        };
        const enterStyle = {
            height: '16em',
            opacity: 1,
            transform: 'translateY(0%) rotate(0deg) scale(1)',
            marginBottom: '1em'
        };
        const leaveStyle = {
            height: 0,
            opacity: 0,
            transform: 'translateY(-100%) rotate(0deg) scale(1)',
            marginBottom: '1em'
        };

        return (
            <Transition
                items={this.props.children}
                from={fromStyle}
                enter={enterStyle}
                leave={leaveStyle}
                trail={200}
            >
                {item => style =>
                    <animated.div className={this.props.containerClass} style={style}>
                        {item}
                    </animated.div>
                }
            </Transition>
        );
    }
}

class MainMenuItemTransition extends Component {
    render() {
        const down = {
            height: 0,
            opacity: 0,
            transform: 'translateY(20%) scale(1)',
            marginBottom: '1em'
        };
        const neutral = {
            height: '16em',
            opacity: 1,
            transform: 'translateY(0%) scale(1)',
            marginBottom: '1em'
        };

        return (
            <Transition
                items={this.props.children}
                keys={item => item.key}
                from={down}
                enter={neutral}
                leave={down}
                trail={400}
            >
                {item => style => <animated.div style={style}>{item}</animated.div>}
            </Transition>
        );
    }
}

class CardRandomNumberTransition extends Component {
    render() {
        const fromStyle = {
            opacity: 0,
            // transform: 'translateY(-100%)'
        };
        const enterStyle = {
            opacity: 1,
            // transform: 'translateY(0%)'
        };
        const leaveStyle = {
            opacity: 0,
            // transform: 'translateY(100%%)'
        };

        return (
            <Transition
                items={this.props.children}
                from={fromStyle}
                enter={enterStyle}
                leave={leaveStyle}
                trail={0}
            >
                {item => style =>
                    <animated.p className={this.props.className}>
                        <div style={style}>
                            {item}
                        </div>
                    </animated.p>}
            </Transition>
        );
    }
}

export {
    WindowTransition,
    ChatItemTransition,
    MainMenuLogoTransition,
    MainMenuItemTransition,
    CardRandomNumberTransition,
};