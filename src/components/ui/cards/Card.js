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
 * onHover: func(boolean enter) - a function that is called whenever the card is hovered,
 *                                the boolean indicates whether the mouse entered or left the card.
 */
class Card extends Component {
    render() {
        let center;
        let border;
        let color = this.props.color;
        let innerColor;
        let banner;
        let multinumber = FranticUtils.isMultinumber(this.props.value);

        if (FranticUtils.isMulticolor(this.props.value)) {
            color = 'multicolor';
        }

        switch (this.props.type) {
            case 'number':
                center = <div className="card-icon center number">{this.props.value}</div>;
                border = this.props.value;
                break;

            case 'special':
                const cardFunction = require("assets/frantic/special-cards/" + this.props.value + ".svg");
                center = <InlineSVG src={cardFunction} className="card-icon center"/>;
                border = center;
                banner =
                    <div className="ribbon">
                        <span className="ribbon-inner">
                            {this.props.value.replace('-', ' ')}
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
        }

        if (color === 'multicolor') {
            innerColor = 'black';
        }

        return (
            <div
                className={`card-container ${color}`}
                onMouseEnter={() => this.handleHover(true)}
                onMouseLeave={() => this.handleHover(false)}
            >
                <div className={`card-inner ${innerColor}`}/>
                <div className="card-icon border top">{border}</div>
                {multinumber && <div className="card-icon border multinumber top">#</div>}
                {center}
                {banner}
                <div className="card-icon border bottom">{border}</div>
                {multinumber && <div className="card-icon border multinumber bottom">#</div>}
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