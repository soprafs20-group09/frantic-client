import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import 'styles/ui/Window.scss';

/**
 * This component serves as a base-container for larger windows.
 * PROPS:
 * title: string               - the window's title.
 * width: string (optional)    - a custom width property to override the window width.
 * height: string (optional)   - a custom height property to override the window height.
 * maxHeight: string(optional) - a custom height property to override the max window height.
 */
class Window extends Component {
    render() {
        return (
            <div className="window-container"
                 style={{
                     width: this.props.width,
                     height: this.props.height,
                     maxHeight: this.props.maxHeight
                 }}>
                <div className="window-header">
                    <p className="window-title">{this.props.title}</p>
                </div>
                <div className="window-body">
                    <div className="window-content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Window);