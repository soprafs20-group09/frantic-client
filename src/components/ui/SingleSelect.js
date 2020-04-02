import React, {Component} from 'react';

/**
 * This renders a horizontal component with a number of items,
 * only one of which can be selected at a time.
 *
 * PROPS:
 * items: array                - array of objects of the following form:
 * -name: string               - the name to be displayed
 * -value: string              - the value of the item that is returned on change.
 * initialValue: string        - value of the item that is to be selected first.
 * readOnly: boolean           - makes this component read only.
 * onValueChanged: func(value) - function to be called when a new value has been set.
 * style: object               - allows you to override the container styling.
 */
class SingleSelect extends Component {

    constructor(props) {
        super(props);

        this.state = {value: this.props.initialValue};
    }

    render() {
        let items = [];

        for (let i in this.props.items) {
            const item = this.props.items[i];
            const active = this.state.value === item.value;
            items.push(
                <button
                    className={`singleselect-item ${active && 'active'}`}
                    key={i + item.name}
                    onClick={() => this.itemClicked(i)}>
                    {item.name}
                </button>
            );
        }

        return (
            <div style={this.props.style}>
                <p className="input-title">{this.props.title}</p>
                <div className="singleselect-container">
                    {items}
                </div>
            </div>
        );
    }

    itemClicked(index) {
        if (this.props.readOnly) {
            return;
        }

        const newValue = this.props.items[index].value;
        this.setState({value: newValue});

        if (this.props.onValueChanged) {
            this.props.onValueChanged(newValue);
        }
    }
}

export default SingleSelect;