/**
 * The color spaces this library supports.
 */
export declare enum ColorSpace {
    RGB = "rgb",
    RGBA = "rgba",
    HSL = "hsl",
    HSLA = "hsla"
}
/**
 * The unit of color values in color function expressions.
 */
export declare enum ColorUnit {
    FIXED = "",
    PERCENT = "%"
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
export declare const COLOR_SPACES: {
    [K in ColorSpace]?: ColorSpaceMetadata;
};
/**
 * Returns all metadata of the given color space.
 *
 * @param space A color space.
 */
export declare function getSpaceMetadata(space: ColorSpace): ColorSpaceMetadata;
/**
 * Returns the amount of color channels in a color space.
 *
 * @param space A color space.
 */
export declare function getSpaceChannelCount(space: ColorSpace): number;
/**
 * Returns the value scales of a color space as an array.
 *
 * @param space A color space.
 */
export declare function getSpaceScales(space: ColorSpace): number[];
/**
 * Returns the value units of a color space as an array.
 *
 * @param space A color space.
 */
export declare function getSpaceUnits(space: ColorSpace): ColorUnit[];
