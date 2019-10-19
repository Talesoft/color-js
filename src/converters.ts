import { Color } from './colors';
import { hsl, rgb, toSpace } from './functions';
import { ColorSpace, getColorSpaceScales } from './spaces';

const { min, max } = Math;

export type ColorConverter = (color: Color) => Color;
export type ColorConverterMap = { [KFrom in ColorSpace]: { [KTo in ColorSpace]: ColorConverter }; };

export const COLOR_CONVERTERS: ColorConverterMap = {
    // RGB
    [ColorSpace.RGB]: {
        // RGB -> RGB
        [ColorSpace.RGB]: color => new Color(ColorSpace.RGB, [...color.data]),
        // RGB -> RGBA
        [ColorSpace.RGBA]: color => new Color(ColorSpace.RGBA, [...color.data, 1]),
        // RGB -> HSL
        [ColorSpace.HSL]: color => {
            const [rScale, gScale, bScale] = getColorSpaceScales(color.space);
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
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }

                h /= 6;
            }

            const [hScale, sScale, lScale] = getColorSpaceScales(ColorSpace.HSL);
            return hsl(h * hScale, s * sScale, l * lScale);
        },
        // RGB -> HSLA
        [ColorSpace.HSLA]: color => new Color(ColorSpace.HSLA, [...toSpace(color, ColorSpace.HSL).data, 1]),
    },
    // RGBA
    [ColorSpace.RGBA]: {
        // RGBA -> RGB
        [ColorSpace.RGB]: color => new Color(ColorSpace.RGB, [...color.data.slice(0, 3)]),
        // RGBA -> RGBA
        [ColorSpace.RGBA]: color => new Color(ColorSpace.RGBA, [...color.data]),
        // RGBA -> HSL
        [ColorSpace.HSL]: color => toSpace(toSpace(color, ColorSpace.RGB), ColorSpace.HSL),
        // RGBA -> HSLA
        [ColorSpace.HSLA]: color => new Color(
            ColorSpace.HSLA,
            [...toSpace(color, ColorSpace.HSL).data, color.data[3]],
        ),
    },
    [ColorSpace.HSL]: {
        // HSL -> RGB
        [ColorSpace.RGB]: color => {
            const [hScale, sScale, lScale] = getColorSpaceScales(color.space);
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
            } else {
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;

                r = getRgbFromHue(p, q, h + 1 / 3);
                g = getRgbFromHue(p, q, h);
                b = getRgbFromHue(p, q, h - 1 / 3);
            }

            const [rScale, gScale, bScale] = getColorSpaceScales(ColorSpace.RGB);
            return rgb(r * rScale, g * gScale, b * bScale);
        },
        // HSL -> RGBA
        [ColorSpace.RGBA]: color => new Color(ColorSpace.RGBA, [...toSpace(color, ColorSpace.RGB).data, 1]),
        // HSL -> HSL
        [ColorSpace.HSL]: color => new Color(ColorSpace.HSL, [...color.data]),
        // HSL -> HSLA
        [ColorSpace.HSLA]: color => new Color(ColorSpace.HSLA, [...color.data, 1]),
    },
    // HSLA
    [ColorSpace.HSLA]: {
        // HSLA -> RGB
        [ColorSpace.RGB]: color => toSpace(toSpace(color, ColorSpace.HSL), ColorSpace.RGB),
        // HSLA -> RGBA
        [ColorSpace.RGBA]: color => new Color(
            ColorSpace.RGBA,
            [...toSpace(color, ColorSpace.RGB).data, color.data[3]],
        ),
        // HSLA -> HSL
        [ColorSpace.HSL]: color => new Color(ColorSpace.HSL, [...color.data.slice(0, 3)]),
        // HSLA -> HSLA
        [ColorSpace.HSLA]: color => new Color(ColorSpace.HSLA, [...color.data]),
    },
};

function getRgbFromHue(p: number, q: number, t: number) {
    let nt = t;
    // Normalize
    if (nt < 0) {
        nt += 1;
    } else if (nt > 1) {
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
