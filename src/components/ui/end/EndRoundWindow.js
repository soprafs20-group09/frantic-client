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
                jan: 12,
                jon: 15
            }
        });
    }

    render() {
        return (
            <Window title="End of Round" width="45em" height="80vh">
                <Scoreboard players={this.state.players} showWinners={false}/>
            </Window>
        );
    }
}

export default EndRoundWindow;