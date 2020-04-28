import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import Icon from "components/ui/Icon";

import 'styles/ui/ToolWindow.scss';

/**
 * This component should be used for smaller popup-style windows.
 * PROPS:
 * title: string            - the window's title.
 * style: object (optional) - a custom style property to override the window style.
 * noScroll: bool           - window will hide overflow instead of scrolling
 * withClose: bool          -
 */
class ToolWindow extends Component {
    render() {
        return (
            <div className="toolwindow-container" style={this.props.style}>
                <div className="toolwindow-header">
                    <p className="toolwindow-title">{this.props.title}</p>
                    {this.props.withClose &&
                    <Icon
                        from="misc"
                        className="toolwindow-close"
                        onClick={() => this.handleClose()}
                    >cross</Icon>}
                </div>
                <div className={"toolwindow-content" + (this.props.noScroll ? " no-scroll" : "")}>
                    {this.props.children}
                </div>
            </div>
        );
    }

    handleClose() {
        if (this.props.onClose) {
            this.props.onClose();
        }
        else if (this.props.closeRoute) {
            this.props.history.push(this.props.closeRoute);
        }
    }
}

export default withRouter(ToolWindow);