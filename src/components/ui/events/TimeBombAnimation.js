import React, {Component} from 'react';
import "styles/ui/events/TimeBombAnimation.scss";
import Wires  from "assets/animations/wires.svg";
import InlineSVG from "react-inlinesvg";

class TimeBombAnimation extends Component {
    constructor(props) {
        super(props);
        this.state = {seconds: 5};
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            if (this.state.seconds > 0) {
                this.setState({seconds: this.state.seconds - 1});
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    render() {
        return (
            <div className="time-bomb-animation">
                <div className="bomb-container">
                    <div className="dynamite"/>
                    <div className="dynamite"/>
                    <div className="dynamite"/>
                    <div className="bomb-timer">
                        <div className="display">
                            00:0{this.state.seconds}
                        </div>
                    </div>
                    <InlineSVG src={Wires} className="wires"/>
                </div>
            </div>
        );
    }
}
export default TimeBombAnimation;