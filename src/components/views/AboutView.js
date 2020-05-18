import React, {Component} from 'react';
import Logo from "assets/frantic/logo-text.svg";
import InlineSVG from "react-inlinesvg";
import AppContainer from "components/ui/AppContainer";
import {WindowTransition} from "components/ui/Transitions";
import "styles/views/AboutView.scss";
import Header from "components/ui/Header";

class AboutView extends Component {
    render() {
        return (
            <AppContainer withBack>
                <WindowTransition>
                    <div className="toolwindow-container" style={{height: "90vh"}}>
                        <div className="about-content">
                            <InlineSVG src={Logo} className="about-logo"/>
                            <div className="about-text">
                                <h2>Hi there!</h2>
                                <p>
                                    We are the creators of this online version of the game Frantic.
                                    We developed this website as a student project at the University of Zurich.
                                    We are all very passionate programmers.
                                    And for this project we put our very heart into it,
                                    often working late into the night so that we can deliver
                                    the best possible experience for you guys.
                                    Even the slightest details in the user interface were carefully thought of
                                    and designed by our team. Although not always without a clash of opinions.
                                    Still overall this was a great adventure for all of us
                                    and we hope you enjoy the game as much as we do.
                                    <br/>
                                    <strong>Thanks for playing!</strong>
                                </p>
                            </div>
                            <div className="about-team">
                                <Header>The team</Header>
                                <div className="team-container">
                                    <TeamItem
                                        name="Kyrill"
                                        roles={["Team Lead", "Frontend Lead"]}
                                    />
                                    <TeamItem
                                        name="Jan"
                                        roles={["Networking Lead", "Backend"]}
                                    />
                                    <TeamItem
                                        name="Remy"
                                        roles={["Backend Lead", "Game Mechanics"]}
                                    />
                                    <TeamItem
                                        name="Davide"
                                        roles={["Backend", "Animations"]}
                                    />
                                    <TeamItem
                                        name="Sina"
                                        roles={["Backend", "Animations"]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </WindowTransition>
            </AppContainer>
        );
    }
}

function getMemberImage(name) {
    return require("assets/team/" + name.toLowerCase() + ".jpg");
}

/**
 * PROPS:
 *
 */
class TeamItem extends Component {
    render() {
        let roles = [];

        for (let role of this.props.roles) {
            roles.push(<span className="member-role" key={role}>{role}</span>);
        }

        return (
            <div className="team-item">
                <div className="member-name-container">
                    <img src={getMemberImage(this.props.name)} className="member-img"/>
                    <p className="member-name">{this.props.name}</p>
                </div>
                <div className="member-roles-container">
                    {roles}
                </div>
            </div>
        );
    }
}

export default AboutView;