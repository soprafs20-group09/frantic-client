import React, {Component} from 'react';
import "styles/ui/events/MerryChristmasAnimation.scss";
import Particles from "react-particles-js";

const snowParticles = {
    "particles": {
        "number": {
            "value": 200,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#fff"
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 3
            },
            "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
            }
        },
        "opacity": {
            "value": 1,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 4,
            "random": true,
            "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": false,
            "distance": 64.13648243462092,
            "color": "#ffffff",
            "opacity": 0.4,
            "width": 2
        },
        "move": {
            "enable": true,
            "speed": 2,
            "direction": "bottom",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": false,
                "mode": "repulse"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 400,
                "line_linked": {
                    "opacity": 0.5
                }
            },
            "bubble": {
                "distance": 400,
                "size": 4,
                "duration": 0.3,
                "opacity": 1,
                "speed": 3
            },
            "repulse": {
                "distance": 100,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
};

class MerryChristmasAnimation extends Component {
    render() {
        return (
            <div className="merry-christmas-animation">
                <Particles
                    className="snow"
                    params={snowParticles}
                />
                <div className="christmas-tree">
                    <div className="needles"/>
                    <div className="needles"/>
                    <div className="needles"/>
                    <div className="log"/>
                    <div className="floor"/>
                    <Chain balls={6}/>
                    <Chain balls={8}/>
                    <Chain balls={8}/>
                    <Chain balls={3}/>
                </div>
            </div>
        );
    }
}

/**
 * PROPS:
 * balls: number
 * style: object
 */
class Chain extends Component {
    render() {
        let balls = [];

        for (let i = 0; i < this.props.balls; i++) {
            balls.push(<div className="balls" key={i}/>)
        }

        return (
            <span className="chain">
                {balls}
            </span>
        );
    }
}

Chain.defaultProps = {
    balls: 6
};

export default MerryChristmasAnimation;