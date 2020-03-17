import React, {Component} from 'react';

import 'styles/ui/UiElements.scss';

/**
 * A simple header component.
 * PROPS:
 * width: string    - a width override.
 */
class Header extends Component {
    render() {
        return (
            <p className="header" style={{width: this.props.width}}>{this.props.children}</p>
        );
    }
}

export default Header;