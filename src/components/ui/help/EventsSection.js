import React, {Component} from 'react';
import CardHelp from "components/ui/help/CardHelp";
import franticUtils from "utils/franticUtils";
import Header from "components/ui/Header";

const eventCards = franticUtils.getAllEventCards();

class EventsSection extends Component {
    render() {
        let eventHelps = [];
        for (let event of eventCards) {
            eventHelps.push(<CardHelp card={event}/>);
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