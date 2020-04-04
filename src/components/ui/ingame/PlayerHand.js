import React, {Component} from 'react';
import Card from "components/ui/cards/Card";
import "styles/ui/ingame/PlayerHand.scss";

class PlayerHand extends Component {
    constructor(props) {
        super(props);

        let hover = [];
        for (let i = 0; i < this.props.cards.length; i++) {
            hover.push(false);
        }

        this.state = {hover: hover, animate: true, hovering: false};
    }

    render() {
        let cards = [];

        let degChange = 10;
        const maxDegrees = 100;
        const maxWidth = 50; //in vw
        const maxIndividualWidth = '3.1em';
        const maxHeight = Math.min(this.props.cards.length / 2, 10); // in vh

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

            let cardStyle = {
                width: `min(${itemWidth}, ${maxIndividualWidth})`,
                transform: `translateY(${-Math.sin(currentYOffset) * maxHeight}vh) rotate(${currentDegrees}deg)`,
                marginRight: '0em'
            };
            if (!this.state.hovering) {
                cardStyle.transition = '0.3s';
            }
            const hoverStyle = Object.assign({}, cardStyle);
            hoverStyle.transform = `translateY(${-Math.sin(currentYOffset) * maxHeight}vh) rotate(${currentDegrees}deg)`;
            hoverStyle.marginRight = '5em';

            cards.push(
                <div
                    key={i}

                    className={"hand-card " + i} // this is to identify the last card in the mouseOver-event
                    style={this.state.hover[i] ? hoverStyle : cardStyle}>
                    <div className="card-shadow">
                        <Card
                            type={c.type}
                            value={c.value}
                            color={c.color}
                            onHover={e => this.handleHover(i, e)}
                        />
                    </div>
                </div>
            );

            currentDegrees += degChange;
            currentYOffset += yOffsetChange;
        }

        return (
            <div className="hand-container"
                 onMouseOver={e => this.handleMouseOver(e)}
                 onMouseLeave={e => this.handleMouseLeave(e)}
            >
                {cards}
            </div>
        );
    }

    handleHover(index, enter) {
        if (index === this.state.hover.length - 1) {
            this.setState({hovering: false});
            return;
        }

        let hover = [];
        for (let i = 0; i < this.props.cards.length; i++) {
            hover.push(false);
        }
        hover[index] = enter;

        this.setState({hover: hover});
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