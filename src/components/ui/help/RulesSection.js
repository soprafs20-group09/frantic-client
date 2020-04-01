import React, {Component} from 'react';
import Header from "components/ui/Header";

class RulesSection extends Component {
    render() {
        return (
            <div className="help-section rules">
                <Header>Object of the game</Header>
                <p>
                    The object of the game is to get rid of your cards as fast
                    as possible. If a player has discarded all his cards, the
                    remaining players count the points in their hand. When a
                    player reaches the agreed maximum score, the player with
                    the lowest score wins.
                </p>

                <Header>Setup & Process</Header>
                <p>
                    In the middle of your screen you find the deck (all unused, remaining cards)
                    and the discard pile right next to it.
                    <br/>
                    The card on top of the deck gets flipped over and laid beside
                    the deck, forming the discard pile. This card starts the game,
                    and is looked at as if it was played by the dealer of the cards.
                    The direction of the game is counter-clockwise.
                    <br/>
                    However, the players have the opportunity to not play a valid
                    card, but in return draw one from the deck instead (by clicking the deck).
                    It is possible to then play the drawn card – or any other valid card
                    from the player's hand.
                </p>

                <Header>End of the Round</Header>
                <p style={{marginBottom: 0}}>
                    The game round is over as soon as

                </p>
                <ul>
                    <li>a player gets rid of all his hand cards</li>
                    <li>the card deck is used up and a player would have to draw
                        one or more cards
                    </li>
                </ul>
                <p style={{marginTop: 0}}>
                    If this situation takes place during the execution of an Event,
                    it will be played out as well as possible before ending the
                    round.
                    It is possible for multiple players to end the round simultaneously due to an Event Card.
                </p>
                <p>
                    If the round is over, the fellow players have to count their
                    cards and add them to their existing score. (See Scoring)
                </p>

                <Header>End of the Game</Header>
                <p style={{marginBottom: 0}}>
                    There are going to be as many rounds, until a player reaches
                    the maximum score:
                </p>
                <table style={{marginTop: "1em"}}>
                    <tr>
                        <th>Player count</th>
                        <th>short</th>
                        <th>medium</th>
                        <th>long</th>
                    </tr>
                    <tr>
                        <td>2 to 4 players</td>
                        <td>137 Pt.</td>
                        <td>154 Pt.</td>
                        <td>179 Pt.</td>
                    </tr>
                    <tr>
                        <td>5 to 8 players</td>
                        <td>113 Pt.</td>
                        <td>137 Pt.</td>
                        <td>154 Pt.</td>
                    </tr>
                    <tr>
                        <th>approximate game duration</th>
                        <td>~35min</td>
                        <td>~60min</td>
                        <td>~90min</td>
                    </tr>
                </table>
                <br/>

                <Header>Scoring</Header>
                <p>
                    All Numeral Cards, both coloured and black, result in 1 to 9
                    points, according to their number. The Special Cards count
                    as 7 points. With the exception of the "Fuck You" card, it
                    counts as 42 points.
                </p>
            </div>
            //TODO: the end of deck trigger may not apply to our system?
        );
    }
}

export default RulesSection;