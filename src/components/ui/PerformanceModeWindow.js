import React, {Component} from 'react';
import ToolWindow from "components/ui/ToolWindow";
import Button from "components/ui/Button";
import 'styles/ChooseUsernameWindow.scss';
import settingsManager from "../../utils/settingsManager";

/**
 * This a popup for mobile players that informs them about the activated performance mode.
  */
class PerformanceModeWindow extends Component {

    componentDidMount() {
        settingsManager.performance = true;
    }

    render() {
        return (
            <ToolWindow
                withClose
                onClose={this.props.onClose}
                title="Performance Mode"
                style={{width: "23em"}}
            >
                <p style={{marginTop: '0'}}>You seem to be playing on a mobile device!
                    We have turned off your animations to increase performance.
                </p>
                <div className="horizontal-buttons-container">
                    <Button
                        type="primary"
                        width="50%"
                        onClick={this.props.onClose}
                    >
                        Okay
                    </Button>
                    <Button
                        type="secondary"
                        width="50%"
                        onClick={this.props.openSettings}
                    >
                        Open settings
                    </Button>
                </div>
            </ToolWindow>
        );
    }
}

export default PerformanceModeWindow;