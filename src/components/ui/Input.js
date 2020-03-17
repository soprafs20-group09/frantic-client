import React, {Component} from 'react';
import {withRouter} from "react-router-dom";

import 'styles/ui/UiElements.scss';

/**
 * A themed input component with integrated title.
 * PROPS:
 * title: string         - a title to be displayed above the input.
 * value: string         - an initial value to be set for the input.
 * readOnly: bool        - whether the input should be readonly
 * type: string          - the type of the input, see html docs (e.g. password)
 * onChange: func(value) - a function to be called every time the input value changes.
 * style: object         - this allows you to add style overrides in react-manner.
 *
 * OPTIONAL:
 * action: string        - if set, a button is added with the given text.
 * onActionClick: func   - a function to be called when the action button has been clicked.
 * disableAction: boolean- if set, the action of this input will be disabled.
 */
class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.value};
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({value: nextProps.value});
    }

    render() {
        let action;
        if (this.props.action) {
            action =
                <button
                    className={`input-action ${this.props.disableAction && 'disabled'}`}
                    onClick={() => this.handleActionClick()}>
                    {this.props.action}
                </button>;
        }

        return (
            <div>
                <p className="input-title">{this.props.title}</p>
                <div className="input-container" style={this.props.style}>
                    <input
                        className={`input-input  ${action && 'action'}`}
                        type={this.props.type}
                        value={this.state.value}
                        readOnly={this.props.readOnly}
                        onChange={(e) => this.handleInputChange(e)}
                    />
                    {action}
                </div>
            </div>
        );
    }

    handleInputChange(e) {
        this.setState({value: e.target.value});
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }

    handleActionClick() {
        if (this.props.onActionClick && !this.props.disableAction) {
            this.props.onActionClick();
        }
    }
}

export default withRouter(Input);