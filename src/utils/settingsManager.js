/**
 * This file manages app settings stored in localStorage.
 */

const defaultValues = {
    multicolorStyle: 'opaque',
    theme: "{\"name\":\"Terracotta\",\"colors\":{\"accent\":\"#E0745C\",\"bgDark\":\"#333840\",\"bgMedium\":\"#484D59\",\"bgLight\":\"#5B6171\",\"bgLighter\":\"#676E80\"}}"
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
                    bgLighter: '#676E80'
                }
            },
            {
                name: "Teal",
                colors: {
                    accent: '#14ebff',
                    bgDark: '#1d3e53',
                    bgMedium: '#254b62',
                    bgLight: '#476d7c',
                    bgLighter: '#4c7485'
                }
            },
            {
                name: "Teal 2",
                colors: {
                    accent: '#66fcf1',
                    bgDark: '#1c1f29',
                    bgMedium: '#1f2833',
                    bgLight: '#2b3847',
                    bgLighter: '#415669'
                }
            },
            {
                name: "IKEA",
                colors: {
                    accent: '#ffd700',
                    bgDark: '#022c43',
                    bgMedium: '#053f5e',
                    bgLight: '#115173',
                    bgLighter: '#125578'
                }
            },
            {
                name: "Mixed",
                colors: {
                    accent: '#ffbd69',
                    bgDark: '#202040',
                    bgMedium: '#543864',
                    bgLight: '#ff6363',
                    bgLighter: '#ff7878'
                }
            },
            {
                name: "Red'n'black",
                colors: {
                    accent: '#c3073f',
                    bgDark: '#1a1a1d',
                    bgMedium: '#4e4e50',
                    bgLight: '#5a5a5c',
                    bgLighter: '#69696b'
                }
            }
        ]
    }
};