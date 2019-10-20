"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("./colors");
function* generateScheme(color, generate, options) {
    const { start, step, length } = Object.assign({ start: 0, step: .1, length: 5 }, options);
    for (let i = 0; i < length; i += 1) {
        yield generate(color, start + i * step);
    }
}
exports.generateScheme = generateScheme;
function createScheme(color, keys, generate, options) {
    const genOptions = Object.assign(Object.assign({}, options), { length: keys.length });
    const result = {};
    let i = 0;
    for (const genColor of generateScheme(color, generate, genOptions)) {
        result[keys[i]] = genColor;
        i += 1;
    }
    return result;
}
exports.createScheme = createScheme;
function createLightShadeScheme(color, options) {
    return createScheme(color, ['normal', 'light', 'lighter', 'lightest'], colors_1.lighten, options);
}
exports.createLightShadeScheme = createLightShadeScheme;
function createDarkShadeScheme(color, options) {
    return createScheme(color, ['normal', 'dark', 'darker', 'darkest'], colors_1.lighten, options);
}
exports.createDarkShadeScheme = createDarkShadeScheme;
function createShadeScheme(color, options) {
    return Object.assign(Object.assign({}, createLightShadeScheme(color, options)), createDarkShadeScheme(color, options));
}
exports.createShadeScheme = createShadeScheme;
function createComplementaryScheme(color) {
    // TODO: Use HSL scales for 180
    return createScheme(color, ['primary', 'secondary'], colors_1.complement, { step: 180 });
}
exports.createComplementaryScheme = createComplementaryScheme;
function createAnalogousComplementaryScheme(color) {
    // TODO: Use HSL scales for -30 and 30
    return createScheme(color, ['tertiary', 'primary', 'secondary'], colors_1.complement, { start: -30, step: 30 });
}
exports.createAnalogousComplementaryScheme = createAnalogousComplementaryScheme;
function createSplitComplementaryScheme(color) {
    // TODO: Use HSL scales for -150 and 150
    return createScheme(color, ['tertiary', 'primary', 'secondary'], colors_1.complement, { start: -150, step: 150 });
}
exports.createSplitComplementaryScheme = createSplitComplementaryScheme;
function createTriadicComplementaryScheme(color) {
    // TODO: Use HSL scales for -120 and 120
    return createScheme(color, ['tertiary', 'primary', 'secondary'], colors_1.complement, { start: -120, step: 120 });
}
exports.createTriadicComplementaryScheme = createTriadicComplementaryScheme;
function createSquareComplementaryScheme(color) {
    // TODO: Use HSL scales for 90
    return createScheme(color, ['primary', 'secondary', 'tertiary', 'quartenary'], colors_1.complement, { step: 90 });
}
exports.createSquareComplementaryScheme = createSquareComplementaryScheme;
function createTetradicComplementaryScheme(color) {
    // TODO: Use HSL scales
    return {
        primary: color,
        secondary: colors_1.complement(color, 120),
        tertiary: colors_1.complement(color, 180),
        quartenary: colors_1.complement(color, -60),
    };
}
exports.createTetradicComplementaryScheme = createTetradicComplementaryScheme;
