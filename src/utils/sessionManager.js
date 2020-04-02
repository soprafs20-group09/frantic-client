/**
 * This file manages our sessionStorage in a more centralized way.
 */

export default {
    get token() {
        return sessionStorage.getItem('token');
    },
    set token(value) {
        if (value === undefined) {
            sessionStorage.removeItem('token');
        }
        sessionStorage.setItem('token', value);
    },
    get lobbyId() {
        return sessionStorage.getItem('lobbyId');
    },
    set lobbyId(value) {
        if (value === undefined) {
            sessionStorage.removeItem('lobbyId');
        }
        sessionStorage.setItem('lobbyId', value);
    }

};