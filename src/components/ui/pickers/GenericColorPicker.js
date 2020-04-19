import React, {Component} from 'react';
import "styles/ui/pickers/ConcretePickers.scss";
import ToolWindow from "components/ui/ToolWindow";
import Separator from "components/ui/Separator";
import ColorNumberPicker from "components/ui/pickers/parts/ColorNumberPicker";
import Button from "components/ui/Button";

/**
 * A color picker with custom title.
 * PROPS:
 * title: string (or IconTitle)
 * onFinish: func   - called when user is done.
 *                    parameter:
 *                    {
 *                        color: string
 *                    }
 */
class GenericColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {color: null};
    }

    render() {
        return (
            <ToolWindow
                noScroll
                title={this.props.title}
            >
                <div className="concrete-picker-container">
                    <Separator>
                        Make your wish
                    </Separator>
                    <ColorNumberPicker
                        onSelectionChange={c => this.handleColorChange(c)}
                    />
                    <div className="concrete-picker-spacer"/>
                    <Button
                        width="10em"
                        disabled={this.state.color === null}
                        onClick={() => this.handleFinish()}
                    >
                        Done
                    </Button>
                </div>
            </ToolWindow>
        );
    }

    handleFinish() {
        if (this.props.onFinish) {
            this.props.onFinish({color: this.state.color});
        }
    }

    handleColorChange(color) {
        this.setState({color: color});
    }
}

export default GenericColorPicker;