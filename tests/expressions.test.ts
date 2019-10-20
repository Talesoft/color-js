import jestEach from 'jest-each';
import { createHslaColor, createRgbColor } from '../src/colors';
import { parseFunctionExpression, parseHexExpression } from '../src/expressions';

describe('expressions', () => {
    describe('parseColorFunctionExpression', () => {
        jestEach`
            value                   | result
            ${'rgb(0,0,0)'}         | ${createRgbColor(0, 0, 0)}
            ${'rgb(25%, 127 ,75%)'} | ${createRgbColor(64, 127, 191)}
            ${'hsla(50%, 0.1, 25%, .4)'} | ${createHslaColor(180, .1, .25, .4)}
        `.it('should correctly convert $value to a color', ({ value, result }) => {
            expect(parseFunctionExpression(value)).toEqual(result);
        });
    });

    describe('parseColorHexExpression', () => {
        jestEach`
            value                   | result
            ${'#000'}         | ${createRgbColor(0, 0, 0)}
            ${'#000000'}         | ${createRgbColor(0, 0, 0)}
            ${'#fff'}         | ${createRgbColor(255, 255, 255)}
            ${'#FfFfFf'}         | ${createRgbColor(255, 255, 255)}
        `.it('should correctly convert $value to a color', ({ value, result }) => {
            expect(parseHexExpression(value)).toEqual(result);
        });
    });
});
