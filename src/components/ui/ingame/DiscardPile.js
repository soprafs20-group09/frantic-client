import React, {Component} from 'react';
import "styles/ui/ingame/StacksAndPiles.scss";
import franticUtils from "utils/franticUtils";
import Card from "components/ui/cards/Card";
import {BaseStackTransition, DiscardPileTransition} from "components/ui/Transitions";

/**
 * This component renders a discard pile with the last played card on top.
 * PROPS:
 * stackSize: amount of cards in the stack below the top card. (default 5)
 * topCard: object - a card object that should be displayed on top. All changes will be animated.
 */
class DiscardPile extends Component {

    constructor(props) {
        super(props);
        this.state = {baseCards: [], topCard: {key: 'a'}};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.topCard && this.props.topCard.key !== this.state.topCard.key) {
            this.addNewCard(this.props.topCard);
        }
    }

    render() {
        let topCardObj = this.state.topCard;

        let baseStack = [];
        for (let c of this.state.baseCards) {
            baseStack.push(
                <Card
                    withShadow
                    type={c.type}
                    value={c.value}
                    color={c.color}
                    key={c.key}
                />
            );
        }
        baseStack.reverse();

        let topCard =
            <Card
                withShadow
                type={topCardObj.type}
                value={topCardObj.value}
                color={topCardObj.color}
                key={topCardObj.key}
            />;

        return (
            <div className="card-stack" onClick={() => this.addNewCard(franticUtils.generateRandomCards()[0])}>
                <div className="card-stack-dummy" key="dummy"/>
                <BaseStackTransition containerClass="card-stack-card">
                    {baseStack}
                </BaseStackTransition>
                <DiscardPileTransition containerClass="discard-pile-top-card">
                    {topCard}
                </DiscardPileTransition>
            </div>
        );
    }

    addNewCard(card) {
        let cards = this.state.baseCards.slice(0, this.props.stackSize - 1);
        cards.splice(0, 0, this.state.topCard);
        this.setState({baseCards: cards, topCard: card});
    }
}

DiscardPile.defaultProps = {
    stackSize: 5
};

export default DiscardPile;