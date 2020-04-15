import React, {Component} from 'react';
import "styles/ui/end/Scoreboard.scss";

/**
 * Renders a scoreboard for end-of-round or game.
 * PROPS:
 * players: object       - object of following structure:
 *  {
 *      "jan": 12,
 *      "jon": 15
 *  }
 *  showWinners: boolean - whether to highlight winners.
 */
class Scoreboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="scoreboard-container">

            </div>
        );
    }
}

export default Scoreboard;