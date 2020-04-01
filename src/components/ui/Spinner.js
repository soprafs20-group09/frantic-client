import React, {Component} from 'react';
import InlineSVG from "react-inlinesvg";
import Logo from "assets/frantic/logo-hollow.svg";
import {Spring} from "react-spring/renderprops";

class Spinner extends Component {
    render() {
        const fromStyle = {
            transform: 'rotate(0deg)'
        };
        const toStyle = {
            transform: 'rotate(360deg)'
        };

        return (
            <Spring
                reset
                from={fromStyle}
                to={toStyle}
                onRest={() => this.forceUpdate()}
            >
                {style => <InlineSVG src={Logo} style={style} className="spinner"/>}
            </Spring>
        );
    }
}

export default Spinner;