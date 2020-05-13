import React, {Component} from 'react';
import Card from 'components/ui/cards/Card.js';
import Logo from "assets/frantic/logo-text.svg";
import InlineSVG from "react-inlinesvg";
import "styles/ui/events/MarketAnimation.scss";
import franticUtils from "utils/franticUtils";
import Icon from "components/ui/Icon";

class MarketAnimation extends Component {
    constructor(props) {
        super(props);
        this.state = {cards: franticUtils.generateBackCards(4)}
    }

    render() {
        let cards = [];

        for (let c of this.state.cards) {
            if (c.key !== 1) {
                cards.push(
                    <div className="market-card" >
                        <Card
                            type={c.type}
                            value={c.value}
                            color="accent"
                            key={c.key}
                        />
                    </div>
                );
            } else {
                cards.push(
                    <div className="market-card-taken" >
                        <Card
                            type={c.type}
                            value={c.value}
                            color="accent"
                            key={c.key}
                        />
                    </div>
                );
            }
        }

        return (
            <div className="market-container">
                <div className="shopping-cart">
                    <div className="handle"/>
                    <div className="basket-left"/>
                    <div className="basket-bottom"/>
                    <div className="basket-right"/>
                    <div className="basket-top"/>
                    <div className="wheel-base">
                        <div className="landing-gear1"/>
                        <div className="landing-gear2"/>
                        <div className="wheel-outer1"/>
                        <div className="wheel-inner1"/>
                        <div className="wheel-outer2"/>
                        <div className="wheel-inner2"/>
                    </div>
                </div>
                <div className="market-card-container">
                    {cards}
                </div>
            </div>
        );
    }
}

export default MarketAnimation;