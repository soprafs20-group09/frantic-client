import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import 'styles/ui/Window.scss';

/**
 * This component serves as a base-container for larger windows.
 * PROPS:
 * title: string - the window's title.
 * width: string (optional) - a custom width property to override the window width.
 */
class Window extends Component {
    render() {
        return (
            <div className="window-container" style={{width: this.props.width}}>
                <div className="window-header">
                    <p className="window-title">{this.props.title}</p>
                </div>
                <div className="window-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default withRouter(Window);