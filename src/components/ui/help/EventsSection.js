import React, {Component} from 'react';
import franticUtils from "utils/franticUtils";
import Header from "components/ui/Header";
import EventHelp from "components/ui/help/EventHelp";

const eventCards = franticUtils.getAllEventCards();

class EventsSection extends Component {
    render() {
        let eventHelps = [];
        for (let event of eventCards) {
            eventHelps.push(<EventHelp card={event}/>);
        }

        return (
            <div className="help-section events">
                <Header>Events</Header>
                {eventHelps}
            </div>
        );
    }
}

export default EventsSection;