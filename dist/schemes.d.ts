import { Color } from './colors';
export interface SchemeOptions {
    start?: number;
    step?: number;
}
export interface SchemeGenerationOptions extends SchemeOptions {
    length?: number;
}
export declare type SchemeGenerator = (color: Color, value: number) => Color;
export declare type Scheme<K extends string> = {
    [TKey in K]: Color;
};
export declare type LightShadeScheme = Scheme<'normal' | 'light' | 'lighter' | 'lightest'>;
export declare type DarkShadeScheme = Scheme<'normal' | 'dark' | 'darker' | 'darkest'>;
export declare type ShadeScheme = LightShadeScheme | DarkShadeScheme;
export declare function generateScheme(color: Color, generate: SchemeGenerator, options?: SchemeGenerationOptions): Generator<Color, void, unknown>;
export declare function createScheme<K extends string, T extends Scheme<K>>(color: Color, keys: readonly K[], generate: SchemeGenerator, options?: SchemeOptions): T;
export declare function createLightShadeScheme(color: Color, options?: SchemeOptions): LightShadeScheme;
export declare function createDarkShadeScheme(color: Color, options?: SchemeOptions): DarkShadeScheme;
export declare function createShadeScheme(color: Color, options?: SchemeOptions): ShadeScheme;
export declare function createComplementaryScheme(color: Color): Scheme<"primary" | "secondary">;
export declare function createAnalogousComplementaryScheme(color: Color): Scheme<"primary" | "secondary" | "tertiary">;
export declare function createSplitComplementaryScheme(color: Color): Scheme<"primary" | "secondary" | "tertiary">;
export declare function createTriadicComplementaryScheme(color: Color): Scheme<"primary" | "secondary" | "tertiary">;
export declare function createSquareComplementaryScheme(color: Color): Scheme<"primary" | "secondary" | "tertiary" | "quartenary">;
export declare function createTetradicComplementaryScheme(color: Color): Scheme<'primary' | 'secondary' | 'tertiary' | 'quartenary'>;
