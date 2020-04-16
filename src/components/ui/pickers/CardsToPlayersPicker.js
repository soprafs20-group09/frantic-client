import React, {Component} from 'react';
import Draggable from 'react-draggable';
import "styles/ui/pickers/BasicPickers.scss";
import "styles/ui/pickers/CardsToPlayersPicker.scss";
import Card from "components/ui/cards/Card";
import {Spring} from "react-spring/renderprops";

class CardsToPlayersPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let cardItems = [];

        for (let c of this.props.cards) {
            let i = this.props.cards.indexOf(c);
            cardItems.push(
                <DraggableCard
                    type={c.type}
                    value={c.value}
                    color={c.color}
                />
            );
        }


        return (
            <div className="ctp-container">
                <div className="ctp-cards">
                    {cardItems}
                </div>
            </div>
        );
    }
}

class DraggableCard extends Component {
    constructor(props) {
        super(props);
        this.state = {from: {x: 0, y: 0}};
    }

    render() {
        const springConfig = {
            tension: 180,
            friction: 15
        };

        return (
            <Spring
                from={this.state.from}
                to={{x: 0, y: 0}}
                onRest={() => this.handleSpringRest()}
                reset={true}
                // config={springConfig}
            >
                {style =>
                    <Draggable
                        onStop={(e, p) => this.handleDragStop(e, p)}
                        position={style}
                    >
                        <div className="ctp-card-item">
                            <Card
                                withShadow
                                type={this.props.type}
                                value={this.props.value}
                                color={this.props.color}
                            />
                        </div>
                    </Draggable>
                }
            </Spring>
        );
    }

    handleSpringRest() {
        if (this.state.from.x || this.state.from.y) {
            this.setState({from: {x: 0, y: 0}});
        }
    }

    handleDragStop(e, pos) {
        this.setState({from: {x: pos.x, y: pos.y}});
    }
}


export default CardsToPlayersPicker;