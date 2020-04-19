import React, {Component} from 'react';

import 'styles/ui/UiElements.scss';

/**
 * A simple header component.
 * PROPS:
 * width: string    - a width override.
 * size: string     - normal, small
 */
class Header extends Component {
    render() {
        return (
            <p className={"header " + this.props.size} style={{width: this.props.width}}>{this.props.children}</p>
        );
    }
}

Header.defaultProps = {
    size: 'normal'
};

export default Header;