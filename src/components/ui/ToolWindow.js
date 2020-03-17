import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import 'styles/ui/ToolWindow.scss';

/**
 * This component should be used for smaller popup-style windows.
 * PROPS:
 * title: string - the window's title.
 * width: string (optional) - a custom width property to override the window width.
 */
class ToolWindow extends Component {
    render() {
        return (
            <div className="toolwindow-container" style={{width: this.props.width}}>
                <div className="toolwindow-header">
                    <p className="toolwindow-title">{this.props.title}</p>
                </div>
                <div className="toolwindow-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default withRouter(ToolWindow);