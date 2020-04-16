import React, {Component} from 'react';
import ToolWindow from "components/ui/ToolWindow";
import Input from "components/ui/Input";
import Button from "components/ui/Button";
import {withRouter} from "react-router-dom";
import 'styles/ChooseUsernameWindow.scss';

/**
 * This is a small window that asks the user to enter a username.
 * PROPS:
 * onConfirm: func(username) - a function that is called when the user has entered a valid username and clicks the confirm button.
 * closeRoute: string        - where the user should be navigated to, if they decide to click 'cancel'. default: '..'
 */
class ChooseUsernameWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ToolWindow title="Choose Username" style={{width: "23em"}}>
                <p style={{marginTop: '0'}}>please choose a username to proceed!</p>
                <Input
                    title="username:"
                    onChange={v => this.handleChange(v)}
                    onEnter={() => this.handleConfirm()}
                    initialFocus={true}
                />
                <div className="horizontal-buttons-container">
                    <Button
                        type="primary"
                        width="50%"
                        disabled={!this.isCurrentValid()}
                        onClick={() => this.handleConfirm()}
                    >
                        Confirm
                    </Button>
                    <Button
                        type="secondary"
                        width="50%"
                        onClick={() => this.handleCancel()}
                    >
                        Cancel
                    </Button>
                </div>
            </ToolWindow>
        );
    }

    handleChange(value) {
        this.setState({username: value});

    }

    handleConfirm() {
        if (this.isCurrentValid() && this.props.onConfirm) {
            this.props.onConfirm(this.state.username);
        }
    }

    handleCancel() {
        this.props.history.push(this.props.closeRoute || '..');
    }

    isCurrentValid() {
        return this.state.username && /^\S{2,20}$/i.test(this.state.username);
    }
}

export default withRouter(ChooseUsernameWindow);