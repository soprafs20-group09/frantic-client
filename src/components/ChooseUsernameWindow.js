import React, {Component} from 'react';
import ToolWindow from "components/ui/ToolWindow";
import Input from "components/ui/Input";
import Button from "components/ui/Button";
import 'styles/ChooseUsernameWindow.scss';

/**
 * This is a small window that asks the user to enter a username.
 * PROPS:
 * onConfirm: func(username) - a function that is called when the user has entered a valid username and clicks the confirm button.
 */
class ChooseUsernameWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ToolWindow title="Choose Username" width="420px">
                <p>please choose a username to proceed!</p>
                <Input title="username:" onChange={v => this.handleChange(v)}/>
                <div className="horizontal-buttons-container">
                    <Button
                        type="primary"
                        width="50%"
                        disabled={!this.state.username}
                        onClick={() => this.handleConfirm()}
                    >
                        Confirm
                    </Button>
                    <Button type="secondary" width="50%">Cancel</Button>
                </div>
            </ToolWindow>
        );
    }

    handleChange(value) {
        this.setState({username: value});

    }

    handleConfirm() {
        if (this.props.onConfirm) {
            this.props.onConfirm(this.state.username);
        }
    }
}

export default ChooseUsernameWindow;