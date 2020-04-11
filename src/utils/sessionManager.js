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
        return sessionStorage.getItem('ingame');
    },
    set inGame(value) {
        if (value === undefined) {
            sessionStorage.removeItem('ingame');
        }
        sessionStorage.setItem('ingame', value);
    },

    reset() {
        sessionStorage.clear();
    }
};