"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The color spaces this library supports.
 */
var ColorSpace;
(function (ColorSpace) {
    ColorSpace["RGB"] = "rgb";
    ColorSpace["RGBA"] = "rgba";
    ColorSpace["HSL"] = "hsl";
    ColorSpace["HSLA"] = "hsla";
    // HSV = 'hsv',
    // HSVA = 'hsva',
    // CMYK = 'cmyk',
    // XYZ = 'xyz',
    // LAB = 'lab',
})(ColorSpace = exports.ColorSpace || (exports.ColorSpace = {}));
/**
 * The unit of color values in color function expressions.
 */
var ColorUnit;
(function (ColorUnit) {
    ColorUnit["FIXED"] = "";
    ColorUnit["PERCENT"] = "%";
})(ColorUnit = exports.ColorUnit || (exports.ColorUnit = {}));
/**
 * Metadata that is stored for each color space.
 *
 * It contains information about each specific color channel of the space.
 *
 * @see ColorSpace
 * @see ColorSpaceMetadata
 */
exports.COLOR_SPACES = {
    [ColorSpace.RGB]: {
        channels: [
            { scale: 255, type: 'int', unit: ColorUnit.FIXED },
            { scale: 255, type: 'int', unit: ColorUnit.FIXED },
            { scale: 255, type: 'int', unit: ColorUnit.FIXED },
        ],
    },
    [ColorSpace.RGBA]: {
        channels: [
            { scale: 255, type: 'int', unit: ColorUnit.FIXED },
            { scale: 255, type: 'int', unit: ColorUnit.FIXED },
            { scale: 255, type: 'int', unit: ColorUnit.FIXED },
            { scale: 1, type: 'float', unit: ColorUnit.FIXED },
        ],
    },
    [ColorSpace.HSL]: {
        channels: [
            { scale: 360, type: 'float', unit: ColorUnit.FIXED },
            { scale: 1, type: 'float', unit: ColorUnit.PERCENT },
            { scale: 1, type: 'float', unit: ColorUnit.PERCENT },
        ],
    },
    [ColorSpace.HSLA]: {
        channels: [
            { scale: 360, type: 'float', unit: ColorUnit.FIXED },
            { scale: 1, type: 'float', unit: ColorUnit.PERCENT },
            { scale: 1, type: 'float', unit: ColorUnit.PERCENT },
            { scale: 1, type: 'float', unit: ColorUnit.FIXED },
        ],
    },
};
/**
 * Returns all metadata of the given color space.
 *
 * @param space A color space.
 */
function getSpaceMetadata(space) {
    const metadata = exports.COLOR_SPACES[space];
    if (!metadata) {
        throw new Error(`Color space ${space} has no defined metadata`);
    }
    return metadata;
}
exports.getSpaceMetadata = getSpaceMetadata;
/**
 * Returns the amount of color channels in a color space.
 *
 * @param space A color space.
 */
function getSpaceChannelCount(space) {
    return getSpaceMetadata(space).channels.length;
}
exports.getSpaceChannelCount = getSpaceChannelCount;
/**
 * Returns the value scales of a color space as an array.
 *
 * @param space A color space.
 */
function getSpaceScales(space) {
    return getSpaceMetadata(space).channels.map(c => c.scale);
}
exports.getSpaceScales = getSpaceScales;
/**
 * Returns the value units of a color space as an array.
 *
 * @param space A color space.
 */
function getSpaceUnits(space) {
    return getSpaceMetadata(space).channels.map(c => c.unit);
}
exports.getSpaceUnits = getSpaceUnits;
