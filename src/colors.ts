import { toFunctionExpression, toHexExpression } from './expressions';
import {
    darken, fadeIn, fadeOut, getBlue, getGreen,
    getHue, getLightness, getOpacity, getRed, getSaturation,
    grayscale, invert, lighten, tint, tone, toString,
    withBlue, withGreen, withHue, withLightness,
    withOpacity, withRed, withSaturation,
} from './functions';
import { ColorSpace } from './spaces';

/**
 * ColorInfo acts as a small wrapper around the basic information of a color.
 *
 * It will store the space the color is currently in and the channel values
 * for that color space.
 *
 * <sample>
 *     For a RGB color it will look like `ColorInfo { space: ColorSpace.RGB, data: [r, g, b] }`
 * </sample>
 * <sample>
 *     For a HSLA color it will look like `ColorInfo { space: ColorSpace.HSLA, data: [h, s, l, a] }`
 * </sample>
 */
export class Color {
    public readonly space: ColorSpace;
    public readonly data: ReadonlyArray<number>;

    constructor(space: ColorSpace, data: ReadonlyArray<number>) {
        this.space = space;
        this.data = data;
    }

    get red() {
        return getRed(this);
    }

    public withRed(value: number) {
        return withRed(this, value);
    }

    public getGreen() {
        return getGreen(this);
    }

    public withGreen(value: number) {
        return withGreen(this, value);
    }

    public getBlue() {
        return getBlue(this);
    }

    public withBlue(value: number) {
        return withBlue(this, value);
    }

    public getHue() {
        return getHue(this);
    }

    public withHue(value: number) {
        return withHue(this, value);
    }

    public getSaturation() {
        return getSaturation(this);
    }

    public withSaturation(value: number) {
        return withSaturation(this, value);
    }

    public getLightness() {
        return getLightness(this);
    }

    public withLightness(value: number) {
        return withLightness(this, value);
    }

    public getOpacity(color: Color) {
        return getOpacity(color);
    }

    public withOpacity(value: number) {
        return withOpacity(this, value);
    }

    public invert() {
        return invert(this);
    }

    public lighten(value: number) {
        return lighten(this, value);
    }

    public darken(value: number) {
        return darken(this, value);
    }

    public tint(value: number) {
        return tint(this, value);
    }

    public tone(value: number) {
        return tone(this, value);
    }

    public grayscale() {
        return grayscale(this);
    }

    public fadeIn(value: number) {
        return fadeIn(this, value);
    }

    public fadeOut(value: number) {
        return fadeOut(this, value);
    }

    public toFunctionExpression() {
        return toFunctionExpression(this);
    }

    public toHexExpression() {
        return toHexExpression(this);
    }

    public toString() {
        return toString(this);
    }
}
