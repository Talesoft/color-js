
/**
 * The color spaces this library supports.
 */
export enum ColorSpace {
    RGB = 'rgb',
    RGBA = 'rgba',
    HSL = 'hsl',
    HSLA = 'hsla',
    // HSV = 'hsv',
    // HSVA = 'hsva',
    // CMYK = 'cmyk',
    // XYZ = 'xyz',
    // LAB = 'lab',
}

/**
 * The unit of color values in color function expressions.
 */
export enum ColorUnit {
    FIXED = '',
    PERCENT = '%',
}

/**
 * The interface for color space metadata
 *
 * @see COLOR_SPACES
 */
export interface ColorSpaceMetadata {
    /**
     * The color channels of a color space.
     */
    channels: Array<{
        /**
         * The scale we apply before and after calculations.
         *
         * This allows us to modify colors with human-readable, reasonable numeric values.
         *
         * <sample>
         *     Red in RGB is not stored as a number between 0-1, but 0-255. The scale is 255.
         * </sample>
         * <sample>
         *     Hue in HSL is not stored as a number between 0-1, but 0-360. The scale is 360.
         * </sample>
         */
        scale: number;

        /**
         * The type values of this channel get casted to.
         */
        type: 'int' | 'float';

        /**
         * The unit a value is output in by this library.
         *
         * This is primarily used in color function expressions
         * (e.g. CSS expects saturation and lightness in hsl() expressions to be % values)
         */
        unit: ColorUnit;
    }>;
}

/**
 * Metadata that is stored for each color space.
 *
 * It contains information about each specific color channel of the space.
 *
 * @see ColorSpace
 * @see ColorSpaceMetadata
 */
export const COLOR_SPACES: { [K in ColorSpace]?: ColorSpaceMetadata } = {
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
export function getColorSpaceMetadata(space: ColorSpace) {
    const metadata = COLOR_SPACES[space];
    if (!metadata) {
        throw new Error(`Color space ${space} has no defined metadata`);
    }
    return metadata;
}

/**
 * Returns the amount of color channels in a color space.
 *
 * @param space A color space.
 */
export function getColorSpaceChannelCount(space: ColorSpace) {
    return getColorSpaceMetadata(space).channels.length;
}

/**
 * Returns the value scales of a color space as an array.
 *
 * @param space A color space.
 */
export function getColorSpaceScales(space: ColorSpace) {
    return getColorSpaceMetadata(space).channels.map(c => c.scale);
}

/**
 * Returns the value units of a color space as an array.
 *
 * @param space A color space.
 */
export function getColorSpaceUnits(space: ColorSpace) {
    return getColorSpaceMetadata(space).channels.map(c => c.unit);
}