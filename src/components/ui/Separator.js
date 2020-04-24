import React, {Component} from 'react';
import "styles/ui/UiElements.scss";

/**
 * Shows a horizontal numerated separator.
 * PROPS:
 * step: number (optional) - displays a step nr. if given
 * children: string        - the step title.
 */
class Separator extends Component {
    render() {
        return (
            <div className="step-container">
                {(this.props.step !== null) && <div className="step-number">{this.props.step}</div>}
                <span className="step-separator"/>
                {this.props.children && <h3 className="step-title">{this.props.children}</h3>}
                <span className="step-separator"/>
            </div>
        );
    }
}

Separator.defaultProps = {
  step: null
};

export default Separator;