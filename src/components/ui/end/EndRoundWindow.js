import React, {Component} from 'react';
import Window from "components/ui/Window";
import Scoreboard from "components/ui/end/Scoreboard";

class EndRoundWindow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: {}
        };
    }

    componentDidMount() {
        this.setState({
            players: {
                user1: 2,
                user2: 45,
                user3: 13,
                user4: 45,
                user5: 6,
                user6: 69,
                user7: 34,
                user8: 420,
            }
        });
    }

    render() {
        return (
            <Window title="End of Round" width="45em" height="80vh">
                <Scoreboard players={this.state.players} showWinners={true}/>
            </Window>
        );
    }
}

export default EndRoundWindow;