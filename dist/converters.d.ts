import { Color } from './colors';
import { ColorSpace } from './spaces';
export declare type ColorConverter = (color: Color) => Color;
export declare type ColorConverterMap = {
    [KFrom in ColorSpace]: {
        [KTo in ColorSpace]: ColorConverter;
    };
};
export declare const colorConverters: ColorConverterMap;
export declare function toSpace(color: Color, targetSpace: ColorSpace): Color;
