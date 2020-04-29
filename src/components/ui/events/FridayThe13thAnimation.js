import React, {Component} from 'react';
import "styles/ui/events/FridayThe13thAnimation.scss";
import Icon from "../Icon";

class FridayThe13ThAnimation extends Component {
   render() {
      return (
         <div className="friday-the-13th-animation">
            <div className="chimney"/>
            <div className="roof"/>
            <div className="house">
               <div className="window"/>
               <div className="window"/>
            </div>
            <div className="killer">
               <Icon className="killer-mask" from="event">friday-the-13th</Icon>
               <div className="cleaver">
                  <div className="cleaver-stick"/>
                  <div className="cleaver-blade"/>
                  <div className="cleaver-hole"/>
               </div>
            </div>

         </div>
      );
   }
}

export default FridayThe13ThAnimation;