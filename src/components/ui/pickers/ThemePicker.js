import React, {Component} from 'react';
import "styles/ui/pickers/ThemePicker.scss";

/**
 * This component allows the user to pick one of several predefined themes.
 * PROPS:
 * themes: array of objects       - the available themes to pick from.
 *  - name: string                - the theme name
 *  - colors: object              - a theme colors object:
 *      -accent: string
 *      -bgDark: string
 *      -bgMedium: string
 *      -bgLight: string
 *      -bgLighter: string
 * initialTheme: number           - the initial theme to be selected
 * onSelectionChange: func(theme) -
 */
class ThemePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {theme: this.props.themes[this.props.initialTheme]};
    }

    render() {
        let themes = [];
        for (let theme of this.props.themes) {
            let active = (this.state.theme && this.state.theme.name === theme.name);

            themes.push(
                <ThemeItem
                    theme={theme}
                    active={active}
                    onClick={() => this.handleThemeClick(theme)}
                    key={theme.name}
                />
            );
        }

        return (
            <div className="themepicker-container" style={this.props.style}>
                {themes}
            </div>
        );
    }

    handleThemeClick(theme) {
        this.setState({theme: theme});

        if (this.props.onSelectionChange) {
            this.props.onSelectionChange(theme);
        }
    }
}

ThemePicker.defaultProps = {
    initialTheme: 0
};


/**
 * PROPS:
 * theme: object
 * active: bool
 * onClick: func()
 */
class ThemeItem extends Component {
    render() {
        const {theme} = this.props;

        return (
            <div
                className={"themepicker-item" + (this.props.active ? " active" : "")}
                onClick={this.props.onClick}
            >
                <div className="themepicker-theme">
                    <div className="themepicker-color" style={{backgroundColor: theme.colors.accent}}/>
                    <div className="themepicker-color" style={{backgroundColor: theme.colors.bgDark}}/>
                    <div className="themepicker-color" style={{
                        backgroundColor: theme.colors.bgMedium,
                        color: theme.colors.text
                    }}>
                        abc
                    </div>
                    <div className="themepicker-color" style={{backgroundColor: theme.colors.bgLight}}/>
                    <div className="themepicker-color" style={{backgroundColor: theme.colors.bgLighter}}/>
                </div>
                <p className="themepicker-name">{theme.name}</p>
            </div>
        );
    }
}

ThemeItem.defaultProps = {
    active: false
};

export default ThemePicker;