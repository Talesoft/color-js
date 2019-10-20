"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("./colors");
const spaces_1 = require("./spaces");
const { min, max } = Math;
exports.colorConverters = {
    // RGB
    [spaces_1.ColorSpace.RGB]: {
        // RGB -> RGB
        [spaces_1.ColorSpace.RGB]: color => new colors_1.Color(spaces_1.ColorSpace.RGB, [...color.data]),
        // RGB -> RGBA
        [spaces_1.ColorSpace.RGBA]: color => new colors_1.Color(spaces_1.ColorSpace.RGBA, [...color.data, 1]),
        // RGB -> HSL
        [spaces_1.ColorSpace.HSL]: color => {
            const [rScale, gScale, bScale] = spaces_1.getSpaceScales(color.space);
            let [r, g, b] = color.data;
            r /= rScale;
            g /= gScale;
            b /= bScale;
            const maxValue = max(r, g, b);
            const minValue = min(r, g, b);
            let h = 0;
            let s = 0;
            const l = (maxValue + minValue) / 2;
            if (maxValue !== minValue) {
                const d = maxValue - minValue;
                s = l > 0.5 ? d / (2 - maxValue - minValue) : d / (maxValue + minValue);
                switch (maxValue) {
                    case r:
                        h = (g - b) / d + (g < b ? 6 : 0);
                        break;
                    case g:
                        h = (b - r) / d + 2;
                        break;
                    case b:
                        h = (r - g) / d + 4;
                        break;
                }
                h /= 6;
            }
            const [hScale, sScale, lScale] = spaces_1.getSpaceScales(spaces_1.ColorSpace.HSL);
            return colors_1.Color.hsl(h * hScale, s * sScale, l * lScale);
        },
        // RGB -> HSLA
        [spaces_1.ColorSpace.HSLA]: color => new colors_1.Color(spaces_1.ColorSpace.HSLA, [...toSpace(color, spaces_1.ColorSpace.HSL).data, 1]),
    },
    // RGBA
    [spaces_1.ColorSpace.RGBA]: {
        // RGBA -> RGB
        [spaces_1.ColorSpace.RGB]: color => new colors_1.Color(spaces_1.ColorSpace.RGB, [...color.data.slice(0, 3)]),
        // RGBA -> RGBA
        [spaces_1.ColorSpace.RGBA]: color => new colors_1.Color(spaces_1.ColorSpace.RGBA, [...color.data]),
        // RGBA -> HSL
        [spaces_1.ColorSpace.HSL]: color => toSpace(toSpace(color, spaces_1.ColorSpace.RGB), spaces_1.ColorSpace.HSL),
        // RGBA -> HSLA
        [spaces_1.ColorSpace.HSLA]: color => new colors_1.Color(spaces_1.ColorSpace.HSLA, [...toSpace(color, spaces_1.ColorSpace.HSL).data, color.data[3]]),
    },
    [spaces_1.ColorSpace.HSL]: {
        // HSL -> RGB
        [spaces_1.ColorSpace.RGB]: color => {
            const [hScale, sScale, lScale] = spaces_1.getSpaceScales(color.space);
            let [h, s, l] = color.data;
            let r = 0;
            let g = 0;
            let b = 0;
            h /= hScale;
            s /= sScale;
            l /= lScale;
            if (s === 0.0) {
                r = l;
                g = l;
                b = l;
            }
            else {
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                r = getRgbFromHue(p, q, h + 1 / 3);
                g = getRgbFromHue(p, q, h);
                b = getRgbFromHue(p, q, h - 1 / 3);
            }
            const [rScale, gScale, bScale] = spaces_1.getSpaceScales(spaces_1.ColorSpace.RGB);
            return colors_1.Color.rgb(r * rScale, g * gScale, b * bScale);
        },
        // HSL -> RGBA
        [spaces_1.ColorSpace.RGBA]: color => new colors_1.Color(spaces_1.ColorSpace.RGBA, [...toSpace(color, spaces_1.ColorSpace.RGB).data, 1]),
        // HSL -> HSL
        [spaces_1.ColorSpace.HSL]: color => new colors_1.Color(spaces_1.ColorSpace.HSL, [...color.data]),
        // HSL -> HSLA
        [spaces_1.ColorSpace.HSLA]: color => new colors_1.Color(spaces_1.ColorSpace.HSLA, [...color.data, 1]),
    },
    // HSLA
    [spaces_1.ColorSpace.HSLA]: {
        // HSLA -> RGB
        [spaces_1.ColorSpace.RGB]: color => toSpace(toSpace(color, spaces_1.ColorSpace.HSL), spaces_1.ColorSpace.RGB),
        // HSLA -> RGBA
        [spaces_1.ColorSpace.RGBA]: color => new colors_1.Color(spaces_1.ColorSpace.RGBA, [...toSpace(color, spaces_1.ColorSpace.RGB).data, color.data[3]]),
        // HSLA -> HSL
        [spaces_1.ColorSpace.HSL]: color => new colors_1.Color(spaces_1.ColorSpace.HSL, [...color.data.slice(0, 3)]),
        // HSLA -> HSLA
        [spaces_1.ColorSpace.HSLA]: color => new colors_1.Color(spaces_1.ColorSpace.HSLA, [...color.data]),
    },
};
function toSpace(color, targetSpace) {
    if (color.space === targetSpace) {
        return color;
    }
    return exports.colorConverters[color.space][targetSpace](color);
}
exports.toSpace = toSpace;
function getRgbFromHue(p, q, t) {
    let nt = t;
    // Normalize
    if (nt < 0) {
        nt += 1;
    }
    else if (nt > 1) {
        nt -= 1;
    }
    if (nt < 1 / 6) {
        return p + (q - p) * 6 * nt;
    }
    if (nt < 1 / 2) {
        return q;
    }
    if (nt < 2 / 3) {
        return p + (q - p) * (2 / 3 - nt) * 6;
    }
    return p;
}
