import { Color, toRgb } from './colors';
import { ColorSpace, ColorUnit, getColorSpaceMetadata } from './spaces';

const { round } = Math;

const functionPattern = /(\w+)\(([^\)]+)\)/;
const argUnitPattern = /([\d.]+)([\w%]+)?/;

export function parseFunctionExpression(value: string) {
    const matches = value.match(functionPattern);
    if (!matches) {
        throw new Error('Passed string is not a valid color function expression');
    }
    const [, space, argString] = matches;
    const metadata = getColorSpaceMetadata(space as ColorSpace);
    const argStrings = argString.split(',').map(s => s.trim());
    if (metadata.channels.length !== argStrings.length) {
        throw new Error(
            `Invalid number of arguments given to ${space}(), ` +
            `expected ${metadata.channels.length}, got ${argStrings.length}`,
        );
    }
    const data = metadata.channels.map(({ type, scale }, i) => parseFunctionArg(argStrings[i], type, scale));
    return Color.create(space as ColorSpace, data);
}

export function toFunctionExpression(info: Color) {
    const metadata = getColorSpaceMetadata(info.space as ColorSpace);
    const args = metadata.channels.map(({ type, scale, unit }, i) => toFunctionArg(info.data[i], type, scale, unit));
    return `${info.space}(${args.join(',')})`;
}

export function parseHexExpression(value: string) {
    if ((value.length !== 4 && value.length !== 7) || !value.startsWith('#')) {
        throw new Error('A hex color expression needs to start with a # and have 3 or 6 hex digits');
    }
    const digits = value.substr(1);
    const short = digits.length === 3;
    const r = short ? digits[0] + digits[0] : digits[0] + digits[1];
    const g = short ? digits[1] + digits[1] : digits[2] + digits[3];
    const b = short ? digits[2] + digits[2] : digits[4] + digits[5];
    return Color.rgb(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16));
}

export function toHexExpression(color: Color) {
    const rgbColor = toRgb(color);
    let hex = rgbColor.data.reduce((s, v) => s + round(v).toString(16).padStart(2, '0'), '');
    if (hex[0] === hex[1] && hex[2] === hex[3] && hex[4] === hex[5]) {
        hex = hex[0] + hex[2] + hex[4];
    }
    return `#${hex}`;
}

function parseFunctionArg(valueString: string, type: 'int' | 'float', scale: number) {
    const matches = valueString.match(argUnitPattern);
    if (!matches) {
        throw new Error(`Invalid argument format for argument ${valueString}`);
    }
    const [, value, unit = ColorUnit.FIXED] = matches;
    let numericValue = parseFloat(value);
    if (unit === ColorUnit.PERCENT) {
        numericValue = numericValue / 100 * scale;
    }
    if (type === 'int') {
        numericValue = round(numericValue);
    }
    return numericValue;
}

function toFunctionArg(value: number, type: 'int' | 'float', scale: number, unit: ColorUnit) {
    let stringValue = type === 'int' ? round(value).toFixed(0) : value.toFixed(3);
    if (stringValue !== '0') {
        stringValue = stringValue.replace(/[.0]+$/, '');
    }
    if (unit === ColorUnit.PERCENT) {
        stringValue = `${scale / value * 100}%`;
    }
    return stringValue;
}
