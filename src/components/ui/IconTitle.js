import React, {Component} from 'react';
import "styles/ui/UiElements.scss";
import InlineSVG from "react-inlinesvg";
import uiUtils from "utils/uiUtils";

/**
 * Renders a text with an prepended icon.
 * PROPS:
 * icon: string     - an icon in the form "special:<card>", "player:<name>" or "event:<name>"
 * children: string - what should be rendered after the icon
 */
class IconTitle extends Component {
    render() {
        return (
            <span className=".icon-title">
                <InlineSVG src={uiUtils.resolveIconString(this.props.icon)} className="icon-title-icon"/>
                {this.props.children}
            </span>
        );
    }
}

export default IconTitle;