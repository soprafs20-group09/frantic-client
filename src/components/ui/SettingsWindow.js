import React, {Component} from 'react';
import "styles/ui/SettingsWindow.scss";
import ToolWindow from "components/ui/ToolWindow";
import IconTitle from "components/ui/IconTitle";
import Header from "components/ui/Header";
import SingleSelect from "components/ui/SingleSelect";
import Separator from "components/ui/Separator";
import Card from "components/ui/cards/Card";
import settingsManager from "utils/settingsManager";
import ToastMessage from "components/ui/ToastMessage";

class SettingsWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {showMsg: false};
    }

    render() {
        const multicolorStyles = [
            {name: "Matte", value: 'matte'},
            {name: "Opaque", value: 'opaque'},
            {name: "Colorful", value: 'colorful'}
        ];

        return (
            <ToolWindow
                withClose
                onClose={this.props.onClose}
                title={<IconTitle icon="misc:gear">Settings</IconTitle>}
                style={{width: "30em", maxHeight: "40em"}}
            >
                <Header>Multicolor Card Style</Header>
                <p>
                    Choose the style for multicolor cards
                    ('Fantastic Four', 'Counterattack', ...)
                    that you like the best:
                </p>
                <SingleSelect
                    items={multicolorStyles}
                    style={{marginBottom: '1.5em'}}
                    onValueChanged={v => this.handleMulticolorChange(v)}
                    initialValue={settingsManager.multicolorStyle}
                />
                <Separator>Preview</Separator>
                <div className="settings-card-display">
                    <Card
                        withShadow
                        type="number"
                        value={8}
                        color="black"
                    />
                    <Card
                        withShadow
                        type="special"
                        value="fantastic-four"
                    />
                    <Card
                        withShadow
                        type="number"
                        value={3}
                        color="green"
                    />
                </div>
                {this.state.showMsg &&
                <ToastMessage icon="misc:tick" duration={2}>
                    applied!
                </ToastMessage>}
            </ToolWindow>
        );
    }

    handleMulticolorChange(newVal) {
        settingsManager.multicolorStyle = newVal;
        this.setState({showMsg: false});
        if (this.msgTimeout) {
            clearTimeout(this.msgTimeout);
        }
        this.msgTimeout = setTimeout(() => {
            this.msgTimeout = null;
            this.setState({showMsg: true});
        }, 1000);
    }
}

export default SettingsWindow;