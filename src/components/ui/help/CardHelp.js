import React, {Component} from 'react';
import "styles/ui/help/CardHelp.scss";
import Card from "components/ui/cards/Card";
import franticUtils from "utils/franticUtils";

class CardHelp extends Component {
    constructor(props) {
        super(props);
        this.state = {help: franticUtils.getHelpFromCard(props.card)}
    }

    render() {
        return (
            <div className="card-help-container">
                <div className="card-shadow-container">
                    <Card
                        type={this.props.card.type}
                        value={this.props.card.value}
                        color={this.props.card.color}
                    />
                </div>
                <div className="card-info-container">
                    <h2 className="card-info-header">{this.state.help.title}</h2>
                    {this.state.help.description}
                </div>
            </div>
        );
    }
}

export default CardHelp;