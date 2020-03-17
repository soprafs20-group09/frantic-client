import React, {Component} from 'react';
import AppContainer from "components/ui/AppContainer";

import 'styles/views/CreateLobbyView.scss';
import Window from "components/ui/Window";
import Input from "components/ui/Input";
import Header from "components/ui/Header";
import SingleSelect from "components/ui/SingleSelect";
import Switch from "components/ui/Switch";
import Button from "components/ui/Button";
import PlayerList from "components/ui/PlayerList";

class CreateLobbyView extends Component {
    render() {
        const spacingStyle = {marginBottom: '30px'};
        const durationItems = [
            {
                name: 'Short',
                value: 'short'
            },
            {
                name: 'Medium',
                value: 'medium'
            },
            {
                name: 'Long',
                value: 'long'
            }
        ];
        const players = [
            {name: "sina"},
            {name: "kyrill"},
            {name: "davide"},
            {name: "jan", admin: true},
            {name: "remy"},
            {name: "hans"},
            {name: "joe"},
            {name: "mama"},
        ];

        return (
            <AppContainer withBack withHelp>
                <Window title="Create Lobby" width="870px">
                    <div className="createlobby-container">
                        <div className="createlobby-column">
                            <Header>Settings</Header>
                            <Input
                                style={spacingStyle}
                                title="Join Link"
                                action="Copy"
                            />
                            <Input
                                style={spacingStyle}
                                title="Lobby Name"
                            />
                            <SingleSelect
                                style={spacingStyle}
                                title="Game Duration"
                                items={durationItems}
                                initialValue="short"
                            />
                            <Switch
                                style={spacingStyle}
                                title="Public"
                                on="yes"
                                off="no"
                                initialValue={true}
                            />
                            <Button disabled width="100%">Start Game</Button>
                        </div>
                        <div className="createlobby-column">
                            <Header>Players</Header>
                            <PlayerList
                                players={players}
                                adminMode={false}
                            />
                        </div>
                    </div>
                </Window>
            </AppContainer>
        );
    }
}

export default CreateLobbyView;