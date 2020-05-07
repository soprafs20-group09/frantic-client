/**
 * This file manages our sessionStorage in a more centralized way.
 */

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
        return val;
    },
    set inGame(value) {
        if (value === undefined) {
            sessionStorage.removeItem('ingame');
        }
        sessionStorage.setItem('ingame', value);
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
    get pointLimit() {
        return sessionStorage.getItem('pointLimit');
    },
    set pointLimit(value) {
        if (value === undefined) {
            sessionStorage.removeItem('pointLimit');
        }
        sessionStorage.setItem('pointLimit', value);
    },

    reset() {
        sessionStorage.clear();
    }
};