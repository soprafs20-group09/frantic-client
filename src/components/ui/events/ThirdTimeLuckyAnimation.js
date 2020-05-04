import React, {Component} from 'react';
import "styles/ui/events/ThirdTimeLuckyAnimation.scss";

class ThirdTimeLuckyAnimation extends Component {
    render() {
        return (
            <div className='third-time-lucky-animation'>
                <Dart/>
                <Dart/>
                <Dart/>
                <div className="board-first-circle">
                    <div className="board-second-circle">
                        <div className="board-center"/>
                    </div>
                </div>
            </div>
        );
    }
}

class Dart extends Component {
    render() {
        return (
            <div className="dart">
                <div className="dart-body"/>
                <div className="dart-head"/>
            </div>
        );
    }
}

export default ThirdTimeLuckyAnimation;