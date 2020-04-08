import React, {Component} from 'react';
import "styles/views/GameView.scss";
import AppContainer from "components/ui/AppContainer";
import franticUtils from "utils/franticUtils";
import PlayerHand from "components/ui/ingame/PlayerHand";
import DrawStack from "components/ui/ingame/DrawStack";
import DiscardPile from "components/ui/ingame/DiscardPile";
import OpponentHand from "components/ui/ingame/OpponentHand";

class GameView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerCards: [],
            availableCards: [],
            opponents: [
                {
                    username: "jan",
                    points: 12,
                    skipped: true,
                    cards: franticUtils.generateBackCards(7)
                }
            ]
        };
    }

    componentDidMount() {
        this.setState({
            playerCards: franticUtils.generateRandomCards(7, true),
            availableCards: [0, 2, 6, 4, 6, 24, 11, 16]
        });
    }

    render() {
        return (
            <AppContainer withHelp>
                <div className="game-table">
                    <div className="game-opponent-container right">
                        <OpponentHand mode='right' opponent={this.state.opponents[0]}/>
                        <OpponentHand mode='right' opponent={this.state.opponents[0]}/>
                    </div>
                    <div className="game-opponent-container top">
                        <OpponentHand mode='top' opponent={this.state.opponents[0]}/>
                        <OpponentHand mode='top' opponent={this.state.opponents[0]}/>
                        <OpponentHand mode='top' opponent={this.state.opponents[0]}/>
                    </div>
                    <div className="game-opponent-container left">
                        <OpponentHand mode='left' opponent={this.state.opponents[0]}/>
                        <OpponentHand mode='left' opponent={this.state.opponents[0]}/>
                    </div>

                    <DrawStack animated drawAmount={5}/>
                    <div className="game-stack-spacer"/>
                    <DiscardPile/>

                    <div className="game-player">
                        <PlayerHand
                            cards={this.state.playerCards}
                            available={this.state.availableCards}
                            onCardClick={i => this.handleCardClick(i)}
                        />
                    </div>
                </div>
            </AppContainer>
        );
    }

    handleCardClick(i) {
    }
}

export default GameView;