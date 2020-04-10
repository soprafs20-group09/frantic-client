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
                let iconType = msg.icon.substr(0, msg.icon.indexOf(':'));
                let iconValue = msg.icon.substr(msg.icon.indexOf(':') + 1);

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
                }
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

export default {
    parseChatObject
}