import React, {Component} from 'react';
import "styles/ui/ingame/StacksAndPiles.scss";
import Card from "components/ui/cards/Card";

/**
 * This component displays a discard stack of cards.
 * animated: boolean - whether drawing cards should be animated.
 * drawAmount: int   - amount of cards that should be drawn in the animation.
 */
class DrawStack extends Component {

    constructor(props) {
        super(props);
        this.state = {cardsToDraw: 0};
    }

    componentDidMount() {
        if (this.props.animated && this.props.drawAmount) {
            this.setState({cardsToDraw: this.props.drawAmount});
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.drawAmount && this.props.drawAmount !== prevProps.drawAmount) {
            this.setState({cardsToDraw: this.props.drawAmount});
        }
    }

    render() {
        const stackSize = 5;

        let baseStack = [];
        let animatedCards = [];

        for (let i = 0; i < stackSize; i++) {
            baseStack.push(
                <div className="card-stack-card" key={'placeholder-' + i}>
                    <Card withShadow type="back"/>
                </div>
            );
        }
        for (let i = 0; i < this.state.cardsToDraw; i++) {
            animatedCards.push(
                <div className="draw-stack-animation" style={{animationDelay: `${i * 200}ms`}} key={Math.random()}>
                    <Card withShadow type="back"/>
                </div>
            );
        }

        return (
            <div className="card-stack" onClick={() => this.handleClick()}>
                {baseStack}
                {animatedCards}
            </div>
        );
    }

    handleClick() {
        this.setState({cardsToDraw: 1});
    }
}

DrawStack.defaultProps = {
    drawAmount: 0
};

export default DrawStack;