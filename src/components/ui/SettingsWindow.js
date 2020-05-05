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
import ThemePicker from "components/ui/pickers/ThemePicker";
import uiUtils from "utils/uiUtils";

class SettingsWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {showMsg: false};
    }

    render() {
        const availableThemes = settingsManager.available.themes;
        const multicolorStyles = settingsManager.available.multicolorStyles;
        let currentThemeIndex = availableThemes.indexOf(
            availableThemes.find(t => t.name === settingsManager.theme.name));

        // we have to calculate height manually, because otherwise the content
        // won't scroll :(
        let height = Math.min(window.innerHeight * 0.9, uiUtils.getRem() * 49.8);

        return (
            <ToolWindow
                withClose
                onClose={this.props.onClose}
                title={<IconTitle icon="misc:gear">Settings</IconTitle>}
                style={{width: "30em", height: height}}
            >
                <Header>Theme</Header>
                <p>
                    Choose global theme that this site should use:
                </p>
                <ThemePicker
                    themes={availableThemes}
                    initialTheme={currentThemeIndex}
                    onSelectionChange={t => this.handleThemeChange(t)}
                />
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

    handleThemeChange(newTheme) {
        settingsManager.theme = newTheme;
        settingsManager.applyTheme();

        this.setState({showMsg: false});
        if (this.msgTimeout) {
            clearTimeout(this.msgTimeout);
        }
        this.msgTimeout = setTimeout(() => {
            this.msgTimeout = null;
            this.setState({showMsg: true});
        }, 1000);
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