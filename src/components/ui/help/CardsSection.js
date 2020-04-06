import React, {Component} from 'react';
import CardHelp from "components/ui/help/CardHelp";
import franticUtils from "utils/franticUtils";
import Header from "components/ui/Header";

const specialCards = franticUtils.getAllSpecialCards();
const colorCard = franticUtils.getRandomNumberCard();
const blackCard = franticUtils.getRandomNumberCard('black');

class CardsSection extends Component {
    render() {
        let specialHelps = [];
        let key = 0;

        for (let specialCard of specialCards) {
            specialHelps.push(
                <CardHelp card={specialCard} key={key++}/>);
        }

        return (
            <div className="help-section cards">
                <Header>Number Cards</Header>
                <CardHelp card={colorCard}/>
                <CardHelp card={blackCard}/>
                <Header>Special Cards</Header>
                {specialHelps}
            </div>
        );
    }
}

export default CardsSection;