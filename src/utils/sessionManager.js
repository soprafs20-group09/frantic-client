/**
 * This file manages our sessionStorage in a more centralized way.
 */

export default {
    get token() {
        return sessionStorage.getItem('token');
    },
    set token(value) {
        sessionStorage.setItem('token');
    }
};