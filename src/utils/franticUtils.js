const multicolorCards = [
    'fantastic',
    'fantastic-four',
    'equality',
    'counterattack',
    'nice-try',
    'fuck-you'
];
const multinumberCards = [
    'fantastic',
    'fantastic-four',
];

function isMulticolor(value) {
    return multicolorCards.indexOf(value) >= 0;
}

function isMultinumber(value) {
    return multinumberCards.indexOf(value) >= 0;
}

export default {
    isMulticolor,
    isMultinumber
}