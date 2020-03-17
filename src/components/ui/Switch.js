import React, {Component} from 'react';
import {Spring} from "react-spring/renderprops";

/**
 * This component renders a simple on/off switch.
 * PROPS:
 * title: string            - an optional title to be displayed left of the switch.
 * on: string               - a custom title for "on".
 * off: string              - a custom title for "off".
 * initialValue: bool       - sets the value when first loaded.
 * onSwitch: func(newValue) - a function that is called whenever the value changes.
 * style: object            - an optional style override for the container.
 */
class Switch extends Component {

    constructor(props) {
        super(props);

        this.state = {value: this.props.initialValue || false};
    }

    render() {
        const from = {x: this.isOn() ? '30px' : '0px'};
        const to = {x: this.isOn() ? '0px' : '30px'};

        return (
            <div className="switch-container" style={this.props.style}>
                <p className="switch-title">{this.props.title}</p>
                <div className="switch-description">{this.props.on || 'on'}</div>
                <div className="switch-rail"
                     onClick={() => this.switch()}>
                    <Spring
                        config={{tension: 200, friction: 15}}
                        from={from}
                        to={to}>
                        {props =>
                            <div className="switch-nob" style={{transform: `translateX(${props.x})`}}/>
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
        this.setState({value: !this.state.value});

        if (this.props.onSwitch) {
            this.props.onSwitch(!this.state.value);
        }
    }
}

export default Switch;