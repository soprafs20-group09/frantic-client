import React, {Component} from 'react';
import InlineSVG from "react-inlinesvg";
import uiUtils from "utils/uiUtils";

/**
 * Shows a message with optional icon.
 * PROPS:
 * title: string
 * children: string
 * icon: string
 */
class TextOverlay extends Component {
    render() {
        return (
            <div className={"overlay-message"}>
                <div className="overlay-title-container">
                    {this.props.icon && <InlineSVG src={uiUtils.resolveIconString(this.props.icon)} className="overlay-message-icon"/>}
                    <h1>{this.props.title}</h1>
                </div>
                <p>{this.props.children}</p>
            </div>
        );
    }
}

export default TextOverlay;