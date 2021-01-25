import React, {Component} from 'react';
import AppContainer from "components/ui/AppContainer";
import {WindowTransition} from "components/ui/Transitions";
import "styles/views/AboutView.scss";
import AboutWindow from "../ui/AboutWindow";

class AboutView extends Component {
    componentDidMount() {
        document.title = "About - Frantic";
    }

    render() {
        return (
            <AppContainer withBack>
                <WindowTransition>
                    <AboutWindow/>
                </WindowTransition>
            </AppContainer>
        );
    }
}

export default AboutView;