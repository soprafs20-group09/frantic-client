import React, {Component} from 'react';
import "styles/ui/TabSwitcher.scss";
import {TabSwitcherTransition} from "components/ui/Transitions";

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
            <div className="tab-container">
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