import React from 'react';
import ChatItem from "components/ui/chat/ChatItem";
import {getPlayerAvatar} from "utils/api";

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

            if (msg.icon) {
                icon = resolveIconString(msg.icon);
            }

            newItem =
                <ChatItem
                    style={msg.type}
                    icon={icon}
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

        default:
            icon = null;
            break;
    }

    return icon;
}

export default {
    parseChatObject,
    resolveIconString
}