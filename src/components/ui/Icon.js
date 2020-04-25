import React, {Component} from 'react';
import InlineSVG from "react-inlinesvg";
import uiUtils from "utils/uiUtils";

/**
 * This renders an icon from a selected source in SVG form.
 * PROPS:
 * from: string      - either 'special' or 'event'.
 * className: string - className for the SVG
 * style: object     - put inline CSS styling here.
 * children: string  - what icon to load.
 */
class Icon extends Component {
    render() {
        return (
            <InlineSVG
                src={uiUtils.resolveIconString(this.props.from + ':' + this.props.children)}
                style={this.props.style}
                className={this.props.className}
            />
        );
    }
}

export default Icon;