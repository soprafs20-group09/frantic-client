import React, {Component} from 'react';
import AppContainer from "components/ui/AppContainer";
import {withRouter} from "react-router-dom";
import HelpWindow from "components/ui/help/HelpWindow";

class HelpView extends Component {
    componentDidMount() {
        document.title = "Help - Frantic";
    }

    render() {
        return (
            <AppContainer>
                <HelpWindow/>
            </AppContainer>
        );
    }
}

export default withRouter(HelpView);