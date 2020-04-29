import React, {Component} from 'react';
import {animated, Transition} from "react-spring/renderprops";

/**
 * PROPS:
 * mode: string - relative or absolute (sets container position style)
 * containerClass: string - a class for the div
 */
class WindowTransition extends Component {
    render() {
        const fromStyle = {
            position: this.props.mode,
            opacity: 0,
            transform: 'scale(0.8)'
        };
        const enterStyle = {
            position: this.props.mode,
            opacity: 1,
            transform: 'scale(1)'
        };
        const leaveStyle = {
            position: this.props.mode,
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
                trail={this.props.trail}
            >
                {item => style =>
                    <animated.div
                        className={this.props.containerClass}
                        style={style}
                    >
                        {item}
                    </animated.div>}
            </Transition>
        );
    }
}

WindowTransition.defaultProps = {
    trail: 200,
    mode: 'absolute'
};

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
            opacity: 0,
            transform: 'translateY(-100%) rotate(-180deg) scale(1.5)',
            marginBottom: '1em'
        };
        const enterStyle = {
            opacity: 1,
            transform: 'translateY(0%) rotate(0deg) scale(1)',
            marginBottom: '1em'
        };
        const leaveStyle = {
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
            opacity: 0,
            transform: 'translateY(20%) scale(1)',
            marginBottom: '1em'
        };
        const neutral = {
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

class MainMenuMadeWithTransition extends Component {
    render() {
        const down = {
            opacity: 0,
            transform: 'translateY(1em)'
        };
        const neutral = {
            opacity: 1,
            transform: 'translateY(0em)'
        };

        return (
            <Transition
                items={this.props.children}
                keys={item => item}
                from={down}
                enter={neutral}
                leave={down}
                trail={1000}
            >
                {item => style => <animated.span style={style}>{item}</animated.span>}
            </Transition>
        );
    }
}

class CardMultinumberTransition extends Component {
    render() {
        const fromStyle = {
            opacity: 0
        };
        const enterStyle = {
            opacity: 1
        };
        const leaveStyle = {
            opacity: 0
        };

        return (
            <Transition
                items={this.props.children}
                from={fromStyle}
                enter={enterStyle}
                leave={leaveStyle}
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

/**
 * PROPS:
 * direction: string - 'left'/'right'
 */
class TabSwitcherTransition extends Component {
    render() {
        const left = {
            opacity: 0,
            transform: "translateX(-10%)"
        };
        const right = {
            opacity: 0,
            transform: "translateX(10%)"
        };
        const fromStyle = this.props.direction === 'left' ? left : right;
        const leaveStyle = this.props.direction === 'left' ? right : left;
        const enterStyle = {
            opacity: 1,
            transform: "translateX(0%)"
        };

        return (
            <Transition
                items={this.props.children}
                from={fromStyle}
                enter={enterStyle}
                leave={leaveStyle}
            >
                {item => style =>
                    <animated.div
                        className={this.props.className}
                        style={style}>
                        {item}
                    </animated.div>}
            </Transition>
        );
    }
}

/**
 * PROPS:
 * trail: number
 * containerClass: string
 */
class HandTransition extends Component {
    render() {
        const fromStyle = {
            width: 0,
            opacity: 0,
            transform: 'scale(0.8) translateY(100%)'
        };
        const enterStyle = {
            width: 'auto',
            opacity: 1,
            transform: 'scale(1) translateY(0%)'
        };
        const leaveStyle = {
            width: 0,
            opacity: 0,
            transform: 'scale(0.8) translateY(-100%)'
        };

        return (
            <Transition
                items={this.props.children}
                keys={item => item.key}
                from={fromStyle}
                enter={enterStyle}
                leave={leaveStyle}
                trail={this.props.trail}
            >
                {item => style =>
                    <animated.div
                        className={this.props.containerClass}
                        style={style}>
                        {item}
                    </animated.div>}
            </Transition>
        );
    }
}

HandTransition.defaultProps = {
    trail: 500
};

class DiscardPileTransition extends Component {
    render() {
        const fromStyle = {
            opacity: 0,
            transform: 'translateX(200%) rotate(-180deg) scale(1.5)'
        };
        const enterStyle = {
            opacity: 1,
            transform: 'translateX(0%) rotate(0deg) scale(1)'
        };
        const leaveStyle = {
            opacity: 0.99,
            transform: 'translateX(0%) rotate(0deg) scale(1)'
        };

        return (
            <Transition
                items={this.props.children}
                keys={item => item.key}
                from={fromStyle}
                enter={enterStyle}
                leave={leaveStyle}
                trail={500}
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

class BaseStackTransition extends Component {
    render() {
        const fromStyle = {
            opacity: 0,
            width: '0em'
        };
        const enterStyle = {
            opacity: 1,
            width: '0.15em'
        };
        const leaveStyle = {
            opacity: 0,
            width: '0em'
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
                {item => style =>
                    <animated.div className={this.props.containerClass} style={style}>
                        {item}
                    </animated.div>
                }
            </Transition>
        );
    }
}

class EndTurnTransition extends Component {
    render() {
        const fromStyle = {
            opacity: 0,
            transform: 'rotateX(-180deg)'
        };
        const enterStyle = {
            opacity: 1,
            transform: 'rotateX(0deg)'
        };
        const leaveStyle = {
            opacity: 0,
            transform: 'rotateX(180deg)'
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
                    <animated.div
                        className={this.props.containerClass}
                        style={style}>
                        {item}
                    </animated.div>}
            </Transition>
        );
    }
}

class CTPCardTransition extends Component {
    render() {
        const fromStyle = {
            width: 0,
            opacity: 0,
            transform: 'scale(0.8) translateY(-100%)',
            visibility: 'visible'
        };
        const enterStyle = {
            width: 'auto',
            opacity: 1,
            transform: 'scale(1) translateY(0%)',
            visibility: 'visible'
        };
        const leaveStyle = {
            width: 0,
            opacity: 0,
            visibility: 'hidden'
        };

        return (
            <Transition
                items={this.props.children}
                keys={item => item.key}
                from={fromStyle}
                enter={enterStyle}
                leave={leaveStyle}
                trail={0}
            >
                {item => style =>
                    <animated.div
                        className={this.props.containerClass}
                        style={style}>
                        {item}
                    </animated.div>}
            </Transition>
        );
    }
}

class EventOverlayTransition extends Component {
    render() {
        const fromStyle = {
            opacity: 0,
            height: '0em',
        };
        const toStyle = {
            opacity: 1,
            height: '20em'
        };

        return (
            <Transition
                items={this.props.children}
                keys={item => item.key}
                from={fromStyle}
                enter={toStyle}
                leave={fromStyle}
                trail={0}>
                {item => style => <animated.div style={style}>{item}</animated.div>}
            </Transition>
        );
    }
}

class ToastMessageTransition extends Component {
    render() {
        const fromStyle = {
            opacity: 0,
            transform: 'translateY(3em)'
        };
        const toStyle = {
            opacity: 1,
            transform: 'translateY(0em)'
        };

        return (
            <Transition
                items={this.props.children}
                keys={item => item.key}
                from={fromStyle}
                enter={toStyle}
                leave={fromStyle}
                trail={0}>
                {item => style =>
                    <animated.div
                        className={this.props.containerClass}
                        style={style}
                    >
                        {item}
                    </animated.div>}
            </Transition>
        );
    }
}

export {
    WindowTransition,
    ChatItemTransition,
    MainMenuLogoTransition,
    MainMenuItemTransition,
    MainMenuMadeWithTransition,
    CardMultinumberTransition,
    TabSwitcherTransition,
    HandTransition,
    DiscardPileTransition,
    BaseStackTransition,
    EndTurnTransition,
    CTPCardTransition,
    EventOverlayTransition,
    ToastMessageTransition
};