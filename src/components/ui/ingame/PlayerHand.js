import React, {Component} from 'react';
import Card from "components/ui/cards/Card";
import "styles/ui/ingame/PlayerHand.scss";

/**
 * Render the current hand of the player.
 * PROPS:
 * cards: array     - array of card objects (type, value, color)
 * available: array - array of indices to be displayed as available (all others will not be clickable)
 */
class PlayerHand extends Component {
    constructor(props) {
        super(props);
        this.state = {hovering: false};
    }

    render() {
        let cards = [];

        let degChange = 10;
        const maxDegrees = 60;
        const maxWidth = 40; //in vw
        const maxIndividualWidth = '3.1em';
        const maxHeight = Math.min(this.props.cards.length / 3, 6); // in vh

        // calculate total degree change with all cards if each is degChange° tilted from the others
        let totalDegrees = degChange * this.props.cards.length;
        if (totalDegrees > maxDegrees) {
            degChange = maxDegrees / this.props.cards.length;
            totalDegrees = maxDegrees;
        }

        // get tilt of first card
        let currentDegrees = -(totalDegrees - degChange) / 2;

        // how much each card should be offset in X
        let itemWidth = maxWidth / (this.props.cards.length - 1) + 'vw';

        // how much each card should be offset in Y
        let yOffsetChange = Math.PI / (this.props.cards.length - 1);
        let currentYOffset = 0;

        for (let i = 0; i < this.props.cards.length; i++) {
            const c = this.props.cards[i];
            let available;
            let hoverFunc;

            let cardStyle = {
                width: `min(${itemWidth}, ${maxIndividualWidth})`,
                transform: `translateY(${-Math.sin(currentYOffset) * maxHeight}em) rotate(${currentDegrees}deg)`
            };

            if (this.props.available) {
                available = this.isAvailable(i) ? 'available' : 'unavailable';
            }
            if (i === this.props.cards.length - 1) {
                hoverFunc = e => this.handleHover(i, e);
            }

            cards.push(
                <div
                    key={i}
                    className={"hand-card " + available + " " + i} // this is to identify the last card in the mouseOver-event
                    style={cardStyle}>
                    <div className={"card-shadow " + available}>
                        <Card
                            type={c.type}
                            value={c.value}
                            color={c.color}
                            onHover={hoverFunc}
                        />
                    </div>
                </div>
            );

            currentDegrees += degChange;
            currentYOffset += yOffsetChange;
        }

        return (
            <div className={"hand-container" + (this.state.hovering ? "" : " transition")}
                 onMouseOver={e => this.handleMouseOver(e)}
                 onMouseLeave={e => this.handleMouseLeave(e)}
            >
                {cards}
            </div>
        );
    }

    isAvailable(index) {
        return this.props.available && this.props.available.indexOf(index) >= 0;
    }

    handleHover(index, enter) {
        if (this.state.hovering && index === this.state.hover.length - 1) {
            this.setState({hovering: false});
        }
    }

    handleAnimateTimeout() {
        this.animateTimeout = null;
        this.setState({hovering: true});
    }

    handleMouseOver(e) {
        if (!this.state.hovering && !this.animateTimeout && !this.isLastCard(e)) {
            this.animateTimeout = setTimeout(() => this.handleAnimateTimeout(), 300);
        }
    }

    handleMouseLeave(e) {
        if (this.state.hovering) {
            this.setState({hovering: false});
        }
    }

    isLastCard(e) {
        // this checks if we are hovering over the last card
        try {
            return (parseInt(e.target.parentNode.parentNode.parentNode.classList[1]) === this.state.hover.length - 1);
        } catch {
        }

        return false;
    }

    getFormattedSmallerValueW(vw, em) {
        vw = parseFloat(vw.replace('vw', ''));
        em = parseFloat(em.replace('em', ''));
        let vwPx = (document.documentElement.clientWidth / 100) * vw;
        let emPx = parseFloat(getComputedStyle(document.getElementsByTagName('html')[0]).fontSize) * em;

        return (vwPx < emPx) ? vw + 'vw' : em + 'em';
    }
}

export default PlayerHand;