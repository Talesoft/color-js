"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("./colors");
const spaces_1 = require("./spaces");
const { round } = Math;
const functionPattern = /(\w+)\(([^\)]+)\)/;
const argUnitPattern = /([\d.]+)([\w%]+)?/;
function parseFunctionExpression(value) {
    const matches = value.match(functionPattern);
    if (!matches) {
        throw new Error('Passed string is not a valid color function expression');
    }
    const [, space, argString] = matches;
    const metadata = spaces_1.getSpaceMetadata(space);
    const argStrings = argString.split(',').map(s => s.trim());
    if (metadata.channels.length !== argStrings.length) {
        throw new Error(`Invalid number of arguments given to ${space}(), ` +
            `expected ${metadata.channels.length}, got ${argStrings.length}`);
    }
    const data = metadata.channels.map(({ type, scale }, i) => parseFunctionArg(argStrings[i], type, scale));
    return colors_1.Color.create(space, data);
}
exports.parseFunctionExpression = parseFunctionExpression;
function toFunctionExpression(info) {
    const metadata = spaces_1.getSpaceMetadata(info.space);
    const args = metadata.channels.map(({ type, scale, unit }, i) => toFunctionArg(info.data[i], type, scale, unit));
    return `${info.space}(${args.join(',')})`;
}
exports.toFunctionExpression = toFunctionExpression;
function parseHexExpression(value) {
    if ((value.length !== 4 && value.length !== 7) || !value.startsWith('#')) {
        throw new Error('A hex color expression needs to start with a # and have 3 or 6 hex digits');
    }
    const digits = value.substr(1);
    const short = digits.length === 3;
    const r = short ? digits[0] + digits[0] : digits[0] + digits[1];
    const g = short ? digits[1] + digits[1] : digits[2] + digits[3];
    const b = short ? digits[2] + digits[2] : digits[4] + digits[5];
    return colors_1.Color.rgb(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16));
}
exports.parseHexExpression = parseHexExpression;
function toHexExpression(color) {
    const rgbColor = colors_1.toRgb(color);
    let hex = rgbColor.data.reduce((s, v) => s + round(v).toString(16).padStart(2, '0'), '');
    if (hex[0] === hex[1] && hex[2] === hex[3] && hex[4] === hex[5]) {
        hex = hex[0] + hex[2] + hex[4];
    }
    return `#${hex}`;
}
exports.toHexExpression = toHexExpression;
function parseFunctionArg(valueString, type, scale) {
    const matches = valueString.match(argUnitPattern);
    if (!matches) {
        throw new Error(`Invalid argument format for argument ${valueString}`);
    }
    const [, value, unit = spaces_1.ColorUnit.FIXED] = matches;
    let numericValue = parseFloat(value);
    if (unit === spaces_1.ColorUnit.PERCENT) {
        numericValue = numericValue / 100 * scale;
    }
    if (type === 'int') {
        numericValue = round(numericValue);
    }
    return numericValue;
}
function toFunctionArg(value, type, scale, unit) {
    let stringValue = type === 'int' ? round(value).toFixed(0) : value.toFixed(3);
    if (stringValue !== '0') {
        stringValue = stringValue.replace(/[.0]+$/, '');
    }
    if (unit === spaces_1.ColorUnit.PERCENT) {
        stringValue = `${scale / value * 100}%`;
    }
    return stringValue;
}
