import jestEach from 'jest-each';
import { Color } from '../src/colors';

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
            expect(Color.parse(color).toString()).toEqual(result);
        });
    });
});
