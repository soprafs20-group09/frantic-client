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
                    <p>
                        The multicolour Special Cards can be played on any
                        card.
                        The coloured Special Cards can only be played on said
                        colour or symbol.
                        <br/>
                        All cards that have an additional colour wish function, can
                        just be played as a colour wish, without unfolding the actual
                        effect of the Special Card.
                        <br/>
                        <th>Important:</th> A player cannot punish himself. (e.g. let himself
                        draw two cards when playing “Fantastic Four”)
                    </p>
                {specialHelps}
            </div>
        );
    }
}

export default CardsSection;