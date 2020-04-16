import React, {Component} from 'react';
import "styles/ui/ingame/StacksAndPiles.scss";
import Card from "components/ui/cards/Card";

/**
 * This component displays a discard stack of cards.
 * animated: boolean - whether drawing cards should be animated.
 * drawAmount: int   - amount of cards that should be drawn in the animation.
 * drawKey: any      - a key that is compared on each update,
 *                     and animation is only done if a new key is present.
 * stackSize: int    - amount of cards in the stack. (default 5)
 * interactive: bool - will allow clicks and light up on hover if true.
 * onClick: func     - a function to be called when the DrawStack is clicked.
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
        if (this.props.drawKey !== prevProps.drawKey) {
            this.setState({cardsToDraw: this.props.drawAmount});

            setTimeout(() => {
                this.setState({cardsToDraw: 0});
            }, this.props.drawAmount * 500);
        }
    }

    render() {
        let baseStack = [];
        let animatedCards = [];

        for (let i = 0; i < this.props.stackSize; i++) {
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
            <div
                className={"draw card-stack" + (this.props.interactive ? ' active' : '')}
                onClick={() => this.handleClick()}
            >
                {baseStack}
                {animatedCards}
            </div>
        );
    }

    handleClick() {
        if (this.props.interactive && this.props.onClick) {
            this.props.onClick();
        }
        this.setState({cardsToDraw: 1});
    }
}

DrawStack.defaultProps = {
    interactive: false,
    drawAmount: 0,
    stackSize: 5
};

export default DrawStack;