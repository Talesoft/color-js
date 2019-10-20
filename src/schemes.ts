import { Color, complement, lighten } from './colors';

export interface SchemeOptions {
    start?: number;
    step?: number;
}

export interface SchemeGenerationOptions extends SchemeOptions {
    length?: number;
}

export type SchemeGenerator = (color: Color, value: number) => Color;
export type Scheme<K extends string> = { [TKey in K]: Color; };
export type LightShadeScheme = Scheme<'normal' | 'light' | 'lighter' | 'lightest'>;
export type DarkShadeScheme = Scheme<'normal' | 'dark' | 'darker' | 'darkest'>;
export type ShadeScheme = LightShadeScheme | DarkShadeScheme;

export function *generateScheme(color: Color, generate: SchemeGenerator, options?: SchemeGenerationOptions) {
    const { start, step, length } = { start: 0, step: .1, length: 5, ...options };
    for (let i = 0; i < length; i += 1) {
        yield generate(color, start + i * step);
    }
}

export function createScheme<K extends string, T extends Scheme<K>>(
    color: Color,
    keys: K[],
    generate: SchemeGenerator,
    options?: SchemeOptions,
): T {
    const genOptions = { ...options, length: keys.length };
    const result: any = {};
    let i = 0;
    for (const genColor of generateScheme(color, generate, genOptions)) {
        result[keys[i]] = genColor;
        i += 1;
    }
    return result as T;
}

export function createLightShadeScheme(color: Color, options?: SchemeOptions): LightShadeScheme {
    return createScheme(color, ['normal', 'light', 'lighter', 'lightest'], lighten, options);
}

export function createDarkShadeScheme(color: Color, options?: SchemeOptions): DarkShadeScheme {
    return createScheme(color, ['normal', 'dark', 'darker', 'darkest'], lighten, options);
}

export function createShadeScheme(color: Color, options?: SchemeOptions): ShadeScheme {
    return {
        ...createLightShadeScheme(color, options),
        ...createDarkShadeScheme(color, options),
    };
}

export function createComplementaryScheme(color: Color) {
     // TODO: Use HSL scales for 180
    return createScheme(color, ['primary', 'secondary'], complement, { step: 180 });
}

export function createAnalogousComplementaryScheme(color: Color) {
     // TODO: Use HSL scales for -30 and 30
    return createScheme(color, ['tertiary', 'primary', 'secondary'], complement, { start: -30, step: 30 });
}

export function createSplitComplementaryScheme(color: Color) {
    // TODO: Use HSL scales for -150 and 150
   return createScheme(color, ['tertiary', 'primary', 'secondary'], complement, { start: -150, step: 150 });
}

export function createTriadicComplementaryScheme(color: Color) {
    // TODO: Use HSL scales for -120 and 120
   return createScheme(color, ['tertiary', 'primary', 'secondary'], complement, { start: -120, step: 120 });
}

export function createSquareComplementaryScheme(color: Color) {
    // TODO: Use HSL scales for 90
   return createScheme(color, ['primary', 'secondary', 'tertiary', 'quartenary'], complement, { step: 90 });
}

export function createTetradicComplementaryScheme(color: Color): Scheme<'primary' | 'secondary' | 'tertiary' | 'quartenary'> {
    // TODO: Use HSL scales
    return {
        primary: color,
        secondary: complement(color, 120),
        tertiary: complement(color, 180),
        quartenary: complement(color, -60),
    };
}
