import React, {Component} from 'react';
import "styles/ui/TabSwitcher.scss";
import {TabSwitcherTransition} from "components/ui/Transitions";

/**
 * PROPS:
 * selected: bool
 * icon: JSX
 * title: string
 * onClick: func
 * onHover: func
 */
class TabHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {test: false};
    }

    render() {
        return (
            <div
                className={"tab-header " + (this.props.selected ? "selected" : "")}
                onClick={this.props.onClick}
                onMouseEnter={this.props.onHover}
            >
                {this.props.icon}
                {this.props.title}
            </div>
        );
    }
}

/**
 * This component renders multiple clickable tabs with customizable content in each one of them.
 *
 * PROPS:
 * height: string (optional) - a maxHeight override for the whole component.
 * selected: int (optional)  - which tab should be selected by default.
 *
 * CHILREN:
 * array of objects
 * object structure:
 * icon: JSX (optional)         - an icon to be displayed in front of the title.
 * title: string                - the tab's title
 * content: JSX                 - the content that should be displayed when this tab is active
 * onHover: func (optional)     - a function to be called on MouseEnter of the tab header.
 */
class TabSwitcher extends Component {
    constructor(props) {
        super(props);
        this.state = {selected: this.props.selected || 0};
    }

    render() {
        let content;
        if (this.props.children[this.state.selected] &&
            this.props.children[this.state.selected].content) {
            content = this.props.children[this.state.selected].content;
        }

        return (
            <div className="tab-container" style={{height: this.props.height}}>
                <div className="tab-header-container">
                    {this.generateHeaders()}
                </div>
                <div className="tab-content">
                    <TabSwitcherTransition key={this.state.selected} direction={this.state.direction}>
                        {content}
                    </TabSwitcherTransition>
                </div>
            </div>
        );
    }

    generateHeaders() {
        let headers = [];
        for (let i in this.props.children) {
            i = parseInt(i);
            headers.push(
                <TabHeader
                    key={i}
                    icon={this.props.children[i].icon}
                    title={this.props.children[i].title}
                    selected={this.state.selected === i}
                    onClick={() => this.onSwitch(i)}
                    onHover={this.props.children[i].onHover}
                />
            );
        }
        return headers;
    }

    onSwitch(i) {
        this.setState({
            selected: i,
            direction: i >= this.state.selected ? 'right' : 'left'
        });
    }
}

export default TabSwitcher;