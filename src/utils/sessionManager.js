/**
 * This file manages our sessionStorage in a more centralized way.
 */
import settingsManager from "utils/settingsManager";

export default {
    get lobbyId() {
        return sessionStorage.getItem('lobbyId');
    },
    set lobbyId(value) {
        if (value === undefined) {
            sessionStorage.removeItem('lobbyId');
        }
        sessionStorage.setItem('lobbyId', value);
    },
    get username() {
        return sessionStorage.getItem('username');
    },
    set username(value) {
        if (value === undefined) {
            sessionStorage.removeItem('username');
        }
        sessionStorage.setItem('username', value);
    },
    get inGame() {
        let val = sessionStorage.getItem('ingame');
        if (val) {
            return val === 'true';
        }
        return false;
    },
    set inGame(value) {
        if (value === undefined) {
            sessionStorage.removeItem('ingame');
        }
        sessionStorage.setItem('ingame', value);
    },
    set blockReload(value) {
        if (value === undefined) {
            sessionStorage.removeItem('blockReload');
        }
        sessionStorage.setItem('blockReload', value);
    },
    get blockReload() {
        let val = sessionStorage.getItem('blockReload');
        if (val) {
            return val === 'true';
        }
        return false;
    },
    get endPlayers() {
        return JSON.parse(sessionStorage.getItem('endPlayers'));
    },
    set endPlayers(value) {
        if (value === undefined) {
            sessionStorage.removeItem('endPlayers');
        }
        sessionStorage.setItem('endPlayers', JSON.stringify(value));
    },
    get endChanges() {
        return JSON.parse(sessionStorage.getItem('endChanges'));
    },
    set endChanges(value) {
        if (value === undefined) {
            sessionStorage.removeItem('endChanges');
        }
        sessionStorage.setItem('endChanges', JSON.stringify(value));
    },
    get endMessage() {
        return JSON.parse(sessionStorage.getItem('endMessage'));
    },
    set endMessage(value) {
        if (value === undefined) {
            sessionStorage.removeItem('endMessage');
        }
        sessionStorage.setItem('endMessage', JSON.stringify(value));
    },
    get pointLimit() {
        return sessionStorage.getItem('pointLimit');
    },
    set pointLimit(value) {
        if (value === undefined) {
            sessionStorage.removeItem('pointLimit');
        }
        sessionStorage.setItem('pointLimit', value);
    },
    get endSeconds() {
        let val = parseInt(sessionStorage.getItem('endSeconds'));
        if (!isNaN(val)) {
            return val;
        }
    },
    set endSeconds(value) {
        if (value === undefined) {
            sessionStorage.removeItem('endSeconds');
        }
        sessionStorage.setItem('endSeconds', value);
    },
    get endAdmin() {
        return sessionStorage.getItem('endAdmin');
    },
    set endAdmin(value) {
        if (value === undefined) {
            sessionStorage.removeItem('endAdmin');
        }
        sessionStorage.setItem('endAdmin', value);
    },
    get avatarBlacklist() {
        const item = sessionStorage.getItem('avatarBlacklist');
        if (!item) {
            return [];
        }
        return JSON.parse(item);
    },
    set avatarBlacklist(value) {
        if (value === undefined) {
            sessionStorage.removeItem('avatarBlacklist');
        }
        sessionStorage.setItem('avatarBlacklist', JSON.stringify(value));
    },

    chat: {
        getCurrent() {
            if (!this.items) {
                this.items = [];
            }
            return this.items;
        },
        addMessage(item) {
            if (!this.items) {
                this.items = [];
            }
            this.items = this.items.concat(item);
            if (this.items.length >= settingsManager.constants.maxChatItems) {
                this.items.shift();
            }
            return this.items;
        },
        clear() {
            this.items = [];
        }
    },

    reset() {
        sessionStorage.clear();
    }
};