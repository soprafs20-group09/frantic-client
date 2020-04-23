import React, {Component} from 'react';
import "styles/ui/cards/Card.scss";
import InlineSVG from "react-inlinesvg";
import LogoText from "assets/frantic/logo-text.svg";
import {CardMultinumberTransition} from "components/ui/Transitions";
import FranticUtils from "utils/franticUtils";

// standard playing card size:
// 62mm x 82mm

class MultiNumber extends Component {

    constructor(props) {
        super(props);
        this.state = {number: this.getNextNumber()};
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({number: this.getNextNumber()});
        }, 700);
    }

    render() {
        return (
            <CardMultinumberTransition className={this.props.className}>
                {this.state.number}
            </CardMultinumberTransition>
        );
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getNextNumber() {
        if (this.props.random) {
            let newNum = this.state.number;
            while (this.state.number === newNum) {
                newNum = this.getRandomInt(1, this.props.max || 9)
            }
            return newNum;
        } else if (!this.state) {
            return 1;
        } else {
            return this.state.number % (this.props.max || 9) + 1;
        }
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

/**
 * This component renders a single frantic playing card.
 * PROPS:
 * type: string                 - the type of playing card.
 *                                possible values: 'number', 'special', 'event'
 * value: string                - the number, special function or event the card should display.
 * color: string                - the color of the card. will be disregarded by certain cards.
 *                                possible values: 'red', 'blue', 'green', 'yellow', 'black'
 * withShadow: bool             - if true, the card will render a shadow with itself.
 * onHover: func(boolean enter) - a function that is called whenever the card is hovered,
 *                                the boolean indicates whether the mouse entered or left the card.
 * onClick: func                - the default onClick function for the topmost container.
 */
class Card extends Component {
    render() {
        let center;
        let border;
        let color = this.props.color;
        let innerColor;
        let banner;
        let secondBorder;

        if (FranticUtils.isMulticolor(this.props.value)) {
            color = 'multicolor';
        }
        if (FranticUtils.isMultinumber(this.props.value)) {
            secondBorder = '#';
        }

        switch (this.props.type) {
            case 'number':
                center = <div className="card-icon center number">{this.props.value}</div>;
                border = this.props.value;
                if (color === 'black') {
                    secondBorder =
                        <svg className="card-event-lightning" viewBox="0 0 32 32">
                            <path
                                d="M18 13 L26 2 8 13 14 19 6 30 24 19 Z"
                            />
                        </svg>;
                }
                break;

            case 'special':
                const cardFunction = require("assets/frantic/special-cards/" + this.props.value + ".svg");
                center = <InlineSVG src={cardFunction} className="card-icon center"/>;
                border = center;
                banner =
                    <div className="ribbon">
                        <span className="ribbon-inner">
                            {this.props.value.replace(/-/g, ' ')}
                        </span>
                    </div>;
                if (this.props.value === 'fuck-you') {
                    color = 'black';
                }
                break;

            case 'event':
                const event = require("assets/frantic/event-cards/" + this.props.value + ".svg");
                center = <InlineSVG src={event} className="card-icon center"/>;
                color = 'black';
                banner =
                    <div className="ribbon">
                        <span className="ribbon-inner">
                            {this.props.value.replace(/-/g, ' ')}
                        </span>
                    </div>;
                break;

            case 'back':
                center = <InlineSVG src={LogoText} className="card-logo-back"/>;
                color = 'black';
                break;

            case 'wish':
                if (this.props.color === 'none') {
                    center = <div className="card-icon center number">{this.props.value}</div>;
                    color = 'multicolor';
                    banner =
                        <div className="ribbon">
                        <span className="ribbon-inner">
                            Number Wish
                        </span>
                        </div>;
                } else {
                    center = <div className="card-icon center number">#</div>;
                    banner =
                        <div className="ribbon">
                        <span className="ribbon-inner">
                            Color Wish
                        </span>
                        </div>;
                }
                break;
        }

        if (color === 'multicolor') {
            innerColor = 'black';
        }

        return (
            <div
                className={`card-container ${color} ${this.props.withShadow ? 'card-shadow' : ''}`}
                onMouseEnter={() => this.handleHover(true)}
                onMouseLeave={() => this.handleHover(false)}
                onClick={this.props.onClick}
            >
                <div className={`card-inner ${innerColor}`}/>
                <div className="card-icon border top">{border}</div>
                {secondBorder && <div className="card-icon border multinumber top">{secondBorder}</div>}
                {center}
                {banner}
                <div className="card-icon border bottom">{border}</div>
                {secondBorder && <div className="card-icon border multinumber bottom">{secondBorder}</div>}
                <div className="card-glare"/>
            </div>
        );
    }

    handleHover(enter) {
        if (this.props.onHover) {
            this.props.onHover(enter);
        }
    }
}

export default Card;