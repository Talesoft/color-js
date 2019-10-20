import jestEach from 'jest-each';
import { Color, createRgbaColor, createRgbColor } from '../src/colors';
import { toSpace } from '../src/functions';
import { ColorSpace } from '../src/spaces';

describe('COLOR_CONVERTERS', () => {
    describe('RGB', () => {
        describe('-> RGB', () => {
            it('should return a copy with the same values', () => {
                expect(Color.red.darken(.2).toString()).toBe('');
                const color = createRgbColor(0, 127, 255);
                const convertedColor = toSpace(color, ColorSpace.RGB);
                expect(color).toBe(convertedColor);
            });
        });

        describe('-> RGBA', () => {
            it('should return a copy with alpha set to 1', () => {
                const color = createRgbColor(0, 127, 255);
                const convertedColor = toSpace(color, ColorSpace.RGBA);
                expect(convertedColor).toEqual(createRgbaColor(0, 127, 255, 1));
            });
        });

        describe('-> HSL', () => {
            jestEach`
                rgb                  | hsl
                ${[0, 0, 0]}         | ${[0, 0, 0]}
                ${[127, 127, 127]}   | ${[0, 0, .498]}
                ${[255, 255, 255]}   | ${[0, 0, 1]}
                ${[127, 0, 0]}       | ${[0, 1, .249]}
                ${[0, 127, 0]}       | ${[120, 1, .249]}
                ${[0, 0, 127]}       | ${[240, 1, .249]}
                ${[255, 0, 0]}       | ${[0, 1, .5]}
                ${[0, 255, 0]}       | ${[120, 1, .5]}
                ${[0, 0, 255]}       | ${[240, 1, .5]}
            `.it('should correctly convert $rgb to $hsl', ({ rgb, hsl }) => {
                const color = new Color(ColorSpace.RGB, rgb);
                const convertedColor = toSpace(color, ColorSpace.HSL);
                expect(convertedColor.data[0]).toBeCloseTo(hsl[0], 3);
                expect(convertedColor.data[1]).toBeCloseTo(hsl[1], 3);
                expect(convertedColor.data[2]).toBeCloseTo(hsl[2], 3);
            });

            // TODO: RGB -> HSLA
        });
    });

    describe('HSL', () => {

        describe('-> RGB', () => {
            jestEach`
                hsl               | rgb
                ${[0, 0, 0]}      | ${[0, 0, 0]}
                ${[0, 0, .498]}   | ${[127, 127, 127]}
                ${[0, 0, 1]}      | ${[255, 255, 255]}
                ${[0, 1, .249]}   | ${[127, 0, 0]}
                ${[120, 1, .249]} | ${[0, 127, 0]}
                ${[240, 1, .249]} | ${[0, 0, 127]}
                ${[0, 1, .5]}     | ${[255, 0, 0]}
                ${[120, 1, .5]}   | ${[0, 255, 0]}
                ${[240, 1, .5]}   | ${[0, 0, 255]}
            `.it('should correctly convert $hsl to $rgb', ({ hsl, rgb }) => {
                const color = new Color(ColorSpace.HSL, hsl);
                const convertedColor = toSpace(color, ColorSpace.RGB);
                expect(convertedColor.data[0]).toBeCloseTo(rgb[0], 0);
                expect(convertedColor.data[1]).toBeCloseTo(rgb[1], 0);
                expect(convertedColor.data[2]).toBeCloseTo(rgb[2], 0);
            });

            // TODO: HSL -> RGBA
            // TODO: HSL -> HSL
            // TODO: HSL -> HSLA
        });
    });
});
