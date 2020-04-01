import React, {Component} from 'react';
import "styles/ui/help/CardHelp.scss";
import franticUtils from "utils/franticUtils";
import InlineSVG from "react-inlinesvg";

class EventHelp extends Component {
    constructor(props) {
        super(props);
        this.state = {help: franticUtils.getHelpFromCard(props.card)}
    }

    render() {
        const event = require("assets/frantic/event-cards/" + this.props.card.value + ".svg");
        return (
            <div className="card-help-container">
                <div className="card-event-icon">
                    <InlineSVG className="card-event-icon" src={event}/>
                </div>
                <div className="card-info-container">
                    <h2 className="card-info-header">{this.state.help.title}</h2>
                    {this.state.help.description}
                </div>
            </div>
        );
    }
}

export default EventHelp;