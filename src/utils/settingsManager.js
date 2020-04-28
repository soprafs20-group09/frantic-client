/**
 * This file manages app settings stored in localStorage.
 */

const defaultValues = {
    multicolorStyle: 'opaque'
};

function getItem(name) {
    let value = localStorage.getItem(name);
    if (value === null) {
        return defaultValues[name];
    }
    return value;
}

function setItem(name, value) {
    if (value === undefined) {
        sessionStorage.removeItem(name);
    }
    localStorage.setItem(name, value);
}

export default {
    get multicolorStyle() {
        return getItem('multicolorStyle');
    },
    set multicolorStyle(value) {
        setItem('multicolorStyle', value);
    }
};