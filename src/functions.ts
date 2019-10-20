import { Color, createColor, createHslaColor, createHslColor, createRgbaColor, createRgbColor } from './colors';
import { COLOR_CONVERTERS } from './converters';
import { toFunctionExpression, toHexExpression } from './expressions';
import { ColorSpace, getColorSpaceScales } from './spaces';

export function isSpace(color: Color, space: ColorSpace) {
    return color.space === space;
}

export function isRgb(color: Color) {
    return isSpace(color, ColorSpace.RGB);
}

export function isRgba(color: Color) {
    return isSpace(color, ColorSpace.RGBA);
}

export function isAnyRgb(color: Color) {
    return isRgb(color) || isRgba(color);
}

export function isHsl(color: Color) {
    return isSpace(color, ColorSpace.RGB);
}

export function isHsla(color: Color) {
    return isSpace(color, ColorSpace.HSLA);
}

export function isAnyHsl(color: Color) {
    return isHsl(color) || isHsla(color);
}

export function isAlpha(color: Color) {
    return isRgba(color) || isHsla(color);
}

export function toSpace(color: Color, targetSpace: ColorSpace) {
    if (color.space === targetSpace) {
        return color;
    }
    return COLOR_CONVERTERS[color.space][targetSpace](color);
}

export function toRgb(color: Color) {
    return toSpace(color, ColorSpace.RGB);
}

export function toRgba(color: Color) {
    return toSpace(color, ColorSpace.RGBA);
}

export function toAnyRgb(color: Color) {
    return isAlpha(color) ? toRgba(color) : toRgb(color);
}

export function toHsl(color: Color) {
    return toSpace(color, ColorSpace.HSL);
}

export function toHsla(color: Color) {
    return toSpace(color, ColorSpace.HSLA);
}

export function toAnyHsl(color: Color) {
    return isAlpha(color) ? toHsla(color) : toHsl(color);
}

export function toAnyAlpha(color: Color) {
    if (isAnyHsl(color)) {
        return toHsla(color);
    }
    return toRgba(color);
}

export function toAnyOpaque(color: Color) {
    if (isAnyHsl(color)) {
        return toHsl(color);
    }
    return toRgb(color);
}

export function getRed(color: Color) {
    return toAnyRgb(color).data[0];
}

export function withRed(color: Color, value: number) {
    const [, g, b, a] = toAnyRgb(color).data;
    return a !== undefined ? createRgbaColor(value, g, b, a) : createRgbColor(value, g, b);
}

export function getGreen(color: Color) {
    return toAnyRgb(color).data[1];
}

export function withGreen(color: Color, value: number) {
    const [r, , b, a] = toAnyRgb(color).data;
    return a !== undefined ? createRgbaColor(r, value, b, a) : createRgbColor(r, value, b);
}

export function getBlue(color: Color) {
    return toAnyRgb(color).data[2];
}

export function withBlue(color: Color, value: number) {
    const [r, g, , a] = toAnyRgb(color).data;
    return a !== undefined ? createRgbaColor(r, g, value, a) : createRgbColor(r, g, value);
}

export function getHue(color: Color) {
    return toAnyHsl(color).data[0];
}

export function withHue(color: Color, value: number) {
    const [, s, l, a] = toAnyHsl(color).data;
    return a !== undefined ? createHslaColor(value, s, l, a) : createHslColor(value, s, l);
}

export function getSaturation(color: Color) {
    return toAnyHsl(color).data[1];
}

export function withSaturation(color: Color, value: number) {
    const [h, , l, a] = toAnyHsl(color).data;
    return a !== undefined ? createHslaColor(h, value, l, a) : createHslColor(h, value, l);
}

export function getLightness(color: Color) {
    return toAnyHsl(color).data[2];
}

export function withLightness(color: Color, value: number) {
    const [h, s, , a] = toAnyHsl(color).data;
    return a !== undefined ? createHslaColor(h, s, value, a) : createHslColor(h, s, value);
}

export function getOpacity(color: Color) {
    const { data } = toAnyAlpha(color);
    return data[data.length - 1];
}

export function withOpacity(color: Color, value: number) {
    const { space, data } = toAnyAlpha(color);
    return createColor(space, [...data.slice(0, data.length - 1), value]);
}

export function invert(color: Color) {
    const [r, g, b, a] = toAnyRgb(color).data;
    const [rScale, gScale, bScale] = getColorSpaceScales(ColorSpace.RGB);
    return a !== undefined
        ? createRgbaColor(rScale - r, gScale - g, bScale - b, a)
        : createRgbColor(rScale - r, gScale - g, bScale - b);
}

export function lighten(color: Color, value: number) {
    return withLightness(color, getLightness(color) + value);
}

export function darken(color: Color, value: number) {
    return withLightness(color, getLightness(color) - value);
}

export function tint(color: Color, value: number) {
    return withSaturation(color, getSaturation(color) + value);
}

export function tone(color: Color, value: number) {
    return withSaturation(color, getSaturation(color) - value);
}

export function grayscale(color: Color) {
    return withSaturation(color, 0);
}

export function fadeIn(color: Color, value: number) {
    return withOpacity(color, getOpacity(color) + value);
}

export function fadeOut(color: Color, value: number) {
    return withOpacity(color, getOpacity(color) - value);
}

export function toString(color: Color) {
    const rgbColor = toAnyRgb(color);
    return isAlpha(rgbColor) && getOpacity(rgbColor) < 1
        ? toFunctionExpression(rgbColor)
        : toHexExpression(rgbColor);
}
