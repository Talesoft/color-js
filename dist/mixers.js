"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("./colors");
const spaces_1 = require("./spaces");
const { min } = Math;
var MixMode;
(function (MixMode) {
    MixMode["RGB_ADDITIVE"] = "rgbAdditive";
    MixMode["RGB_SUBTRACTIVE"] = "rgbSubtractive";
    MixMode["RGB_AVERAGE"] = "rgbAverage";
})(MixMode = exports.MixMode || (exports.MixMode = {}));
function mixRgbAdditive(color, mixColor) {
    const [r, g, b, a = 1] = colors_1.toAnyRgb(color).data;
    const [mixR, mixG, mixB, mixA = 1] = colors_1.toAnyRgb(mixColor).data;
    const [rScale, gScale, bScale, aScale] = spaces_1.getSpaceScales(spaces_1.ColorSpace.RGBA);
    const mixedR = min(rScale, r + mixR);
    const mixedG = min(gScale, g + mixG);
    const mixedB = min(bScale, b + mixB);
    const mixedA = min(aScale, (a + mixA) / 2);
    return mixedA < 1 ? colors_1.Color.rgba(mixedR, mixedG, mixedB, mixedA) : colors_1.Color.rgb(mixedR, mixedG, mixedB);
}
exports.mixRgbAdditive = mixRgbAdditive;
function mixRgbSubtractive(color, mixColor) {
    const [r, g, b, a = 1] = colors_1.toAnyRgb(color).data;
    const [mixR, mixG, mixB, mixA = 1] = colors_1.toAnyRgb(mixColor).data;
    const [rScale, gScale, bScale, aScale] = spaces_1.getSpaceScales(spaces_1.ColorSpace.RGBA);
    const mixedR = min(rScale, r * mixR / rScale);
    const mixedG = min(gScale, g * mixG / gScale);
    const mixedB = min(bScale, b * mixB / bScale);
    const mixedA = min(aScale, (a + mixA) / 2);
    return mixedA < 1 ? colors_1.Color.rgba(mixedR, mixedG, mixedB, mixedA) : colors_1.Color.rgb(mixedR, mixedG, mixedB);
}
exports.mixRgbSubtractive = mixRgbSubtractive;
function mixRgbAverage(color, mixColor) {
    const [r, g, b, a = 1] = colors_1.toAnyRgb(color).data;
    const [mixR, mixG, mixB, mixA = 1] = colors_1.toAnyRgb(mixColor).data;
    const [rScale, gScale, bScale, aScale] = spaces_1.getSpaceScales(spaces_1.ColorSpace.RGBA);
    const mixedR = min(rScale, (r + mixR) / 2);
    const mixedG = min(gScale, (g + mixG) / 2);
    const mixedB = min(bScale, (b + mixB) / 2);
    const mixedA = min(aScale, (a + mixA) / 2);
    return mixedA < 1 ? colors_1.Color.rgba(mixedR, mixedG, mixedB, mixedA) : colors_1.Color.rgb(mixedR, mixedG, mixedB);
}
exports.mixRgbAverage = mixRgbAverage;
function mix(color, mixColor, mode = MixMode.RGB_SUBTRACTIVE) {
    switch (mode) {
        case MixMode.RGB_ADDITIVE: return mixRgbAdditive(color, mixColor);
        case MixMode.RGB_SUBTRACTIVE: return mixRgbSubtractive(color, mixColor);
        case MixMode.RGB_AVERAGE: return mixRgbAverage(color, mixColor);
    }
    throw new Error(`Unknown mix mode ${mode} given`);
}
exports.mix = mix;
