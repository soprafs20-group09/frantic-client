import React, {Component} from 'react';
import "styles/ui/cards/Card.scss";
import InlineSVG from "react-inlinesvg";

const multicolorCards = [
    'fantastic',
    'fantastic-four',
    'equality',
    'counterattack',
    'nice-try',
    'fuck-you'
];

// standard playing card size:
// 62mm x 82mm

/**
 * This component renders a single frantic playing card.
 * PROPS:
 * type: string  - the type of playing card.
 *                 possible values: 'number', 'special', 'event'
 * value: string - the number, special function or event the card should display.
 * color: string - the color of the card. will be disregarded by certain cards.
 *                 possible values: 'red', 'blue', 'green', 'yellow', 'black'
 */
class Card extends Component {
    render() {
        let center;
        let border;
        let color = multicolorCards.indexOf(this.props.value) >= 0 ? 'multicolor' : this.props.color;
        let banner;

        switch (this.props.type) {
            case 'number':
                center = <div className="card-center number">{this.props.value}</div>;
                border = this.props.value;
                break;

            case 'special':
                const cardFunction = require("assets/frantic/special-cards/" + this.props.value + ".svg");
                center = <InlineSVG src={cardFunction} className="card-center"/>;
                border = center;
                banner =
                    <div className="ribbon">
                        <span className="ribbon-inner">
                            {this.props.value.replace('-', ' ')}
                        </span>
                    </div>;
                break;

            case 'event':
                const event = require("assets/frantic/event-cards/" + this.props.value + ".svg");
                center = <InlineSVG src={event} className="card-center"/>;
                border = center;
                color = 'black';
                banner =
                    <div className="ribbon">
                        <span className="ribbon-inner">
                            {this.props.value.replace(/-/g, ' ')}
                        </span>
                    </div>;
                break;
        }

        return (
            <div className={"card-container " + color}>
                <div className="card-glare"/>
                <div className="card-border-icon top">{border}</div>
                {banner}
                {center}
                {banner}
                <div className="card-border-icon bottom">{border}</div>
            </div>
        );
    }
}

export default Card;