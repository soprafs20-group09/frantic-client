import React, {Component} from 'react';
import Card from "components/ui/cards/Card";
import "styles/ui/ingame/PlayerHand.scss";


class PlayerHand extends Component {
    render() {
        let cards = [];

        let degChange = 10;
        const maxDegrees = 60;
        const maxWidth = 50; //in vw
        const maxIndividualWidth = 3; //in em
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

            const cardStyle = {
                width: `min(${itemWidth}, 3.1em)`,
                transform: `translateY(${-Math.sin(currentYOffset) * maxHeight}vh) rotate(${currentDegrees}deg)`
            };

            cards.push(
              <div className="hand-card" style={cardStyle}>
                  <Card
                      type={c.type}
                      value={c.value}
                      color={c.color}
                  />
              </div>
            );

            currentDegrees += degChange;
            currentYOffset += yOffsetChange;
        }

        return (
            <div className="hand-container">
                {cards}
            </div>
        );
    }
}

export default PlayerHand;