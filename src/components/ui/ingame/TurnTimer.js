import React, {Component} from 'react';
import "styles/ui/ingame/TurnTimer.scss";
import Icon from "components/ui/Icon";

/**
 * Shows a ticking timer
 * PROPS:
 * start: bool                  - timer will start on mount if true.
 * seconds: number              - how much time should be on the timer.
 * turn: any                    - a turn number or key that causes the timer to reste on change
 * timebomb: number             - if set, a timebomb icon will be displayed below the timer
 *                                with a corresponding number next to it.
 * visible: bool                - whether to show the timer.
 */
class TurnTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {currentAngle: 359, remainingSeconds: props.seconds};
    }

    componentDidMount() {
        if (this.props.start && this.props.seconds) {
            this.reset();
            this.start();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.turn !== this.props.turn && this.props.start) {
            this.reset();
            if (this.props.seconds) {
                this.start();
            }
        }
    }

    componentWillUnmount() {
        this.clearIntervals();
    }

    render() {
        return (
            <div className="turn-timer-container">
                {this.props.visible ?
                <div className="turn-timer-inner">
                    <svg className="turn-timer" viewBox="0 0 250 250">
                        {this.getCurrentFrame()}
                    </svg>
                    <p className="turn-timer-seconds">{this.state.remainingSeconds}s</p>
                </div> : null}
                {this.getTimeBombPart()}
            </div>
        );
    }

    start() {
        this.spinnerInterval = setInterval(() => {
            if (this.state.currentAngle > 0) {
                this.setState({
                    currentAngle: this.state.currentAngle - 2
                });
            }
            else {
                clearInterval(this.spinnerInterval);
            }
        }, ((this.props.seconds) / 180 * 1000));
        this.secondInterval = setInterval(() => {
            if (this.state.remainingSeconds > 0) {
                this.setState({remainingSeconds: this.state.remainingSeconds - 1});
            }
            else {
                clearInterval(this.secondInterval);
            }
        }, 1000);
    }

    clearIntervals() {
        if (this.spinnerInterval) {
            clearInterval(this.spinnerInterval);
        }
        if (this.secondInterval) {
            clearInterval(this.secondInterval);
        }
    }

    reset() {
        this.clearIntervals();
        this.setState({
            currentAngle: 359,
            remainingSeconds: this.props.seconds
        });
    }

    getCurrentFrame() {
        const {currentAngle} = this.state;

        const r = (currentAngle * Math.PI / 180),
            x = Math.sin(r) * 125,
            y = Math.cos(r) * -125,
            mid = (currentAngle > 180) ? 1 : 0;

        let anim = 'M 0 0 v -125 A 125 125 1 '
            + mid + ' 1 '
            + x + ' '
            + y + ' z';

        return (
            <path
                d={anim}
                className="turn-timer-spinner"
                transform="translate(125, 125)"
            />
        );
    }

    getTimeBombPart() {
        if (this.props.timebomb) {
            return (
                <div className="turn-timer-inner bomb">
                    <Icon from="event" className="turn-timer-bomb">time-bomb</Icon>
                    <p className="turn-timer-seconds bomb">{this.props.timebomb}</p>
                </div>
            );
        }
        else return false;
    }
}

export default TurnTimer;