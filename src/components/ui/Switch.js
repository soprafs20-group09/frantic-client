import React, {Component} from 'react';
import {animated, Spring} from "react-spring/renderprops";

/**
 * This component renders a simple on/off switch.
 * PROPS:
 * title: string            - an optional title to be displayed left of the switch.
 * on: string               - a custom title for "on".
 * off: string              - a custom title for "off".
 * initialValue: bool       - sets the value when first loaded.
 * onSwitch: func(newValue) - a function that is called whenever the value changes.
 * readOnly: boolean        - makes this component read only.
 * disabled: boolean        - renders this component as disabled. (overrides readOnly)
 * style: object            - an optional style override for the container.
 */
class Switch extends Component {

    constructor(props) {
        super(props);

        this.state = {value: this.props.initialValue || false};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.initialValue !== prevProps.initialValue) {
            this.setState({value: this.props.initialValue || false});
        }
    }

    render() {
        const from = {x: this.isOn() ? '1.5em' : '0em'};
        const to = {x: this.isOn() ? '0em' : '1.5em'};

        return (
            <div className="switch-container" style={this.props.style}>
                <p className="switch-title">{this.props.title}</p>
                <div className="switch-description">{this.props.on || 'on'}</div>
                <div className={`switch-rail ${this.props.disabled && 'disabled'}`}
                     onClick={() => this.switch()}>
                    <Spring
                        native
                        config={{tension: 200, friction: 15}}
                        from={from}
                        to={to}>
                        {props =>
                            <animated.div
                                className={`switch-nob ${this.props.disabled && 'disabled'}`}
                                style={{transform: `translateX(${props.x})`}}
                            />
                        }
                    </Spring>
                </div>
                <div className="switch-description">{this.props.off || 'off'}</div>
            </div>
        );
    }

    isOn() {
        return this.state.value;
    }

    switch() {
        if (this.props.readOnly || this.props.disabled) {
            return;
        }

        this.setState({value: !this.state.value});

        if (this.props.onSwitch) {
            this.props.onSwitch(!this.state.value);
        }
    }
}

export default Switch;