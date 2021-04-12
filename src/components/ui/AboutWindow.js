import React, {Component} from 'react';
import InlineSVG from "react-inlinesvg";
import Logo from "../../assets/frantic/logo-text.svg";
import Header from "./Header";
import uiUtils from "../../utils/uiUtils";
import Cross from "../../assets/icons/cross.svg";

class AboutWindow extends Component {
    render() {
        return (
            <div className="toolwindow-container" style={{height: "90vh"}}>
                <div className="help-nav-container">
                    {this.props.withClose &&
                        <InlineSVG
                            src={Cross}
                            className="help-nav-button"
                            onClick={this.props.onClose}
                        />
                    }
                </div>
                <div className="about-content">
                    <InlineSVG src={Logo} className="about-logo"/>
                    <div className="about-text">
                        <h2>Hi there!</h2>
                        <p>
                            We are the creators of this online version of the game Frantic.
                            We developed this website as a student project at the University of Zurich.
                            <br/><br/>
                            We are all very passionate programmers.
                            And for this project we put our very heart into it,
                            often working late into the night so that we can deliver
                            the best possible experience for you guys.
                            Even the slightest details in the user interface were carefully thought of
                            and designed by our team. Although not always without a clash of opinions.
                            Still overall this was a great adventure for all of us
                            and we hope you enjoy the game as much as we do.
                            <br/><br/>
                            <strong>Thanks for playing!</strong>
                        </p>
                        <p>
                            Frantic © is a card game made by Rulefactory, a Swiss playing cards company.
                            The concept was created by Fabian Engeler, Pascal Frick and
                            Stefan Weisskopf, and designed by Pierre Lippuner.
                            If you enjoy the game, please consider buying the original
                            or spice things up even more with add-ons
                            on <a href="https://www.rulefactory.ch" target="_blank">rulefactory.ch</a>.
                        </p>

                        <div className="about-explore">
                            <Header>Donate</Header>
                            <p>
                                If you enjoy playing the game and would like to support us, feel free to donate!
                            </p>
                            <ul className="explore-list">
                                <ExploreItem icon="misc:bmc-logo" newTab target="https://www.buymeacoffee.com/frantic.online">Buy Us a Coffee!</ExploreItem>
                            </ul>
                        </div>

                        <Header>Get in Contact</Header>
                        <p>
                            Found a bug? Love the game? Ruined friendships?
                            <br/>
                            Let us know at <a href="mailto:contact@frantic.online">contact@frantic.online</a>!
                        </p>
                    </div>
                    <div className="about-explore">
                        <Header>Explore the Project</Header>
                        <ul className="explore-list">
                            <ExploreItem icon="event:earthquake" target="/animations">Visit the Animation
                                Gallery!</ExploreItem>
                            <ExploreItem icon="misc:github" newTab target="https://github.com/soprafs20-group09">Dig
                                through our code on GitHub!</ExploreItem>
                        </ul>
                    </div>
                    <div className="about-team">
                        <Header>Meet the Team</Header>
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
        );
    }
}

class ExploreItem extends Component {
    render() {
        return (
            <li className="explore-item">
                <a href={this.props.target} target={this.props.newTab ? '_blank' : null} className="explore-item-inner">
                    <InlineSVG src={uiUtils.resolveIconString(this.props.icon)} className="explore-item-icon"/>
                    {this.props.children}
                </a>
            </li>
        );
    }
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
                    <img src={this.getMemberImage(this.props.name)} className="member-img"/>
                    <p className="member-name">{this.props.name}</p>
                </div>
                <div className="member-roles-container">
                    {roles}
                </div>
            </div>
        );
    }

    getMemberImage(name) {
        return require("assets/team/" + name.toLowerCase() + ".jpg");
    }
}

export default AboutWindow;