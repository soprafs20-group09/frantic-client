import React from 'react';
import ChatItem from "components/ui/chat/ChatItem";
import {getPlayerAvatar} from "utils/api";
import DoomsdayAnimation from "components/ui/events/DoomsdayAnimation";
import TornadoAnimation from "components/ui/events/TornadoAnimation";
import FridayThe13ThAnimation from "components/ui/events/FridayThe13thAnimation";
import FinishLineAnimation from "components/ui/events/FinishLineAnimation";

function parseChatObject(msg) {
    let newItem;
    switch (msg.type) {
        case 'msg':
            newItem =
                <ChatItem
                    style={msg.type}
                    sender={msg.username}
                    icon={getPlayerAvatar(msg.username)}
                    key={new Date().getTime()}
                >
                    {msg.message}
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
                    {msg.message}
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

        default:
            return 'coming soon™';
    }
}

export default {
    parseChatObject,
    resolveIconString,
    getEventAnimation
}