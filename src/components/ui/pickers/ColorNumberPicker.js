import React, {Component} from 'react';
import "styles/ui/pickers/BasicPickers.scss";
import franticUtils from "utils/franticUtils";

/**
 * This component allows the player to pick a color or a number.
 * PROPS:
 * withNumbers: bool               - whether to allow the player to pick numbers.
 * onSelectionChange: func(string) - a function that is called every time the selection changes.
 *                                   parameter is the color name or number currently selected.
 */
class ColorNumberPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {selected: null};
    }


    render() {
        let colorItems = [];
        let numberItems = [];

        for (let color of franticUtils.constants.colors) {
            colorItems.push(
                <PickerItem
                    color={color}
                    active={this.state.selected === color}
                    key={color}
                    onClick={() => this.handleItemClick(color)}
                />
            );
        }

        if (this.props.withNumbers) {
            for (let i = 1; i <= 9; i++) {
                numberItems.push(
                    <PickerItem
                        number={i}
                        active={this.state.selected === i.toString()}
                        key={i}
                        onClick={() => this.handleItemClick(i.toString())}
                    />
                );
            }
        }

        let numberContent;
        if (numberItems) {
            numberContent = [
                <div className="picker-separator-container" key="picker-separator">
                    <div className="picker-separator line"/>
                    <div className="picker-separator">
                        OR
                    </div>
                    <div className="picker-separator line"/>
                </div>,
                <div className="picker-container" key="number-container">
                    {numberItems}
                </div>
            ]
        }

        return (
            <div>
                <div className="picker-container">
                    {colorItems}
                </div>
                {numberContent}
            </div>
        );
    }

    handleItemClick(item) {
        this.setState({selected: item});
        if (this.props.onSelectionChange) {
            this.props.onSelectionChange(item);
        }
    }
}

/**
 * PROPS:
 * color: string
 * number: string
 * active: bool
 * onClick: func
 */
class PickerItem extends Component {
    render() {
        return (
            <div className="picker-item" onClick={this.props.onClick}>
                <div className={
                    "picker-cn-item "
                    + (this.props.color ? this.props.color : "number")
                    + (this.props.active ? " active" : "")
                }>
                    <div className="picker-cn-number">
                        {this.props.number}
                    </div>
                </div>
            </div>
        );
    }
}

export default ColorNumberPicker;