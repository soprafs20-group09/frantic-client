import React, {Component} from 'react';
import Card from "components/ui/cards/Card";
import AppContainer from "components/ui/AppContainer";
import "styles/views/CardDisplay.scss";

class CardDisplay extends Component {
    render() {
        return (
            <AppContainer>
                <div className="card-display-container">
                    <div className="card-overlay-container">
                        <Card type="number" value="4" color="blue"/>
                    </div>
                    <div className="card-overlay-container">
                        <Card type="number" value="8" color="black"/>
                    </div>
                    <div className="card-overlay-container">
                        <Card type="special" value="fantastic-four"/>
                    </div>
                    <div className="card-overlay-container">
                        <Card type="special" value="skip" color="red"/>
                    </div>
                    <div className="card-overlay-container">
                        <Card type="special" value="exchange" color="blue"/>
                    </div>
                    <div className="card-overlay-container">
                        <Card type="event" value="friday-the-13th"/>
                    </div>
                    <div className="card-overlay-container">
                        <Card type="back"/>
                    </div>
                    <div className="card-overlay-container">
                        <Card type="wish" color="red" value="none"/>
                    </div>
                    <div className="card-overlay-container">
                        <Card type="wish" color="none" value="5"/>
                    </div>
                </div>
            </AppContainer>
        );
    }
}

export default CardDisplay;