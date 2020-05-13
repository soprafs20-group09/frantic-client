import React from 'react';
import ChatItem from "components/ui/chat/ChatItem";
import {getPlayerAvatar} from "utils/api";
import DoomsdayAnimation from "components/ui/events/DoomsdayAnimation";
import TornadoAnimation from "components/ui/events/TornadoAnimation";
import FridayThe13ThAnimation from "components/ui/events/FridayThe13thAnimation";
import FinishLineAnimation from "components/ui/events/FinishLineAnimation";
import VandalismAnimation from "components/ui/events/VandalismAnimation";
import MexicanStandoffAnimation from "components/ui/events/MexicanStandoffAnimation";
import ThirdTimeLuckyAnimation from "../components/ui/events/ThirdTimeLuckyAnimation";
import RecessionAnimation from "components/ui/events/RecessionAnimation";
import CharityAnimation from "components/ui/events/CharityAnimation";
import AllSeeingEyeAnimation from "../components/ui/events/AllSeeingEyeAnimation";
import reactStringReplace from "react-string-replace";
import sessionManager from "utils/sessionManager";
import ExpansionAnimation from "../components/ui/events/ExpansionAnimation";
import MerryChristmasAnimation from "components/ui/events/MerryChristmasAnimation";
import EarthquakeAnimation from "components/ui/events/EarthquakeAnimation";
import CommunismAnimation from "components/ui/events/CommunismAnimation";
import SurprisePartyAnimation from "components/ui/events/SurprisePartyAnimation";
import MatingSeasonAnimation from "components/ui/events/MatingSeasonAnimation";
import RobinHoodAnimation from "components/ui/events/RobinHoodAnimation";

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function parseChatObject(msg) {
    let newItem;
    let text = msg.message;
    if (sessionManager.username) {
        let regex = new RegExp(`\\b(${escapeRegExp(sessionManager.username)})\\b`);
        text = reactStringReplace(
            text,
            regex,
            (match, i) => <span key={i} className="chat-username-highlight">{match}</span>);
    }

    switch (msg.type) {
        case 'msg':
            let senderIcon;
            if (!sessionManager.avatarBlacklist.includes(msg.username)) {
                senderIcon = getPlayerAvatar(msg.username);
            }
            newItem =
                <ChatItem
                    style={msg.type}
                    sender={msg.username}
                    icon={senderIcon}
                    key={new Date().getTime()}
                >
                    {text}
                </ChatItem>;
            break;

        case 'event':
            let icon;
            let svg = false;

            if (msg.icon) {
                icon = resolveIconString(msg.icon);
                svg = !msg.icon.startsWith('avatar');
            }

            newItem =
                <ChatItem
                    style={msg.type}
                    icon={icon}
                    svgIcon={svg}
                    key={new Date().getTime()}
                >
                    {text}
                </ChatItem>;
            break;
    }
    if (newItem) {
        return newItem;
    }
}

function resolveIconString(iconStr) {
    let iconType = iconStr.substr(0, iconStr.indexOf(':'));
    let iconValue = iconStr.substr(iconStr.indexOf(':') + 1);
    let icon;

    switch (iconType) {
        case 'avatar':
            icon = getPlayerAvatar(iconValue);
            break;

        case 'event':
            icon = require("assets/frantic/event-cards/" + iconValue + ".svg");
            break;

        case 'special':
            icon = require("assets/frantic/special-cards/" + iconValue + ".svg");
            break;

        case 'misc':
            icon = require("assets/icons/" + iconValue + ".svg");
            break;

        default:
            icon = null;
            break;
    }

    return icon;
}

function getEventAnimation(event) {
    switch (event) {
        case 'doomsday':
            return <DoomsdayAnimation/>;

        case 'tornado':
            return <TornadoAnimation/>;

        case 'friday-the-13th':
            return <FridayThe13ThAnimation/>;

        case 'finish-line':
            return <FinishLineAnimation/>;

        case 'vandalism':
            return <VandalismAnimation/>;

        case 'mexican-standoff':
            return <MexicanStandoffAnimation/>;

        case 'third-time-lucky':
            return <ThirdTimeLuckyAnimation/>;

        case 'charity':
            return <CharityAnimation/>;

        case 'expansion':
            return <ExpansionAnimation/>;

        case 'recession':
            return <RecessionAnimation/>;

        case 'merry-christmas':
            return <MerryChristmasAnimation/>;

        case 'earthquake':
            return <EarthquakeAnimation/>;

        case 'communism':
            return <CommunismAnimation/>;

        case 'the-all-seeing-eye':
            return <AllSeeingEyeAnimation/>;

        case 'surprise-party':
            return <SurprisePartyAnimation/>;

        case 'mating-season':
            return <MatingSeasonAnimation/>;

        case 'robin-hood':
            return <RobinHoodAnimation/>;

        default:
            return 'coming soon™';
    }
}

function getRem() {
    return parseInt(
        window.getComputedStyle(document.getElementsByTagName('html')[0])
            .getPropertyValue('font-size')
            .slice(0, -2)
    );
}

export default {
    parseChatObject,
    resolveIconString,
    getEventAnimation,
    getRem
}