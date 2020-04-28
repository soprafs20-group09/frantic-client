import React, {Component} from 'react';
import "styles/ui/SettingsWindow.scss";
import ToolWindow from "components/ui/ToolWindow";
import IconTitle from "components/ui/IconTitle";
import Header from "components/ui/Header";
import SingleSelect from "components/ui/SingleSelect";
import Separator from "components/ui/Separator";
import Card from "components/ui/cards/Card";
import settingsManager from "utils/settingsManager";

class SettingsWindow extends Component {
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
            </ToolWindow>
        );
    }

    handleMulticolorChange(newVal) {
        settingsManager.multicolorStyle = newVal;
        this.forceUpdate();
    }
}

export default SettingsWindow;