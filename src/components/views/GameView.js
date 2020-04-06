import React, {Component} from 'react';
import "styles/views/GameView.scss";
import AppContainer from "components/ui/AppContainer";
import franticUtils from "utils/franticUtils";
import PlayerHand from "components/ui/ingame/PlayerHand";
import DrawStack from "components/ui/ingame/DrawStack";
import DiscardPile from "components/ui/ingame/DiscardPile";

class GameView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerCards: [],
            availableCards: [],
            opponents: {}
        };
    }

    componentDidMount() {
        this.setState({
            playerCards: franticUtils.generateRandomCards(20, true),
            availableCards: [0, 2, 6, 4, 6, 24, 11, 16]
        });
    }

    render() {
        return (
            <AppContainer withHelp>
                <div className="game-opponent-container top">
                </div>
                <div className="game-opponent-container left">
                </div>
                <div className="game-opponent-container right">
                </div>

                <DrawStack animated drawAmount={5}/>
                <DiscardPile/>

                <div className="game-table">
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