import React, {Component} from 'react';
import franticUtils from "utils/franticUtils";
import Header from "components/ui/Header";
import EventHelp from "components/ui/help/EventHelp";

const eventCards = franticUtils.getAllEventCards();

class EventsSection extends Component {
    render() {
        let eventHelps = [];
        for (let event of eventCards) {
            eventHelps.push(<EventHelp card={event} key={event.key}/>);
        }

        return (
            <div className="help-section events">
                <Header>Events</Header>
                <p>
                    Events are activated when a Black Card is
                    played. When that happens, a random event is revealed and gets executed. Every event can only be activated once per round.
                    <br/>
                    The first person to be affected is always the person on the right hand side of the
                    player of the Black Card. If more than one player are the potential subject of the Event Card, it affects the first person
                    who is in counter-clockwise direction closest to the player of
                    the Black Card. Unless it is declared otherwise.
                    <br/>
                    <strong>Important:</strong> The current round will not be over, until the event
                    has been executed completely. And even if a player loses all
                    of his hand cards due to an event, “Nice Try“ can be played!
                </p>
                {eventHelps}
            </div>
        );
    }
}

export default EventsSection;