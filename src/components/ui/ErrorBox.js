import React, {Component} from 'react';
import "styles/ui/ErrorBox.scss";

/**
 * Renders a box to display errors.
 * PROPS:
 * title: string   - the title in the error box
 * maxHeight: string - sets a max height for the box, content will be scrollable if too long
 * maxWidth: string  - sets a max width for the box.
 *
 * CHILDREN:
 * anything you'd like to display inside.
 */
class ErrorBox extends Component {
    render() {
        return (
            <div className={this.props.center && "error-center"}>
            <div className="error-box" style={{maxHeight: this.props.maxHeight || '', maxWidth: this.props.maxWidth || ''}}>
                <div className="error-icon">:(</div>
                <div className="error-content-container">
                    <h2 className="error-title">{this.props.title}</h2>
                    <div className="error-content">
                        {this.props.children}
                    </div>

                </div>
            </div>
            </div>
        );
    }
}

export default ErrorBox;