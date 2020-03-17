import React, {Component} from 'react';
import ToolWindow from "components/ui/ToolWindow";
import Input from "components/ui/Input";
import Button from "components/ui/Button";
import 'styles/ChooseUsernameWindow.scss';

class ChooseUsernameWindow extends Component {
    render() {
        return (
            <ToolWindow title="Choose Username" width="420px">
                <p>please choose a username to proceed!</p>
                <Input title="username:"/>
                <div className="horizontal-buttons-container">
                    <Button type="primary" width="50%">Confirm</Button>
                    <Button type="secondary" width="50%">Cancel</Button>
                </div>
            </ToolWindow>
        );
    }
}

export default ChooseUsernameWindow;