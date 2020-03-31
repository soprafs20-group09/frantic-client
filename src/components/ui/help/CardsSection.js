import React, {Component} from 'react';
import CardHelp from "components/ui/help/CardHelp";
import franticUtils from "utils/franticUtils";
import Header from "components/ui/Header";

const specialCards = franticUtils.getAllSpecialCards();
const eventCards = franticUtils.getAllEventCards();

class CardsSection extends Component {
    render() {
        const card = {
            type: 'number',
            value: 7,
            color: 'blue'
        };

        let specialHelps = [];

        for (let specialCard of specialCards) {
            specialHelps.push(
                <CardHelp card={specialCard}/>);
        }

        return (
            <div className="help-section cards">
                <Header>Number Cards</Header>
                <CardHelp card={card}/>
                <Header>Special Cards</Header>
                {specialHelps}
            </div>
        );
    }
}

export default CardsSection;