import jestEach from 'jest-each';
import { Color, isSpace, isRgb, isHsla, isHsl } from '../src/colors';
import { ColorSpace } from '../src/spaces';
import { isRgba } from '../dist/colors';

describe('Color', () => {
    describe('toString', () => {
        jestEach`
            color                        | result
            ${'black'}                   | ${'#000'}
            ${'white'}                   | ${'#fff'}
            ${'rgb(0%, 50%, 100%)'}      | ${'#0080ff'}
            ${'rgba(0%, 50%, 100%, .5)'} | ${'rgba(0,128,255,0.5)'}
            ${'hsl(180, .5, .5)'}        | ${'#40bfbf'}
        `.it('should correctly convert $color to the string $result', ({ color, result }) => {
            expect(Color.parse(color).toString()).toBe(result);
        });
    });
});
describe('isSpace', () => {
    jestEach`
        color                           | space                     | result
        ${Color.rgb(255, 0, 0)}         | ${ColorSpace.RGB}         | ${true}
        ${Color.hsl(360, 1, 0.5)}       | ${ColorSpace.RGB}         | ${false}
        ${Color.rgba(255, 0, 0, 0.8)}   | ${ColorSpace.RGBA}        | ${true}
        ${Color.hsl(360, 1, 0.5)}       | ${ColorSpace.RGBA}        | ${false}
        ${Color.rgb(255, 0, 0)}         | ${ColorSpace.HSL}         | ${false}
        ${Color.hsl(360, 1, 0.5)}       | ${ColorSpace.HSL}         | ${true}
        ${Color.rgb(255, 0, 0)}         | ${ColorSpace.HSLA}        | ${false}
        ${Color.hsla(360, 1, 0.7, 0.5)} | ${ColorSpace.HSLA}        | ${true}
    `.it('should correctly check if $color is in the $space color space', ({ color, space, result }) => {
        expect(isSpace(color, space)).toBe(result);
    });
});
describe('isRgb', () => {
    jestEach`?
        color                           | result
        ${Color.rgb(255, 0, 0)}         | ${true}
        ${Color.hsl(360, 1, 0.5)}       | ${false}
        ${Color.rgba(255, 0, 0, 0.8)}   | ${false}
        ${Color.hsla(360, 1, 0.7, 0.5)} | ${false}
    `.it('should correctly check if $color is a RGB color', ({ color, result }) => {
        // isRgb(color) is the same as isSpace(color, ColorSpace.RGB)
        expect(isRgb(color)).toBe(result);

    });
});
describe('isRgba', () => {
    jestEach`
        color                             | result
        ${Color.rgb(255, 0, 0)}           | ${false}
        ${Color.hsl(360, 1, 0.5)}         | ${false}
        ${Color.rgba(255, 0, 0, 0.8)}     | ${true}
        ${Color.hsla(360, 1, 0.7, 0.5)}   | ${false}
    `.it('should correctly check if $color is a RGBA color', ({ color, result }) => {
        expect(isRgba(color)).toBe(result);
    });
});
describe('isHsl', () => {
    jestEach`
        color                             | result
        ${Color.rgb(255, 0, 0)}           | ${false}
        ${Color.hsl(360, 1, 0.5)}         | ${true}
        ${Color.rgba(255, 0, 0, 0.8)}     | ${false}
        ${Color.hsla(360, 1, 0.7, 0.5)}   | ${false}
    `.it('should correctly check if $color is a HSL color', ({ color, result }) => {
        expect(isHsl(color)).toBe(result);
    });
});
describe('isHsla', () => {
    jestEach`
        color                             | result
        ${Color.rgb(255, 0, 0)}           | ${false}
        ${Color.hsl(360, 1, 0.5)}         | ${false}
        ${Color.rgba(255, 0, 0, 0.8)}     | ${false}
        ${Color.hsla(360, 1, 0.7, 0.5)}   | ${true}
    `.it('should correctly check if $color is a HSLA color', ({ color, result }) => {
        expect(isHsla(color)).toBe(result);
    });
});
