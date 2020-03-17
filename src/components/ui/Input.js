import React, {Component} from 'react';

import 'styles/ui/UiElements.scss';

class Input extends Component {
    render() {
        return (
            <div>
                <p className="input-title">{this.props.title}</p>
                <input className="input-input"/>
            </div>
        );
    }
}

export default













Input;