/**
 * This file manages app settings stored in localStorage.
 */

const defaultValues = {
    multicolorStyle: 'opaque',
    theme: "{\"name\":\"Terracotta\",\"colors\":{\"accent\":\"#E0745C\",\"bgDark\":\"#333840\",\"bgMedium\":\"#484D59\",\"bgLight\":\"#5B6171\",\"bgLighter\":\"#676E80\",\"text\":\"white\"}}",
    animations: true
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
        localStorage.removeItem(name);
    }
    localStorage.setItem(name, value);
}

export default {
    get multicolorStyle() {
        return getItem('multicolorStyle');
    },
    set multicolorStyle(value) {
        setItem('multicolorStyle', value);
    },
    get animations() {
        return getItem('animations') === 'true';
    },
    set animations(value) {
        setItem('animations', value)
    },
    get theme() {
        return JSON.parse(getItem('theme'));
    },
    set theme(value) {
        if (value === undefined) {
            localStorage.removeItem('theme');
        }
        localStorage.setItem('theme', JSON.stringify(value));
    },
    applyTheme() {
        const colors = this.theme.colors;
        const root = document.documentElement;
        root.style.setProperty('--accent-color', colors.accent);
        root.style.setProperty('--bg-dark', colors.bgDark);
        root.style.setProperty('--bg-medium', colors.bgMedium);
        root.style.setProperty('--bg-light', colors.bgLight);
        root.style.setProperty('--bg-lighter', colors.bgLighter);
        root.style.setProperty('--text-color', colors.text);
    },

    available: {
        multicolorStyles: [
            {name: "Matte", value: 'matte'},
            {name: "Opaque", value: 'opaque'},
            {name: "Colorful", value: 'colorful'}
        ],
        themes: [
            {
                name: "Terracotta",
                colors: {
                    accent: '#E0745C',
                    bgDark: '#333840',
                    bgMedium: '#484D59',
                    bgLight: '#5B6171',
                    bgLighter: '#676E80',
                    text: 'white'
                }
            },
            {
                name: "Lavender",
                colors: {
                    accent: '#735dde',
                    bgDark: '#cdcdcd',
                    bgMedium: '#ffffff',
                    bgLight: '#e6e6e6',
                    bgLighter: '#d9d9d9',
                    text: 'black'
                }
            },
            {
                name: "Teal",
                colors: {
                    accent: '#14ebff',
                    bgDark: '#1d3e53',
                    bgMedium: '#254b62',
                    bgLight: '#476d7c',
                    bgLighter: '#4c7485',
                    text: 'white'
                }
            },
            {
                name: "Royal blue",
                colors: {
                    accent: '#ffd700',
                    bgDark: '#022c43',
                    bgMedium: '#053f5e',
                    bgLight: '#115173',
                    bgLighter: '#125578',
                    text: 'white'
                }
            },
            {
                name: "Mulberry",
                colors: {
                    accent: '#cc5079',
                    bgDark: '#2c3040',
                    bgMedium: '#3e4359',
                    bgLight: '#505773',
                    bgLighter: '#596180',
                    text: 'white'
                }
            },
            {
                name: "Mixed",
                colors: {
                    accent: '#ffbd69',
                    bgDark: '#202040',
                    bgMedium: '#543864',
                    bgLight: '#424263',
                    bgLighter: '#676791',
                    text: 'white'
                }
            }
        ],
        animations: [
            {name: "on", value: true},
            {name: "off", value: false}
        ],
    },
    constants: {
        maxFontSize: 18,
        maxChatItems: 512
    }
};