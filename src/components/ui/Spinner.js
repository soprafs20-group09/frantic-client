import React, {Component} from 'react';
import InlineSVG from "react-inlinesvg";
import Logo from "assets/frantic/logo-hollow.svg";
import {Spring} from "react-spring/renderprops";

/**
 * Renders an animated loading spinner.
 * PROPS:
 * center: bool - if true, this will render a container div that will try to center the spinner
 *                in whatever container it is placed in.
 */
class Spinner extends Component {
    render() {
        const fromStyle = {
            transform: 'rotate(0deg)'
        };
        const toStyle = {
            transform: 'rotate(360deg)'
        };

        return (
            <div className={this.props.center && "spinner center"}>
                <Spring
                    reset
                    from={fromStyle}
                    to={toStyle}
                    onRest={() => this.forceUpdate()}
                >
                    {style => <InlineSVG src={Logo} style={style} className="spinner"/>}
                </Spring>
            </div>
        );
    }
}

export default Spinner;