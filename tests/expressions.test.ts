import jestEach from 'jest-each';
import { Color } from '../src/colors';
import { parseFunctionExpression, parseHexExpression } from '../src/expressions';

describe('parseColorFunctionExpression', () => {
    jestEach`
        value                        | result
        ${'rgb(0,0,0)'}              | ${Color.rgb(0, 0, 0)}
        ${'rgb(25%, 127 ,75%)'}      | ${Color.rgb(64, 127, 191)}
        ${'hsla(50%, 0.1, 25%, .4)'} | ${Color.hsla(180, .1, .25, .4)}
    `.it('should correctly convert $value to a color', ({ value, result }) => {
        expect(parseFunctionExpression(value)).toEqual(result);
    });
});

describe('parseColorHexExpression', () => {
    jestEach`
        value                | result
        ${'#000'}            | ${Color.rgb(0, 0, 0)}
        ${'#000000'}         | ${Color.rgb(0, 0, 0)}
        ${'#fff'}            | ${Color.rgb(255, 255, 255)}
        ${'#FfFfFf'}         | ${Color.rgb(255, 255, 255)}
    `.it('should correctly convert $value to a color', ({ value, result }) => {
        expect(parseHexExpression(value)).toEqual(result);
    });
});
