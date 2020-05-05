import React, {Component} from 'react';
import "styles/ui/pickers/BasicPickers.scss";
import "styles/ui/pickers/ThemePicker.scss";

/**
 * This component allows the user to pick one of several predefined themes.
 * PROPS:
 * themes: array of objects     - the available themes to pick from.
 *  - name: string              - the theme name
 *  - colors: object            - a theme colors object:
 *      -accent: string
 *      -bgDark: string
 *      -bgMedium: string
 *      -bgLight: string
 *      -bgLighter: string
 */
class ThemePicker extends Component {
    render() {
        let themes = [];
        for (let theme of this.props.themes) {
            themes.push(
                <ThemeItem theme={theme} key={theme.name}/>
            );
        }

        return (
            <div className="themepicker-container">
                {themes}
            </div>
        );
    }
}

class ThemeItem extends Component {
    render() {
        const {theme} = this.props;
        return (
            <div className="picker-item">
                <div className="themepicker-theme">
                    <div className="themepicker-color" style={{backgroundColor: theme.colors.accent}}/>
                    <div className="themepicker-color" style={{backgroundColor: theme.colors.bgDark}}/>
                    <div className="themepicker-color" style={{backgroundColor: theme.colors.bgMedium}}/>
                    <div className="themepicker-color" style={{backgroundColor: theme.colors.bgLight}}/>
                    <div className="themepicker-color" style={{backgroundColor: theme.colors.bgLighter}}/>
                </div>
                <p className="themepicker-name">{theme.name}</p>
            </div>
        );
    }
}

export default ThemePicker;