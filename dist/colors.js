"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const converters_1 = require("./converters");
const expressions_1 = require("./expressions");
const mixers_1 = require("./mixers");
const schemes_1 = require("./schemes");
const spaces_1 = require("./spaces");
/**
 * Color contains basic information of a color.
 *
 * It will store the space the color is currently in and the channel values
 * for that color space.
 *
 * Examples:
 * - For a RGB color it will look like
 *   ```
 *   Color {
 *       space: ColorSpace.RGB,
 *       data: [r, g, b],
 *   }
 *   ```
 * - For a HSLA color it will look like
 *   ```
 *   Color {
 *       space: ColorSpace.HSLA,
 *       data: [h, s, l, a],
 *   }
 *   ```
 */
class Color {
    constructor(space, data) {
        this.space = space;
        this.data = data;
    }
    get red() {
        return getRed(this);
    }
    get green() {
        return getGreen(this);
    }
    get blue() {
        return getBlue(this);
    }
    get hue() {
        return getHue(this);
    }
    get saturation() {
        return getSaturation(this);
    }
    get lightness() {
        return getLightness(this);
    }
    get opacity() {
        return getOpacity(this);
    }
    get lightShades() {
        return this.createLightShades();
    }
    get darkShades() {
        return this.createDarkShades();
    }
    get shades() {
        return this.createShades();
    }
    get complements() {
        return schemes_1.createComplementaryScheme(this);
    }
    get analogousComplements() {
        return schemes_1.createAnalogousComplementaryScheme(this);
    }
    get splitComplements() {
        return schemes_1.createSplitComplementaryScheme(this);
    }
    get triadicComplements() {
        return schemes_1.createTriadicComplementaryScheme(this);
    }
    get squareComplements() {
        return schemes_1.createSquareComplementaryScheme(this);
    }
    get tetradicComplements() {
        return schemes_1.createTetradicComplementaryScheme(this);
    }
    isSpace(space) {
        return isSpace(this, space);
    }
    isRgb() {
        return isRgb(this);
    }
    isRgba() {
        return isRgba(this);
    }
    isAnyRgb() {
        return isAnyRgb(this);
    }
    isHsl() {
        return isHsl(this);
    }
    isHsla() {
        return isHsla(this);
    }
    isAnyHsl() {
        return isAnyHsl(this);
    }
    isAlpha() {
        return isAlpha(this);
    }
    toRgb() {
        return toRgb(this);
    }
    toRgba() {
        return toRgba(this);
    }
    toAnyRgb() {
        return toAnyRgb(this);
    }
    toHsl() {
        return toHsl(this);
    }
    toHsla() {
        return toHsla(this);
    }
    toAnyHsl() {
        return toAnyHsl(this);
    }
    toAnyAlpha() {
        return toAnyAlpha(this);
    }
    toAnyOpaque() {
        return toAnyOpaque(this);
    }
    withRed(value) {
        return withRed(this, value);
    }
    withGreen(value) {
        return withGreen(this, value);
    }
    withBlue(value) {
        return withBlue(this, value);
    }
    withHue(value) {
        return withHue(this, value);
    }
    withSaturation(value) {
        return withSaturation(this, value);
    }
    withLightness(value) {
        return withLightness(this, value);
    }
    withOpacity(value) {
        return withOpacity(this, value);
    }
    invert() {
        return invert(this);
    }
    grayscale() {
        return grayscale(this);
    }
    complement(value = 180) {
        return complement(this, value);
    }
    mix(color, mode = mixers_1.MixMode.RGB_SUBTRACTIVE) {
        return mixers_1.mix(this, color, mode);
    }
    lighten(value) {
        return lighten(this, value);
    }
    darken(value) {
        return darken(this, value);
    }
    tint(value) {
        return tint(this, value);
    }
    tone(value) {
        return tone(this, value);
    }
    fadeIn(value) {
        return fadeIn(this, value);
    }
    fadeOut(value) {
        return fadeOut(this, value);
    }
    createScheme(keys, generate, options) {
        return schemes_1.createScheme(this, keys, generate, options);
    }
    createLightShades(options) {
        return schemes_1.createLightShadeScheme(this, options);
    }
    createDarkShades(options) {
        return schemes_1.createDarkShadeScheme(this, options);
    }
    createShades(options) {
        return schemes_1.createShadeScheme(this, options);
    }
    toFunctionExpression() {
        return expressions_1.toFunctionExpression(this);
    }
    toHexExpression() {
        return expressions_1.toHexExpression(this);
    }
    toString() {
        return toString(this);
    }
    static create(space, data) {
        return new Color(space, data);
    }
    static rgb(r, g, b) {
        return Color.create(spaces_1.ColorSpace.RGB, [r, g, b]);
    }
    static rgba(r, g, b, a) {
        return Color.create(spaces_1.ColorSpace.RGBA, [r, g, b, a]);
    }
    static hsl(h, s, l) {
        return Color.create(spaces_1.ColorSpace.HSL, [h, s, l]);
    }
    static hsla(h, s, l, a) {
        return Color.create(spaces_1.ColorSpace.HSLA, [h, s, l, a]);
    }
    static parse(value) {
        if (value in Color && Color[value] instanceof Color) {
            return Color[value];
        }
        if (value.startsWith('#')) {
            return expressions_1.parseHexExpression(value);
        }
        return expressions_1.parseFunctionExpression(value);
    }
}
exports.Color = Color;
Color.airForceBlueRaf = Color.rgb(93, 138, 168);
Color.airForceBlueUsaf = Color.rgb(0, 48, 143);
Color.airSuperiorityBlue = Color.rgb(114, 160, 193);
Color.alabamaCrimson = Color.rgb(163, 38, 56);
Color.aliceBlue = Color.rgb(240, 248, 255);
Color.alizarinCrimson = Color.rgb(227, 38, 54);
Color.alloyOrange = Color.rgb(196, 98, 16);
Color.almond = Color.rgb(239, 222, 205);
Color.amaranth = Color.rgb(229, 43, 80);
Color.amber = Color.rgb(255, 191, 0);
Color.amberSaeEce = Color.rgb(255, 126, 0);
Color.americanRose = Color.rgb(255, 3, 62);
Color.amethyst = Color.rgb(153, 102, 204);
Color.androidGreen = Color.rgb(164, 198, 57);
Color.antiFlashWhite = Color.rgb(242, 243, 244);
Color.antiqueBrass = Color.rgb(205, 149, 117);
Color.antiqueFuchsia = Color.rgb(145, 92, 131);
Color.antiqueRuby = Color.rgb(132, 27, 45);
Color.antiqueWhite = Color.rgb(250, 235, 215);
Color.aoEnglish = Color.rgb(0, 128, 0);
Color.appleGreen = Color.rgb(141, 182, 0);
Color.apricot = Color.rgb(251, 206, 177);
Color.aqua = Color.rgb(0, 255, 255);
Color.aquamarine = Color.rgb(127, 255, 212);
Color.armyGreen = Color.rgb(75, 83, 32);
Color.arsenic = Color.rgb(59, 68, 75);
Color.arylideYellow = Color.rgb(233, 214, 107);
Color.ashGrey = Color.rgb(178, 190, 181);
Color.asparagus = Color.rgb(135, 169, 107);
Color.atomicTangerine = Color.rgb(255, 153, 102);
Color.auburn = Color.rgb(165, 42, 42);
Color.aureolin = Color.rgb(253, 238, 0);
Color.aurometalsaurus = Color.rgb(110, 127, 128);
Color.avocado = Color.rgb(86, 130, 3);
Color.azure = Color.rgb(0, 127, 255);
Color.azureMistWeb = Color.rgb(240, 255, 255);
Color.babyBlue = Color.rgb(137, 207, 240);
Color.babyBlueEyes = Color.rgb(161, 202, 241);
Color.babyPink = Color.rgb(244, 194, 194);
Color.ballBlue = Color.rgb(33, 171, 205);
Color.bananaMania = Color.rgb(250, 231, 181);
Color.bananaYellow = Color.rgb(255, 225, 53);
Color.barnRed = Color.rgb(124, 10, 2);
Color.battleshipGrey = Color.rgb(132, 132, 130);
Color.bazaar = Color.rgb(152, 119, 123);
Color.beauBlue = Color.rgb(188, 212, 230);
Color.beaver = Color.rgb(159, 129, 112);
Color.beige = Color.rgb(245, 245, 220);
Color.bigDipORuby = Color.rgb(156, 37, 66);
Color.bisque = Color.rgb(255, 228, 196);
Color.bistre = Color.rgb(61, 43, 31);
Color.bittersweet = Color.rgb(254, 111, 94);
Color.bittersweetShimmer = Color.rgb(191, 79, 81);
Color.black = Color.rgb(0, 0, 0);
Color.blackBean = Color.rgb(61, 12, 2);
Color.blackLeatherJacket = Color.rgb(37, 53, 41);
Color.blackOlive = Color.rgb(59, 60, 54);
Color.blanchedAlmond = Color.rgb(255, 235, 205);
Color.blastOffBronze = Color.rgb(165, 113, 100);
Color.bleuDeFrance = Color.rgb(49, 140, 231);
Color.blizzardBlue = Color.rgb(172, 229, 238);
Color.blond = Color.rgb(250, 240, 190);
Color.blue = Color.rgb(0, 0, 255);
Color.blueBell = Color.rgb(162, 162, 208);
Color.blueCrayola = Color.rgb(31, 117, 254);
Color.blueGray = Color.rgb(102, 153, 204);
Color.blueGreen = Color.rgb(13, 152, 186);
Color.blueMunsell = Color.rgb(0, 147, 175);
Color.blueNcs = Color.rgb(0, 135, 189);
Color.bluePigment = Color.rgb(51, 51, 153);
Color.blueRyb = Color.rgb(2, 71, 254);
Color.blueSapphire = Color.rgb(18, 97, 128);
Color.blueViolet = Color.rgb(138, 43, 226);
Color.blush = Color.rgb(222, 93, 131);
Color.bole = Color.rgb(121, 68, 59);
Color.bondiBlue = Color.rgb(0, 149, 182);
Color.bone = Color.rgb(227, 218, 201);
Color.bostonUniversityRed = Color.rgb(204, 0, 0);
Color.bottleGreen = Color.rgb(0, 106, 78);
Color.boysenberry = Color.rgb(135, 50, 96);
Color.brandeisBlue = Color.rgb(0, 112, 255);
Color.brass = Color.rgb(181, 166, 66);
Color.brickRed = Color.rgb(203, 65, 84);
Color.brightCerulean = Color.rgb(29, 172, 214);
Color.brightGreen = Color.rgb(102, 255, 0);
Color.brightLavender = Color.rgb(191, 148, 228);
Color.brightMaroon = Color.rgb(195, 33, 72);
Color.brightPink = Color.rgb(255, 0, 127);
Color.brightTurquoise = Color.rgb(8, 232, 222);
Color.brightUbe = Color.rgb(209, 159, 232);
Color.brilliantLavender = Color.rgb(244, 187, 255);
Color.brilliantRose = Color.rgb(255, 85, 163);
Color.brinkPink = Color.rgb(251, 96, 127);
Color.britishRacingGreen = Color.rgb(0, 66, 37);
Color.bronze = Color.rgb(205, 127, 50);
Color.brownTraditional = Color.rgb(150, 75, 0);
Color.brownWeb = Color.rgb(165, 42, 42);
Color.bubbleGum = Color.rgb(255, 193, 204);
Color.bubbles = Color.rgb(231, 254, 255);
Color.buff = Color.rgb(240, 220, 130);
Color.bulgarianRose = Color.rgb(72, 6, 7);
Color.burgundy = Color.rgb(128, 0, 32);
Color.burlywood = Color.rgb(222, 184, 135);
Color.burntOrange = Color.rgb(204, 85, 0);
Color.burntSienna = Color.rgb(233, 116, 81);
Color.burntUmber = Color.rgb(138, 51, 36);
Color.byzantine = Color.rgb(189, 51, 164);
Color.byzantium = Color.rgb(112, 41, 99);
Color.cadet = Color.rgb(83, 104, 114);
Color.cadetBlue = Color.rgb(95, 158, 160);
Color.cadetGrey = Color.rgb(145, 163, 176);
Color.cadmiumGreen = Color.rgb(0, 107, 60);
Color.cadmiumOrange = Color.rgb(237, 135, 45);
Color.cadmiumRed = Color.rgb(227, 0, 34);
Color.cadmiumYellow = Color.rgb(255, 246, 0);
Color.cafAuLait = Color.rgb(166, 123, 91);
Color.cafNoir = Color.rgb(75, 54, 33);
Color.calPolyGreen = Color.rgb(30, 77, 43);
Color.cambridgeBlue = Color.rgb(163, 193, 173);
Color.camel = Color.rgb(193, 154, 107);
Color.cameoPink = Color.rgb(239, 187, 204);
Color.camouflageGreen = Color.rgb(120, 134, 107);
Color.canaryYellow = Color.rgb(255, 239, 0);
Color.candyAppleRed = Color.rgb(255, 8, 0);
Color.candyPink = Color.rgb(228, 113, 122);
Color.capri = Color.rgb(0, 191, 255);
Color.caputMortuum = Color.rgb(89, 39, 32);
Color.cardinal = Color.rgb(196, 30, 58);
Color.caribbeanGreen = Color.rgb(0, 204, 153);
Color.carmine = Color.rgb(150, 0, 24);
Color.carmineMP = Color.rgb(215, 0, 64);
Color.carminePink = Color.rgb(235, 76, 66);
Color.carmineRed = Color.rgb(255, 0, 56);
Color.carnationPink = Color.rgb(255, 166, 201);
Color.carnelian = Color.rgb(179, 27, 27);
Color.carolinaBlue = Color.rgb(153, 186, 221);
Color.carrotOrange = Color.rgb(237, 145, 33);
Color.catalinaBlue = Color.rgb(6, 42, 120);
Color.ceil = Color.rgb(146, 161, 207);
Color.celadon = Color.rgb(172, 225, 175);
Color.celadonBlue = Color.rgb(0, 123, 167);
Color.celadonGreen = Color.rgb(47, 132, 124);
Color.celesteColour = Color.rgb(178, 255, 255);
Color.celestialBlue = Color.rgb(73, 151, 208);
Color.cerise = Color.rgb(222, 49, 99);
Color.cerisePink = Color.rgb(236, 59, 131);
Color.cerulean = Color.rgb(0, 123, 167);
Color.ceruleanBlue = Color.rgb(42, 82, 190);
Color.ceruleanFrost = Color.rgb(109, 155, 195);
Color.cgBlue = Color.rgb(0, 122, 165);
Color.cgRed = Color.rgb(224, 60, 49);
Color.chamoisee = Color.rgb(160, 120, 90);
Color.champagne = Color.rgb(250, 214, 165);
Color.charcoal = Color.rgb(54, 69, 79);
Color.charmPink = Color.rgb(230, 143, 172);
Color.chartreuseTraditional = Color.rgb(223, 255, 0);
Color.chartreuseWeb = Color.rgb(127, 255, 0);
Color.cherry = Color.rgb(222, 49, 99);
Color.cherryBlossomPink = Color.rgb(255, 183, 197);
Color.chestnut = Color.rgb(205, 92, 92);
Color.chinaPink = Color.rgb(222, 111, 161);
Color.chinaRose = Color.rgb(168, 81, 110);
Color.chineseRed = Color.rgb(170, 56, 30);
Color.chocolateTraditional = Color.rgb(123, 63, 0);
Color.chocolateWeb = Color.rgb(210, 105, 30);
Color.chromeYellow = Color.rgb(255, 167, 0);
Color.cinereous = Color.rgb(152, 129, 123);
Color.cinnabar = Color.rgb(227, 66, 52);
Color.cinnamon = Color.rgb(210, 105, 30);
Color.citrine = Color.rgb(228, 208, 10);
Color.classicRose = Color.rgb(251, 204, 231);
Color.cobalt = Color.rgb(0, 71, 171);
Color.cocoaBrown = Color.rgb(210, 105, 30);
Color.coffee = Color.rgb(111, 78, 55);
Color.columbiaBlue = Color.rgb(155, 221, 255);
Color.congoPink = Color.rgb(248, 131, 121);
Color.coolBlack = Color.rgb(0, 46, 99);
Color.coolGrey = Color.rgb(140, 146, 172);
Color.copper = Color.rgb(184, 115, 51);
Color.copperCrayola = Color.rgb(218, 138, 103);
Color.copperPenny = Color.rgb(173, 111, 105);
Color.copperRed = Color.rgb(203, 109, 81);
Color.copperRose = Color.rgb(153, 102, 102);
Color.coquelicot = Color.rgb(255, 56, 0);
Color.coral = Color.rgb(255, 127, 80);
Color.coralPink = Color.rgb(248, 131, 121);
Color.coralRed = Color.rgb(255, 64, 64);
Color.cordovan = Color.rgb(137, 63, 69);
Color.corn = Color.rgb(251, 236, 93);
Color.cornellRed = Color.rgb(179, 27, 27);
Color.cornflowerBlue = Color.rgb(100, 149, 237);
Color.cornsilk = Color.rgb(255, 248, 220);
Color.cosmicLatte = Color.rgb(255, 248, 231);
Color.cottonCandy = Color.rgb(255, 188, 217);
Color.cream = Color.rgb(255, 253, 208);
Color.crimson = Color.rgb(220, 20, 60);
Color.crimsonGlory = Color.rgb(190, 0, 50);
Color.cyan = Color.rgb(0, 255, 255);
Color.cyanProcess = Color.rgb(0, 183, 235);
Color.cyberYellow = Color.rgb(255, 211, 0);
Color.daffodil = Color.rgb(255, 255, 49);
Color.dandelion = Color.rgb(240, 225, 48);
Color.darkBlue = Color.rgb(0, 0, 139);
Color.darkBrown = Color.rgb(101, 67, 33);
Color.darkByzantium = Color.rgb(93, 57, 84);
Color.darkCandyAppleRed = Color.rgb(164, 0, 0);
Color.darkCerulean = Color.rgb(8, 69, 126);
Color.darkChestnut = Color.rgb(152, 105, 96);
Color.darkCoral = Color.rgb(205, 91, 69);
Color.darkCyan = Color.rgb(0, 139, 139);
Color.darkElectricBlue = Color.rgb(83, 104, 120);
Color.darkGoldenrod = Color.rgb(184, 134, 11);
Color.darkGray = Color.rgb(169, 169, 169);
Color.darkGreen = Color.rgb(1, 50, 32);
Color.darkImperialBlue = Color.rgb(0, 65, 106);
Color.darkJungleGreen = Color.rgb(26, 36, 33);
Color.darkKhaki = Color.rgb(189, 183, 107);
Color.darkLava = Color.rgb(72, 60, 50);
Color.darkLavender = Color.rgb(115, 79, 150);
Color.darkMagenta = Color.rgb(139, 0, 139);
Color.darkMidnightBlue = Color.rgb(0, 51, 102);
Color.darkOliveGreen = Color.rgb(85, 107, 47);
Color.darkOrange = Color.rgb(255, 140, 0);
Color.darkOrchid = Color.rgb(153, 50, 204);
Color.darkPastelBlue = Color.rgb(119, 158, 203);
Color.darkPastelGreen = Color.rgb(3, 192, 60);
Color.darkPastelPurple = Color.rgb(150, 111, 214);
Color.darkPastelRed = Color.rgb(194, 59, 34);
Color.darkPink = Color.rgb(231, 84, 128);
Color.darkPowderBlue = Color.rgb(0, 51, 153);
Color.darkRaspberry = Color.rgb(135, 38, 87);
Color.darkRed = Color.rgb(139, 0, 0);
Color.darkSalmon = Color.rgb(233, 150, 122);
Color.darkScarlet = Color.rgb(86, 3, 25);
Color.darkSeaGreen = Color.rgb(143, 188, 143);
Color.darkSienna = Color.rgb(60, 20, 20);
Color.darkSlateBlue = Color.rgb(72, 61, 139);
Color.darkSlateGray = Color.rgb(47, 79, 79);
Color.darkSpringGreen = Color.rgb(23, 114, 69);
Color.darkTan = Color.rgb(145, 129, 81);
Color.darkTangerine = Color.rgb(255, 168, 18);
Color.darkTaupe = Color.rgb(72, 60, 50);
Color.darkTerraCotta = Color.rgb(204, 78, 92);
Color.darkTurquoise = Color.rgb(0, 206, 209);
Color.darkViolet = Color.rgb(148, 0, 211);
Color.darkYellow = Color.rgb(155, 135, 12);
Color.dartmouthGreen = Color.rgb(0, 112, 60);
Color.davySGrey = Color.rgb(85, 85, 85);
Color.debianRed = Color.rgb(215, 10, 83);
Color.deepCarmine = Color.rgb(169, 32, 62);
Color.deepCarminePink = Color.rgb(239, 48, 56);
Color.deepCarrotOrange = Color.rgb(233, 105, 44);
Color.deepCerise = Color.rgb(218, 50, 135);
Color.deepChampagne = Color.rgb(250, 214, 165);
Color.deepChestnut = Color.rgb(185, 78, 72);
Color.deepCoffee = Color.rgb(112, 66, 65);
Color.deepFuchsia = Color.rgb(193, 84, 193);
Color.deepJungleGreen = Color.rgb(0, 75, 73);
Color.deepLilac = Color.rgb(153, 85, 187);
Color.deepMagenta = Color.rgb(204, 0, 204);
Color.deepPeach = Color.rgb(255, 203, 164);
Color.deepPink = Color.rgb(255, 20, 147);
Color.deepRuby = Color.rgb(132, 63, 91);
Color.deepSaffron = Color.rgb(255, 153, 51);
Color.deepSkyBlue = Color.rgb(0, 191, 255);
Color.deepTuscanRed = Color.rgb(102, 66, 77);
Color.denim = Color.rgb(21, 96, 189);
Color.desert = Color.rgb(193, 154, 107);
Color.desertSand = Color.rgb(237, 201, 175);
Color.dimGray = Color.rgb(105, 105, 105);
Color.dodgerBlue = Color.rgb(30, 144, 255);
Color.dogwoodRose = Color.rgb(215, 24, 104);
Color.dollarBill = Color.rgb(133, 187, 101);
Color.drab = Color.rgb(150, 113, 23);
Color.dukeBlue = Color.rgb(0, 0, 156);
Color.earthYellow = Color.rgb(225, 169, 95);
Color.ebony = Color.rgb(85, 93, 80);
Color.ecru = Color.rgb(194, 178, 128);
Color.eggplant = Color.rgb(97, 64, 81);
Color.eggshell = Color.rgb(240, 234, 214);
Color.egyptianBlue = Color.rgb(16, 52, 166);
Color.electricBlue = Color.rgb(125, 249, 255);
Color.electricCrimson = Color.rgb(255, 0, 63);
Color.electricCyan = Color.rgb(0, 255, 255);
Color.electricGreen = Color.rgb(0, 255, 0);
Color.electricIndigo = Color.rgb(111, 0, 255);
Color.electricLavender = Color.rgb(244, 187, 255);
Color.electricLime = Color.rgb(204, 255, 0);
Color.electricPurple = Color.rgb(191, 0, 255);
Color.electricUltramarine = Color.rgb(63, 0, 255);
Color.electricViolet = Color.rgb(143, 0, 255);
Color.electricYellow = Color.rgb(255, 255, 0);
Color.emerald = Color.rgb(80, 200, 120);
Color.englishLavender = Color.rgb(180, 131, 149);
Color.etonBlue = Color.rgb(150, 200, 162);
Color.fallow = Color.rgb(193, 154, 107);
Color.faluRed = Color.rgb(128, 24, 24);
Color.fandango = Color.rgb(181, 51, 137);
Color.fashionFuchsia = Color.rgb(244, 0, 161);
Color.fawn = Color.rgb(229, 170, 112);
Color.feldgrau = Color.rgb(77, 93, 83);
Color.fernGreen = Color.rgb(79, 121, 66);
Color.ferrariRed = Color.rgb(255, 40, 0);
Color.fieldDrab = Color.rgb(108, 84, 30);
Color.fireEngineRed = Color.rgb(206, 32, 41);
Color.firebrick = Color.rgb(178, 34, 34);
Color.flame = Color.rgb(226, 88, 34);
Color.flamingoPink = Color.rgb(252, 142, 172);
Color.flavescent = Color.rgb(247, 233, 142);
Color.flax = Color.rgb(238, 220, 130);
Color.floralWhite = Color.rgb(255, 250, 240);
Color.fluorescentOrange = Color.rgb(255, 191, 0);
Color.fluorescentPink = Color.rgb(255, 20, 147);
Color.fluorescentYellow = Color.rgb(204, 255, 0);
Color.folly = Color.rgb(255, 0, 79);
Color.forestGreenTraditional = Color.rgb(1, 68, 33);
Color.forestGreenWeb = Color.rgb(34, 139, 34);
Color.frenchBeige = Color.rgb(166, 123, 91);
Color.frenchBlue = Color.rgb(0, 114, 187);
Color.frenchLilac = Color.rgb(134, 96, 142);
Color.frenchLime = Color.rgb(204, 255, 0);
Color.frenchRaspberry = Color.rgb(199, 44, 72);
Color.frenchRose = Color.rgb(246, 74, 138);
Color.fuchsia = Color.rgb(255, 0, 255);
Color.fuchsiaCrayola = Color.rgb(193, 84, 193);
Color.fuchsiaPink = Color.rgb(255, 119, 255);
Color.fuchsiaRose = Color.rgb(199, 67, 117);
Color.fulvous = Color.rgb(228, 132, 0);
Color.fuzzyWuzzy = Color.rgb(204, 102, 102);
Color.gainsboro = Color.rgb(220, 220, 220);
Color.gamboge = Color.rgb(228, 155, 15);
Color.ghostWhite = Color.rgb(248, 248, 255);
Color.ginger = Color.rgb(176, 101, 0);
Color.glaucous = Color.rgb(96, 130, 182);
Color.glitter = Color.rgb(230, 232, 250);
Color.goldMetallic = Color.rgb(212, 175, 55);
Color.goldWebGolden = Color.rgb(255, 215, 0);
Color.goldenBrown = Color.rgb(153, 101, 21);
Color.goldenPoppy = Color.rgb(252, 194, 0);
Color.goldenYellow = Color.rgb(255, 223, 0);
Color.goldenrod = Color.rgb(218, 165, 32);
Color.grannySmithApple = Color.rgb(168, 228, 160);
Color.gray = Color.rgb(128, 128, 128);
Color.grayAsparagus = Color.rgb(70, 89, 69);
Color.grayHtmlCssGray = Color.rgb(128, 128, 128);
Color.grayX11Gray = Color.rgb(190, 190, 190);
Color.greenColorWheelX11Green = Color.rgb(0, 255, 0);
Color.greenCrayola = Color.rgb(28, 172, 120);
Color.greenHtmlCssGreen = Color.rgb(0, 128, 0);
Color.greenMunsell = Color.rgb(0, 168, 119);
Color.greenNcs = Color.rgb(0, 159, 107);
Color.greenPigment = Color.rgb(0, 165, 80);
Color.greenRyb = Color.rgb(102, 176, 50);
Color.greenYellow = Color.rgb(173, 255, 47);
Color.grullo = Color.rgb(169, 154, 134);
Color.guppieGreen = Color.rgb(0, 255, 127);
Color.halayBe = Color.rgb(102, 56, 84);
Color.hanBlue = Color.rgb(68, 108, 207);
Color.hanPurple = Color.rgb(82, 24, 250);
Color.hansaYellow = Color.rgb(233, 214, 107);
Color.harlequin = Color.rgb(63, 255, 0);
Color.harvardCrimson = Color.rgb(201, 0, 22);
Color.harvestGold = Color.rgb(218, 145, 0);
Color.heartGold = Color.rgb(128, 128, 0);
Color.heliotrope = Color.rgb(223, 115, 255);
Color.hollywoodCerise = Color.rgb(244, 0, 161);
Color.honeydew = Color.rgb(240, 255, 240);
Color.honoluluBlue = Color.rgb(0, 127, 191);
Color.hookerSGreen = Color.rgb(73, 121, 107);
Color.hotMagenta = Color.rgb(255, 29, 206);
Color.hotPink = Color.rgb(255, 105, 180);
Color.hunterGreen = Color.rgb(53, 94, 59);
Color.iceberg = Color.rgb(113, 166, 210);
Color.icterine = Color.rgb(252, 247, 94);
Color.imperialBlue = Color.rgb(0, 35, 149);
Color.inchworm = Color.rgb(178, 236, 93);
Color.indiaGreen = Color.rgb(19, 136, 8);
Color.indianRed = Color.rgb(205, 92, 92);
Color.indianYellow = Color.rgb(227, 168, 87);
Color.indigo = Color.rgb(111, 0, 255);
Color.indigoDye = Color.rgb(0, 65, 106);
Color.indigoWeb = Color.rgb(75, 0, 130);
Color.internationalKleinBlue = Color.rgb(0, 47, 167);
Color.internationalOrangeAerospace = Color.rgb(255, 79, 0);
Color.internationalOrangeEngineering = Color.rgb(186, 22, 12);
Color.internationalOrangeGoldenGateBridge = Color.rgb(192, 54, 44);
Color.iris = Color.rgb(90, 79, 207);
Color.isabelline = Color.rgb(244, 240, 236);
Color.islamicGreen = Color.rgb(0, 144, 0);
Color.ivory = Color.rgb(255, 255, 240);
Color.jade = Color.rgb(0, 168, 107);
Color.jasmine = Color.rgb(248, 222, 126);
Color.jasper = Color.rgb(215, 59, 62);
Color.jazzberryJam = Color.rgb(165, 11, 94);
Color.jet = Color.rgb(52, 52, 52);
Color.jonquil = Color.rgb(250, 218, 94);
Color.juneBud = Color.rgb(189, 218, 87);
Color.jungleGreen = Color.rgb(41, 171, 135);
Color.kellyGreen = Color.rgb(76, 187, 23);
Color.kenyanCopper = Color.rgb(124, 28, 5);
Color.khakiHtmlCssKhaki = Color.rgb(195, 176, 145);
Color.khakiX11LightKhaki = Color.rgb(240, 230, 140);
Color.kuCrimson = Color.rgb(232, 0, 13);
Color.laSalleGreen = Color.rgb(8, 120, 48);
Color.languidLavender = Color.rgb(214, 202, 221);
Color.lapisLazuli = Color.rgb(38, 97, 156);
Color.laserLemon = Color.rgb(254, 254, 34);
Color.laurelGreen = Color.rgb(169, 186, 157);
Color.lava = Color.rgb(207, 16, 32);
Color.lavenderBlue = Color.rgb(204, 204, 255);
Color.lavenderBlush = Color.rgb(255, 240, 245);
Color.lavenderFloral = Color.rgb(181, 126, 220);
Color.lavenderGray = Color.rgb(196, 195, 208);
Color.lavenderIndigo = Color.rgb(148, 87, 235);
Color.lavenderMagenta = Color.rgb(238, 130, 238);
Color.lavenderMist = Color.rgb(230, 230, 250);
Color.lavenderPink = Color.rgb(251, 174, 210);
Color.lavenderPurple = Color.rgb(150, 123, 182);
Color.lavenderRose = Color.rgb(251, 160, 227);
Color.lavenderWeb = Color.rgb(230, 230, 250);
Color.lawnGreen = Color.rgb(124, 252, 0);
Color.lemon = Color.rgb(255, 247, 0);
Color.lemonChiffon = Color.rgb(255, 250, 205);
Color.lemonLime = Color.rgb(227, 255, 0);
Color.licorice = Color.rgb(26, 17, 16);
Color.lightApricot = Color.rgb(253, 213, 177);
Color.lightBlue = Color.rgb(173, 216, 230);
Color.lightBrown = Color.rgb(181, 101, 29);
Color.lightCarminePink = Color.rgb(230, 103, 113);
Color.lightCoral = Color.rgb(240, 128, 128);
Color.lightCornflowerBlue = Color.rgb(147, 204, 234);
Color.lightCrimson = Color.rgb(245, 105, 145);
Color.lightCyan = Color.rgb(224, 255, 255);
Color.lightFuchsiaPink = Color.rgb(249, 132, 239);
Color.lightGoldenrodYellow = Color.rgb(250, 250, 210);
Color.lightGray = Color.rgb(211, 211, 211);
Color.lightGreen = Color.rgb(144, 238, 144);
Color.lightKhaki = Color.rgb(240, 230, 140);
Color.lightPastelPurple = Color.rgb(177, 156, 217);
Color.lightPink = Color.rgb(255, 182, 193);
Color.lightRedOchre = Color.rgb(233, 116, 81);
Color.lightSalmon = Color.rgb(255, 160, 122);
Color.lightSalmonPink = Color.rgb(255, 153, 153);
Color.lightSeaGreen = Color.rgb(32, 178, 170);
Color.lightSkyBlue = Color.rgb(135, 206, 250);
Color.lightSlateGray = Color.rgb(119, 136, 153);
Color.lightTaupe = Color.rgb(179, 139, 109);
Color.lightThulianPink = Color.rgb(230, 143, 172);
Color.lightYellow = Color.rgb(255, 255, 224);
Color.lilac = Color.rgb(200, 162, 200);
Color.limeColorWheel = Color.rgb(191, 255, 0);
Color.limeGreen = Color.rgb(50, 205, 50);
Color.limeWebX11Green = Color.rgb(0, 255, 0);
Color.limerick = Color.rgb(157, 194, 9);
Color.lincolnGreen = Color.rgb(25, 89, 5);
Color.linen = Color.rgb(250, 240, 230);
Color.lion = Color.rgb(193, 154, 107);
Color.littleBoyBlue = Color.rgb(108, 160, 220);
Color.liver = Color.rgb(83, 75, 79);
Color.lust = Color.rgb(230, 32, 32);
Color.magenta = Color.rgb(255, 0, 255);
Color.magentaDye = Color.rgb(202, 31, 123);
Color.magentaProcess = Color.rgb(255, 0, 144);
Color.magicMint = Color.rgb(170, 240, 209);
Color.magnolia = Color.rgb(248, 244, 255);
Color.mahogany = Color.rgb(192, 64, 0);
Color.maize = Color.rgb(251, 236, 93);
Color.majorelleBlue = Color.rgb(96, 80, 220);
Color.malachite = Color.rgb(11, 218, 81);
Color.manatee = Color.rgb(151, 154, 170);
Color.mangoTango = Color.rgb(255, 130, 67);
Color.mantis = Color.rgb(116, 195, 101);
Color.mardiGras = Color.rgb(136, 0, 133);
Color.maroonCrayola = Color.rgb(195, 33, 72);
Color.maroonHtmlCss = Color.rgb(128, 0, 0);
Color.maroonX11 = Color.rgb(176, 48, 96);
Color.mauve = Color.rgb(224, 176, 255);
Color.mauveTaupe = Color.rgb(145, 95, 109);
Color.mauvelous = Color.rgb(239, 152, 170);
Color.mayaBlue = Color.rgb(115, 194, 251);
Color.meatBrown = Color.rgb(229, 183, 59);
Color.mediumAquamarine = Color.rgb(102, 221, 170);
Color.mediumBlue = Color.rgb(0, 0, 205);
Color.mediumCandyAppleRed = Color.rgb(226, 6, 44);
Color.mediumCarmine = Color.rgb(175, 64, 53);
Color.mediumChampagne = Color.rgb(243, 229, 171);
Color.mediumElectricBlue = Color.rgb(3, 80, 150);
Color.mediumJungleGreen = Color.rgb(28, 53, 45);
Color.mediumLavenderMagenta = Color.rgb(221, 160, 221);
Color.mediumOrchid = Color.rgb(186, 85, 211);
Color.mediumPersianBlue = Color.rgb(0, 103, 165);
Color.mediumPurple = Color.rgb(147, 112, 219);
Color.mediumRedViolet = Color.rgb(187, 51, 133);
Color.mediumRuby = Color.rgb(170, 64, 105);
Color.mediumSeaGreen = Color.rgb(60, 179, 113);
Color.mediumSlateBlue = Color.rgb(123, 104, 238);
Color.mediumSpringBud = Color.rgb(201, 220, 135);
Color.mediumSpringGreen = Color.rgb(0, 250, 154);
Color.mediumTaupe = Color.rgb(103, 76, 71);
Color.mediumTurquoise = Color.rgb(72, 209, 204);
Color.mediumTuscanRed = Color.rgb(121, 68, 59);
Color.mediumVermilion = Color.rgb(217, 96, 59);
Color.mediumVioletRed = Color.rgb(199, 21, 133);
Color.mellowApricot = Color.rgb(248, 184, 120);
Color.mellowYellow = Color.rgb(248, 222, 126);
Color.melon = Color.rgb(253, 188, 180);
Color.midnightBlue = Color.rgb(25, 25, 112);
Color.midnightGreenEagleGreen = Color.rgb(0, 73, 83);
Color.mikadoYellow = Color.rgb(255, 196, 12);
Color.mint = Color.rgb(62, 180, 137);
Color.mintCream = Color.rgb(245, 255, 250);
Color.mintGreen = Color.rgb(152, 255, 152);
Color.mistyRose = Color.rgb(255, 228, 225);
Color.moccasin = Color.rgb(250, 235, 215);
Color.modeBeige = Color.rgb(150, 113, 23);
Color.moonstoneBlue = Color.rgb(115, 169, 194);
Color.mordantRed19 = Color.rgb(174, 12, 0);
Color.mossGreen = Color.rgb(173, 223, 173);
Color.mountainMeadow = Color.rgb(48, 186, 143);
Color.mountbattenPink = Color.rgb(153, 122, 141);
Color.msuGreen = Color.rgb(24, 69, 59);
Color.mulberry = Color.rgb(197, 75, 140);
Color.mustard = Color.rgb(255, 219, 88);
Color.myrtle = Color.rgb(33, 66, 30);
Color.nadeshikoPink = Color.rgb(246, 173, 198);
Color.napierGreen = Color.rgb(42, 128, 0);
Color.naplesYellow = Color.rgb(250, 218, 94);
Color.navajoWhite = Color.rgb(255, 222, 173);
Color.navyBlue = Color.rgb(0, 0, 128);
Color.neonCarrot = Color.rgb(255, 163, 67);
Color.neonFuchsia = Color.rgb(254, 65, 100);
Color.neonGreen = Color.rgb(57, 255, 20);
Color.newYorkPink = Color.rgb(215, 131, 127);
Color.nonPhotoBlue = Color.rgb(164, 221, 237);
Color.northTexasGreen = Color.rgb(5, 144, 51);
Color.oceanBoatBlue = Color.rgb(0, 119, 190);
Color.ochre = Color.rgb(204, 119, 34);
Color.officeGreen = Color.rgb(0, 128, 0);
Color.oldGold = Color.rgb(207, 181, 59);
Color.oldLace = Color.rgb(253, 245, 230);
Color.oldLavender = Color.rgb(121, 104, 120);
Color.oldMauve = Color.rgb(103, 49, 71);
Color.oldRose = Color.rgb(192, 128, 129);
Color.olive = Color.rgb(128, 128, 0);
Color.oliveDrab7 = Color.rgb(60, 52, 31);
Color.oliveDrabWebOliveDrab3 = Color.rgb(107, 142, 35);
Color.olivine = Color.rgb(154, 185, 115);
Color.onyx = Color.rgb(53, 56, 57);
Color.operaMauve = Color.rgb(183, 132, 167);
Color.orangeColorWheel = Color.rgb(255, 127, 0);
Color.orangePeel = Color.rgb(255, 159, 0);
Color.orangeRed = Color.rgb(255, 69, 0);
Color.orangeRyb = Color.rgb(251, 153, 2);
Color.orangeWebColor = Color.rgb(255, 165, 0);
Color.orchid = Color.rgb(218, 112, 214);
Color.otterBrown = Color.rgb(101, 67, 33);
Color.ouCrimsonRed = Color.rgb(153, 0, 0);
Color.outerSpace = Color.rgb(65, 74, 76);
Color.outrageousOrange = Color.rgb(255, 110, 74);
Color.oxfordBlue = Color.rgb(0, 33, 71);
Color.pakistanGreen = Color.rgb(0, 102, 0);
Color.palatinateBlue = Color.rgb(39, 59, 226);
Color.palatinatePurple = Color.rgb(104, 40, 96);
Color.paleAqua = Color.rgb(188, 212, 230);
Color.paleBlue = Color.rgb(175, 238, 238);
Color.paleBrown = Color.rgb(152, 118, 84);
Color.paleCarmine = Color.rgb(175, 64, 53);
Color.paleCerulean = Color.rgb(155, 196, 226);
Color.paleChestnut = Color.rgb(221, 173, 175);
Color.paleCopper = Color.rgb(218, 138, 103);
Color.paleCornflowerBlue = Color.rgb(171, 205, 239);
Color.paleGold = Color.rgb(230, 190, 138);
Color.paleGoldenrod = Color.rgb(238, 232, 170);
Color.paleGreen = Color.rgb(152, 251, 152);
Color.paleLavender = Color.rgb(220, 208, 255);
Color.paleMagenta = Color.rgb(249, 132, 229);
Color.palePink = Color.rgb(250, 218, 221);
Color.palePlum = Color.rgb(221, 160, 221);
Color.paleRedViolet = Color.rgb(219, 112, 147);
Color.paleRobinEggBlue = Color.rgb(150, 222, 209);
Color.paleSilver = Color.rgb(201, 192, 187);
Color.paleSpringBud = Color.rgb(236, 235, 189);
Color.paleTaupe = Color.rgb(188, 152, 126);
Color.paleVioletRed = Color.rgb(219, 112, 147);
Color.pansyPurple = Color.rgb(120, 24, 74);
Color.papayaWhip = Color.rgb(255, 239, 213);
Color.parisGreen = Color.rgb(80, 200, 120);
Color.pastelBlue = Color.rgb(174, 198, 207);
Color.pastelBrown = Color.rgb(131, 105, 83);
Color.pastelGray = Color.rgb(207, 207, 196);
Color.pastelGreen = Color.rgb(119, 221, 119);
Color.pastelMagenta = Color.rgb(244, 154, 194);
Color.pastelOrange = Color.rgb(255, 179, 71);
Color.pastelPink = Color.rgb(222, 165, 164);
Color.pastelPurple = Color.rgb(179, 158, 181);
Color.pastelRed = Color.rgb(255, 105, 97);
Color.pastelViolet = Color.rgb(203, 153, 201);
Color.pastelYellow = Color.rgb(253, 253, 150);
Color.patriarch = Color.rgb(128, 0, 128);
Color.payneSGrey = Color.rgb(83, 104, 120);
Color.peach = Color.rgb(255, 229, 180);
Color.peachCrayola = Color.rgb(255, 203, 164);
Color.peachOrange = Color.rgb(255, 204, 153);
Color.peachPuff = Color.rgb(255, 218, 185);
Color.peachYellow = Color.rgb(250, 223, 173);
Color.pear = Color.rgb(209, 226, 49);
Color.pearl = Color.rgb(234, 224, 200);
Color.pearlAqua = Color.rgb(136, 216, 192);
Color.pearlyPurple = Color.rgb(183, 104, 162);
Color.peridot = Color.rgb(230, 226, 0);
Color.periwinkle = Color.rgb(204, 204, 255);
Color.persianBlue = Color.rgb(28, 57, 187);
Color.persianGreen = Color.rgb(0, 166, 147);
Color.persianIndigo = Color.rgb(50, 18, 122);
Color.persianOrange = Color.rgb(217, 144, 88);
Color.persianPink = Color.rgb(247, 127, 190);
Color.persianPlum = Color.rgb(112, 28, 28);
Color.persianRed = Color.rgb(204, 51, 51);
Color.persianRose = Color.rgb(254, 40, 162);
Color.persimmon = Color.rgb(236, 88, 0);
Color.peru = Color.rgb(205, 133, 63);
Color.phlox = Color.rgb(223, 0, 255);
Color.phthaloBlue = Color.rgb(0, 15, 137);
Color.phthaloGreen = Color.rgb(18, 53, 36);
Color.piggyPink = Color.rgb(253, 221, 230);
Color.pineGreen = Color.rgb(1, 121, 111);
Color.pink = Color.rgb(255, 192, 203);
Color.pinkLace = Color.rgb(255, 221, 244);
Color.pinkOrange = Color.rgb(255, 153, 102);
Color.pinkPearl = Color.rgb(231, 172, 207);
Color.pinkSherbet = Color.rgb(247, 143, 167);
Color.pistachio = Color.rgb(147, 197, 114);
Color.platinum = Color.rgb(229, 228, 226);
Color.plumTraditional = Color.rgb(142, 69, 133);
Color.plumWeb = Color.rgb(221, 160, 221);
Color.portlandOrange = Color.rgb(255, 90, 54);
Color.powderBlueWeb = Color.rgb(176, 224, 230);
Color.princetonOrange = Color.rgb(255, 143, 0);
Color.prune = Color.rgb(112, 28, 28);
Color.prussianBlue = Color.rgb(0, 49, 83);
Color.psychedelicPurple = Color.rgb(223, 0, 255);
Color.puce = Color.rgb(204, 136, 153);
Color.pumpkin = Color.rgb(255, 117, 24);
Color.purpleHeart = Color.rgb(105, 53, 156);
Color.purpleHtmlCss = Color.rgb(128, 0, 128);
Color.purpleMountainMajesty = Color.rgb(150, 120, 182);
Color.purpleMunsell = Color.rgb(159, 0, 197);
Color.purplePizzazz = Color.rgb(254, 78, 218);
Color.purpleTaupe = Color.rgb(80, 64, 77);
Color.purpleX11 = Color.rgb(160, 32, 240);
Color.quartz = Color.rgb(81, 72, 79);
Color.rackley = Color.rgb(93, 138, 168);
Color.radicalRed = Color.rgb(255, 53, 94);
Color.rajah = Color.rgb(251, 171, 96);
Color.raspberry = Color.rgb(227, 11, 93);
Color.raspberryGlace = Color.rgb(145, 95, 109);
Color.raspberryPink = Color.rgb(226, 80, 152);
Color.raspberryRose = Color.rgb(179, 68, 108);
Color.rawUmber = Color.rgb(130, 102, 68);
Color.razzleDazzleRose = Color.rgb(255, 51, 204);
Color.razzmatazz = Color.rgb(227, 37, 107);
Color.red = Color.rgb(255, 0, 0);
Color.redBrown = Color.rgb(165, 42, 42);
Color.redDevil = Color.rgb(134, 1, 17);
Color.redMunsell = Color.rgb(242, 0, 60);
Color.redNcs = Color.rgb(196, 2, 51);
Color.redOrange = Color.rgb(255, 83, 73);
Color.redPigment = Color.rgb(237, 28, 36);
Color.redRyb = Color.rgb(254, 39, 18);
Color.redViolet = Color.rgb(199, 21, 133);
Color.redwood = Color.rgb(171, 78, 82);
Color.regalia = Color.rgb(82, 45, 128);
Color.resolutionBlue = Color.rgb(0, 35, 135);
Color.richBlack = Color.rgb(0, 64, 64);
Color.richBrilliantLavender = Color.rgb(241, 167, 254);
Color.richCarmine = Color.rgb(215, 0, 64);
Color.richElectricBlue = Color.rgb(8, 146, 208);
Color.richLavender = Color.rgb(167, 107, 207);
Color.richLilac = Color.rgb(182, 102, 210);
Color.richMaroon = Color.rgb(176, 48, 96);
Color.rifleGreen = Color.rgb(65, 72, 51);
Color.robinEggBlue = Color.rgb(0, 204, 204);
Color.rose = Color.rgb(255, 0, 127);
Color.roseBonbon = Color.rgb(249, 66, 158);
Color.roseEbony = Color.rgb(103, 72, 70);
Color.roseGold = Color.rgb(183, 110, 121);
Color.roseMadder = Color.rgb(227, 38, 54);
Color.rosePink = Color.rgb(255, 102, 204);
Color.roseQuartz = Color.rgb(170, 152, 169);
Color.roseTaupe = Color.rgb(144, 93, 93);
Color.roseVale = Color.rgb(171, 78, 82);
Color.rosewood = Color.rgb(101, 0, 11);
Color.rossoCorsa = Color.rgb(212, 0, 0);
Color.rosyBrown = Color.rgb(188, 143, 143);
Color.royalAzure = Color.rgb(0, 56, 168);
Color.royalBlueTraditional = Color.rgb(0, 35, 102);
Color.royalBlueWeb = Color.rgb(65, 105, 225);
Color.royalFuchsia = Color.rgb(202, 44, 146);
Color.royalPurple = Color.rgb(120, 81, 169);
Color.royalYellow = Color.rgb(250, 218, 94);
Color.rubineRed = Color.rgb(209, 0, 86);
Color.ruby = Color.rgb(224, 17, 95);
Color.rubyRed = Color.rgb(155, 17, 30);
Color.ruddy = Color.rgb(255, 0, 40);
Color.ruddyBrown = Color.rgb(187, 101, 40);
Color.ruddyPink = Color.rgb(225, 142, 150);
Color.rufous = Color.rgb(168, 28, 7);
Color.russet = Color.rgb(128, 70, 27);
Color.rust = Color.rgb(183, 65, 14);
Color.rustyRed = Color.rgb(218, 44, 67);
Color.sacramentoStateGreen = Color.rgb(0, 86, 63);
Color.saddleBrown = Color.rgb(139, 69, 19);
Color.safetyOrangeBlazeOrange = Color.rgb(255, 103, 0);
Color.saffron = Color.rgb(244, 196, 48);
Color.salmon = Color.rgb(255, 140, 105);
Color.salmonPink = Color.rgb(255, 145, 164);
Color.sand = Color.rgb(194, 178, 128);
Color.sandDune = Color.rgb(150, 113, 23);
Color.sandstorm = Color.rgb(236, 213, 64);
Color.sandyBrown = Color.rgb(244, 164, 96);
Color.sandyTaupe = Color.rgb(150, 113, 23);
Color.sangria = Color.rgb(146, 0, 10);
Color.sapGreen = Color.rgb(80, 125, 42);
Color.sapphire = Color.rgb(15, 82, 186);
Color.sapphireBlue = Color.rgb(0, 103, 165);
Color.satinSheenGold = Color.rgb(203, 161, 53);
Color.scarlet = Color.rgb(255, 36, 0);
Color.scarletCrayola = Color.rgb(253, 14, 53);
Color.schoolBusYellow = Color.rgb(255, 216, 0);
Color.screaminGreen = Color.rgb(118, 255, 122);
Color.seaBlue = Color.rgb(0, 105, 148);
Color.seaGreen = Color.rgb(46, 139, 87);
Color.sealBrown = Color.rgb(50, 20, 20);
Color.seashell = Color.rgb(255, 245, 238);
Color.selectiveYellow = Color.rgb(255, 186, 0);
Color.sepia = Color.rgb(112, 66, 20);
Color.shadow = Color.rgb(138, 121, 93);
Color.shamrockGreen = Color.rgb(0, 158, 96);
Color.shockingPink = Color.rgb(252, 15, 192);
Color.shockingPinkCrayola = Color.rgb(255, 111, 255);
Color.sienna = Color.rgb(136, 45, 23);
Color.silver = Color.rgb(192, 192, 192);
Color.sinopia = Color.rgb(203, 65, 11);
Color.skobeloff = Color.rgb(0, 116, 116);
Color.skyBlue = Color.rgb(135, 206, 235);
Color.skyMagenta = Color.rgb(207, 113, 175);
Color.slateBlue = Color.rgb(106, 90, 205);
Color.slateGray = Color.rgb(112, 128, 144);
Color.smaltDarkPowderBlue = Color.rgb(0, 51, 153);
Color.smokeyTopaz = Color.rgb(147, 61, 65);
Color.smokyBlack = Color.rgb(16, 12, 8);
Color.snow = Color.rgb(255, 250, 250);
Color.spiroDiscoBall = Color.rgb(15, 192, 252);
Color.springBud = Color.rgb(167, 252, 0);
Color.springGreen = Color.rgb(0, 255, 127);
Color.stPatrickSBlue = Color.rgb(35, 41, 122);
Color.steelBlue = Color.rgb(70, 130, 180);
Color.stilDeGrainYellow = Color.rgb(250, 218, 94);
Color.stizza = Color.rgb(153, 0, 0);
Color.stormcloud = Color.rgb(79, 102, 106);
Color.straw = Color.rgb(228, 217, 111);
Color.sunglow = Color.rgb(255, 204, 51);
Color.sunset = Color.rgb(250, 214, 165);
Color.tan = Color.rgb(210, 180, 140);
Color.tangelo = Color.rgb(249, 77, 0);
Color.tangerine = Color.rgb(242, 133, 0);
Color.tangerineYellow = Color.rgb(255, 204, 0);
Color.tangoPink = Color.rgb(228, 113, 122);
Color.taupe = Color.rgb(72, 60, 50);
Color.taupeGray = Color.rgb(139, 133, 137);
Color.teaGreen = Color.rgb(208, 240, 192);
Color.teaRoseOrange = Color.rgb(248, 131, 121);
Color.teaRoseRose = Color.rgb(244, 194, 194);
Color.teal = Color.rgb(0, 128, 128);
Color.tealBlue = Color.rgb(54, 117, 136);
Color.tealGreen = Color.rgb(0, 130, 127);
Color.telemagenta = Color.rgb(207, 52, 118);
Color.tennTawny = Color.rgb(205, 87, 0);
Color.terraCotta = Color.rgb(226, 114, 91);
Color.thistle = Color.rgb(216, 191, 216);
Color.thulianPink = Color.rgb(222, 111, 161);
Color.tickleMePink = Color.rgb(252, 137, 172);
Color.tiffanyBlue = Color.rgb(10, 186, 181);
Color.tigerSEye = Color.rgb(224, 141, 60);
Color.timberwolf = Color.rgb(219, 215, 210);
Color.titaniumYellow = Color.rgb(238, 230, 0);
Color.tomato = Color.rgb(255, 99, 71);
Color.toolbox = Color.rgb(116, 108, 192);
Color.topaz = Color.rgb(255, 200, 124);
Color.tractorRed = Color.rgb(253, 14, 53);
Color.trolleyGrey = Color.rgb(128, 128, 128);
Color.tropicalRainForest = Color.rgb(0, 117, 94);
Color.trueBlue = Color.rgb(0, 115, 207);
Color.tuftsBlue = Color.rgb(65, 125, 193);
Color.tumbleweed = Color.rgb(222, 170, 136);
Color.turkishRose = Color.rgb(181, 114, 129);
Color.turquoise = Color.rgb(48, 213, 200);
Color.turquoiseBlue = Color.rgb(0, 255, 239);
Color.turquoiseGreen = Color.rgb(160, 214, 180);
Color.tuscanRed = Color.rgb(124, 72, 72);
Color.twilightLavender = Color.rgb(138, 73, 107);
Color.tyrianPurple = Color.rgb(102, 2, 60);
Color.uaBlue = Color.rgb(0, 51, 170);
Color.uaRed = Color.rgb(217, 0, 76);
Color.ube = Color.rgb(136, 120, 195);
Color.uclaBlue = Color.rgb(83, 104, 149);
Color.uclaGold = Color.rgb(255, 179, 0);
Color.ufoGreen = Color.rgb(60, 208, 112);
Color.ultraPink = Color.rgb(255, 111, 255);
Color.ultramarine = Color.rgb(18, 10, 143);
Color.ultramarineBlue = Color.rgb(65, 102, 245);
Color.umber = Color.rgb(99, 81, 71);
Color.unbleachedSilk = Color.rgb(255, 221, 202);
Color.unitedNationsBlue = Color.rgb(91, 146, 229);
Color.universityOfCaliforniaGold = Color.rgb(183, 135, 39);
Color.unmellowYellow = Color.rgb(255, 255, 102);
Color.upForestGreen = Color.rgb(1, 68, 33);
Color.upMaroon = Color.rgb(123, 17, 19);
Color.upsdellRed = Color.rgb(174, 32, 41);
Color.urobilin = Color.rgb(225, 173, 33);
Color.usafaBlue = Color.rgb(0, 79, 152);
Color.uscCardinal = Color.rgb(153, 0, 0);
Color.uscGold = Color.rgb(255, 204, 0);
Color.utahCrimson = Color.rgb(211, 0, 63);
Color.vanilla = Color.rgb(243, 229, 171);
Color.vegasGold = Color.rgb(197, 179, 88);
Color.venetianRed = Color.rgb(200, 8, 21);
Color.verdigris = Color.rgb(67, 179, 174);
Color.vermilionCinnabar = Color.rgb(227, 66, 52);
Color.vermilionPlochere = Color.rgb(217, 96, 59);
Color.veronica = Color.rgb(160, 32, 240);
Color.violet = Color.rgb(143, 0, 255);
Color.violetBlue = Color.rgb(50, 74, 178);
Color.violetColorWheel = Color.rgb(127, 0, 255);
Color.violetRyb = Color.rgb(134, 1, 175);
Color.violetWeb = Color.rgb(238, 130, 238);
Color.viridian = Color.rgb(64, 130, 109);
Color.vividAuburn = Color.rgb(146, 39, 36);
Color.vividBurgundy = Color.rgb(159, 29, 53);
Color.vividCerise = Color.rgb(218, 29, 129);
Color.vividTangerine = Color.rgb(255, 160, 137);
Color.vividViolet = Color.rgb(159, 0, 255);
Color.warmBlack = Color.rgb(0, 66, 66);
Color.waterspout = Color.rgb(164, 244, 249);
Color.wenge = Color.rgb(100, 84, 82);
Color.wheat = Color.rgb(245, 222, 179);
Color.white = Color.rgb(255, 255, 255);
Color.whiteSmoke = Color.rgb(245, 245, 245);
Color.wildBlueYonder = Color.rgb(162, 173, 208);
Color.wildStrawberry = Color.rgb(255, 67, 164);
Color.wildWatermelon = Color.rgb(252, 108, 133);
Color.wine = Color.rgb(114, 47, 55);
Color.wineDregs = Color.rgb(103, 49, 71);
Color.wisteria = Color.rgb(201, 160, 220);
Color.woodBrown = Color.rgb(193, 154, 107);
Color.xanadu = Color.rgb(115, 134, 120);
Color.yaleBlue = Color.rgb(15, 77, 146);
Color.yellow = Color.rgb(255, 255, 0);
Color.yellowGreen = Color.rgb(154, 205, 50);
Color.yellowMunsell = Color.rgb(239, 204, 0);
Color.yellowNcs = Color.rgb(255, 211, 0);
Color.yellowOrange = Color.rgb(255, 174, 66);
Color.yellowProcess = Color.rgb(255, 239, 0);
Color.yellowRyb = Color.rgb(254, 254, 51);
Color.zaffre = Color.rgb(0, 20, 168);
Color.zinnwalditeBrown = Color.rgb(44, 22, 8);
function isSpace(color, space) {
    return color.space === space;
}
exports.isSpace = isSpace;
function isRgb(color) {
    return isSpace(color, spaces_1.ColorSpace.RGB);
}
exports.isRgb = isRgb;
function isRgba(color) {
    return isSpace(color, spaces_1.ColorSpace.RGBA);
}
exports.isRgba = isRgba;
function isAnyRgb(color) {
    return isRgb(color) || isRgba(color);
}
exports.isAnyRgb = isAnyRgb;
function isHsl(color) {
    return isSpace(color, spaces_1.ColorSpace.HSL);
}
exports.isHsl = isHsl;
function isHsla(color) {
    return isSpace(color, spaces_1.ColorSpace.HSLA);
}
exports.isHsla = isHsla;
function isAnyHsl(color) {
    return isHsl(color) || isHsla(color);
}
exports.isAnyHsl = isAnyHsl;
function isAlpha(color) {
    return isRgba(color) || isHsla(color);
}
exports.isAlpha = isAlpha;
function toRgb(color) {
    return converters_1.toSpace(color, spaces_1.ColorSpace.RGB);
}
exports.toRgb = toRgb;
function toRgba(color) {
    return converters_1.toSpace(color, spaces_1.ColorSpace.RGBA);
}
exports.toRgba = toRgba;
function toAnyRgb(color) {
    return isAlpha(color) ? toRgba(color) : toRgb(color);
}
exports.toAnyRgb = toAnyRgb;
function toHsl(color) {
    return converters_1.toSpace(color, spaces_1.ColorSpace.HSL);
}
exports.toHsl = toHsl;
function toHsla(color) {
    return converters_1.toSpace(color, spaces_1.ColorSpace.HSLA);
}
exports.toHsla = toHsla;
function toAnyHsl(color) {
    return isAlpha(color) ? toHsla(color) : toHsl(color);
}
exports.toAnyHsl = toAnyHsl;
function toAnyAlpha(color) {
    if (isAnyHsl(color)) {
        return toHsla(color);
    }
    return toRgba(color);
}
exports.toAnyAlpha = toAnyAlpha;
function toAnyOpaque(color) {
    if (isAnyHsl(color)) {
        return toHsl(color);
    }
    return toRgb(color);
}
exports.toAnyOpaque = toAnyOpaque;
function getRed(color) {
    return toAnyRgb(color).data[0];
}
exports.getRed = getRed;
function withRed(color, value) {
    const [, g, b, a] = toAnyRgb(color).data;
    return a !== undefined ? Color.rgba(value, g, b, a) : Color.rgb(value, g, b);
}
exports.withRed = withRed;
function getGreen(color) {
    return toAnyRgb(color).data[1];
}
exports.getGreen = getGreen;
function withGreen(color, value) {
    const [r, , b, a] = toAnyRgb(color).data;
    return a !== undefined ? Color.rgba(r, value, b, a) : Color.rgb(r, value, b);
}
exports.withGreen = withGreen;
function getBlue(color) {
    return toAnyRgb(color).data[2];
}
exports.getBlue = getBlue;
function withBlue(color, value) {
    const [r, g, , a] = toAnyRgb(color).data;
    return a !== undefined ? Color.rgba(r, g, value, a) : Color.rgb(r, g, value);
}
exports.withBlue = withBlue;
function getHue(color) {
    return toAnyHsl(color).data[0];
}
exports.getHue = getHue;
function withHue(color, value) {
    const [, s, l, a] = toAnyHsl(color).data;
    return a !== undefined ? Color.hsla(value, s, l, a) : Color.hsl(value, s, l);
}
exports.withHue = withHue;
function getSaturation(color) {
    return toAnyHsl(color).data[1];
}
exports.getSaturation = getSaturation;
function withSaturation(color, value) {
    const [h, , l, a] = toAnyHsl(color).data;
    return a !== undefined ? Color.hsla(h, value, l, a) : Color.hsl(h, value, l);
}
exports.withSaturation = withSaturation;
function getLightness(color) {
    return toAnyHsl(color).data[2];
}
exports.getLightness = getLightness;
function withLightness(color, value) {
    const [h, s, , a] = toAnyHsl(color).data;
    return a !== undefined ? Color.hsla(h, s, value, a) : Color.hsl(h, s, value);
}
exports.withLightness = withLightness;
function getOpacity(color) {
    const { data } = toAnyAlpha(color);
    return data[data.length - 1];
}
exports.getOpacity = getOpacity;
function withOpacity(color, value) {
    const { space, data } = toAnyAlpha(color);
    return Color.create(space, [...data.slice(0, data.length - 1), value]);
}
exports.withOpacity = withOpacity;
function invert(color) {
    const [r, g, b, a] = toAnyRgb(color).data;
    const [rScale, gScale, bScale] = spaces_1.getSpaceScales(spaces_1.ColorSpace.RGB);
    return a !== undefined
        ? Color.rgba(rScale - r, gScale - g, bScale - b, a)
        : Color.rgb(rScale - r, gScale - g, bScale - b);
}
exports.invert = invert;
function grayscale(color) {
    return withSaturation(color, 0);
}
exports.grayscale = grayscale;
function complement(color, value = 180) {
    const hue = getHue(color);
    const [hScale] = spaces_1.getSpaceScales(spaces_1.ColorSpace.HSL);
    return withHue(color, common_1.rotateValue(hue + value, hScale));
}
exports.complement = complement;
function lighten(color, value) {
    return withLightness(color, getLightness(color) + value);
}
exports.lighten = lighten;
function darken(color, value) {
    return withLightness(color, getLightness(color) - value);
}
exports.darken = darken;
function tint(color, value) {
    return withSaturation(color, getSaturation(color) + value);
}
exports.tint = tint;
function tone(color, value) {
    return withSaturation(color, getSaturation(color) - value);
}
exports.tone = tone;
function fadeIn(color, value) {
    return withOpacity(color, getOpacity(color) + value);
}
exports.fadeIn = fadeIn;
function fadeOut(color, value) {
    return withOpacity(color, getOpacity(color) - value);
}
exports.fadeOut = fadeOut;
function toString(color) {
    const rgbColor = toAnyRgb(color);
    return isAlpha(rgbColor) && getOpacity(rgbColor) < 1
        ? expressions_1.toFunctionExpression(rgbColor)
        : expressions_1.toHexExpression(rgbColor);
}
exports.toString = toString;
function dye(literals) {
    return Color.parse(literals.join(''));
}
exports.dye = dye;
