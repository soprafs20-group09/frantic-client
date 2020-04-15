import React, {Component} from 'react';
import AppContainer from "components/ui/AppContainer";
import EndRoundWindow from "components/ui/end/EndRoundWindow";

class EndRoundView extends Component {
    render() {
        return (
            <AppContainer withHelp>
                <EndRoundWindow/>
            </AppContainer>
        );
    }
}

export default EndRoundView;