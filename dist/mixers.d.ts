import { Color } from './colors';
export declare enum MixMode {
    RGB_ADDITIVE = "rgbAdditive",
    RGB_SUBTRACTIVE = "rgbSubtractive",
    RGB_AVERAGE = "rgbAverage"
}
export declare function mixRgbAdditive(color: Color, mixColor: Color): Color;
export declare function mixRgbSubtractive(color: Color, mixColor: Color): Color;
export declare function mixRgbAverage(color: Color, mixColor: Color): Color;
export declare function mix(color: Color, mixColor: Color, mode?: MixMode): Color;
