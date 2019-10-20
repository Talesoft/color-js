import { parseFunctionExpression, parseHexExpression, toFunctionExpression, toHexExpression } from './expressions';
import {
    darken, fadeIn, fadeOut, getBlue, getGreen,
    getHue, getLightness, getOpacity, getRed, getSaturation,
    grayscale, invert, lighten, tint, tone, toString,
    withBlue, withGreen, withHue, withLightness,
    withOpacity, withRed, withSaturation,
} from './functions';
import { ColorSpace } from './spaces';

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
export class Color {
    public static readonly airForceBlueRaf = createRgbColor(93, 138, 168);
    public static readonly airForceBlueUsaf = createRgbColor(0, 48, 143);
    public static readonly airSuperiorityBlue = createRgbColor(114, 160, 193);
    public static readonly alabamaCrimson = createRgbColor(163, 38, 56);
    public static readonly aliceBlue = createRgbColor(240, 248, 255);
    public static readonly alizarinCrimson = createRgbColor(227, 38, 54);
    public static readonly alloyOrange = createRgbColor(196, 98, 16);
    public static readonly almond = createRgbColor(239, 222, 205);
    public static readonly amaranth = createRgbColor(229, 43, 80);
    public static readonly amber = createRgbColor(255, 191, 0);
    public static readonly amberSaeEce = createRgbColor(255, 126, 0);
    public static readonly americanRose = createRgbColor(255, 3, 62);
    public static readonly amethyst = createRgbColor(153, 102, 204);
    public static readonly androidGreen = createRgbColor(164, 198, 57);
    public static readonly antiFlashWhite = createRgbColor(242, 243, 244);
    public static readonly antiqueBrass = createRgbColor(205, 149, 117);
    public static readonly antiqueFuchsia = createRgbColor(145, 92, 131);
    public static readonly antiqueRuby = createRgbColor(132, 27, 45);
    public static readonly antiqueWhite = createRgbColor(250, 235, 215);
    public static readonly aoEnglish = createRgbColor(0, 128, 0);
    public static readonly appleGreen = createRgbColor(141, 182, 0);
    public static readonly apricot = createRgbColor(251, 206, 177);
    public static readonly aqua = createRgbColor(0, 255, 255);
    public static readonly aquamarine = createRgbColor(127, 255, 212);
    public static readonly armyGreen = createRgbColor(75, 83, 32);
    public static readonly arsenic = createRgbColor(59, 68, 75);
    public static readonly arylideYellow = createRgbColor(233, 214, 107);
    public static readonly ashGrey = createRgbColor(178, 190, 181);
    public static readonly asparagus = createRgbColor(135, 169, 107);
    public static readonly atomicTangerine = createRgbColor(255, 153, 102);
    public static readonly auburn = createRgbColor(165, 42, 42);
    public static readonly aureolin = createRgbColor(253, 238, 0);
    public static readonly aurometalsaurus = createRgbColor(110, 127, 128);
    public static readonly avocado = createRgbColor(86, 130, 3);
    public static readonly azure = createRgbColor(0, 127, 255);
    public static readonly azureMistWeb = createRgbColor(240, 255, 255);
    public static readonly babyBlue = createRgbColor(137, 207, 240);
    public static readonly babyBlueEyes = createRgbColor(161, 202, 241);
    public static readonly babyPink = createRgbColor(244, 194, 194);
    public static readonly ballBlue = createRgbColor(33, 171, 205);
    public static readonly bananaMania = createRgbColor(250, 231, 181);
    public static readonly bananaYellow = createRgbColor(255, 225, 53);
    public static readonly barnRed = createRgbColor(124, 10, 2);
    public static readonly battleshipGrey = createRgbColor(132, 132, 130);
    public static readonly bazaar = createRgbColor(152, 119, 123);
    public static readonly beauBlue = createRgbColor(188, 212, 230);
    public static readonly beaver = createRgbColor(159, 129, 112);
    public static readonly beige = createRgbColor(245, 245, 220);
    public static readonly bigDipORuby = createRgbColor(156, 37, 66);
    public static readonly bisque = createRgbColor(255, 228, 196);
    public static readonly bistre = createRgbColor(61, 43, 31);
    public static readonly bittersweet = createRgbColor(254, 111, 94);
    public static readonly bittersweetShimmer = createRgbColor(191, 79, 81);
    public static readonly black = createRgbColor(0, 0, 0);
    public static readonly blackBean = createRgbColor(61, 12, 2);
    public static readonly blackLeatherJacket = createRgbColor(37, 53, 41);
    public static readonly blackOlive = createRgbColor(59, 60, 54);
    public static readonly blanchedAlmond = createRgbColor(255, 235, 205);
    public static readonly blastOffBronze = createRgbColor(165, 113, 100);
    public static readonly bleuDeFrance = createRgbColor(49, 140, 231);
    public static readonly blizzardBlue = createRgbColor(172, 229, 238);
    public static readonly blond = createRgbColor(250, 240, 190);
    public static readonly blue = createRgbColor(0, 0, 255);
    public static readonly blueBell = createRgbColor(162, 162, 208);
    public static readonly blueCrayola = createRgbColor(31, 117, 254);
    public static readonly blueGray = createRgbColor(102, 153, 204);
    public static readonly blueGreen = createRgbColor(13, 152, 186);
    public static readonly blueMunsell = createRgbColor(0, 147, 175);
    public static readonly blueNcs = createRgbColor(0, 135, 189);
    public static readonly bluePigment = createRgbColor(51, 51, 153);
    public static readonly blueRyb = createRgbColor(2, 71, 254);
    public static readonly blueSapphire = createRgbColor(18, 97, 128);
    public static readonly blueViolet = createRgbColor(138, 43, 226);
    public static readonly blush = createRgbColor(222, 93, 131);
    public static readonly bole = createRgbColor(121, 68, 59);
    public static readonly bondiBlue = createRgbColor(0, 149, 182);
    public static readonly bone = createRgbColor(227, 218, 201);
    public static readonly bostonUniversityRed = createRgbColor(204, 0, 0);
    public static readonly bottleGreen = createRgbColor(0, 106, 78);
    public static readonly boysenberry = createRgbColor(135, 50, 96);
    public static readonly brandeisBlue = createRgbColor(0, 112, 255);
    public static readonly brass = createRgbColor(181, 166, 66);
    public static readonly brickRed = createRgbColor(203, 65, 84);
    public static readonly brightCerulean = createRgbColor(29, 172, 214);
    public static readonly brightGreen = createRgbColor(102, 255, 0);
    public static readonly brightLavender = createRgbColor(191, 148, 228);
    public static readonly brightMaroon = createRgbColor(195, 33, 72);
    public static readonly brightPink = createRgbColor(255, 0, 127);
    public static readonly brightTurquoise = createRgbColor(8, 232, 222);
    public static readonly brightUbe = createRgbColor(209, 159, 232);
    public static readonly brilliantLavender = createRgbColor(244, 187, 255);
    public static readonly brilliantRose = createRgbColor(255, 85, 163);
    public static readonly brinkPink = createRgbColor(251, 96, 127);
    public static readonly britishRacingGreen = createRgbColor(0, 66, 37);
    public static readonly bronze = createRgbColor(205, 127, 50);
    public static readonly brownTraditional = createRgbColor(150, 75, 0);
    public static readonly brownWeb = createRgbColor(165, 42, 42);
    public static readonly bubbleGum = createRgbColor(255, 193, 204);
    public static readonly bubbles = createRgbColor(231, 254, 255);
    public static readonly buff = createRgbColor(240, 220, 130);
    public static readonly bulgarianRose = createRgbColor(72, 6, 7);
    public static readonly burgundy = createRgbColor(128, 0, 32);
    public static readonly burlywood = createRgbColor(222, 184, 135);
    public static readonly burntOrange = createRgbColor(204, 85, 0);
    public static readonly burntSienna = createRgbColor(233, 116, 81);
    public static readonly burntUmber = createRgbColor(138, 51, 36);
    public static readonly byzantine = createRgbColor(189, 51, 164);
    public static readonly byzantium = createRgbColor(112, 41, 99);
    public static readonly cadet = createRgbColor(83, 104, 114);
    public static readonly cadetBlue = createRgbColor(95, 158, 160);
    public static readonly cadetGrey = createRgbColor(145, 163, 176);
    public static readonly cadmiumGreen = createRgbColor(0, 107, 60);
    public static readonly cadmiumOrange = createRgbColor(237, 135, 45);
    public static readonly cadmiumRed = createRgbColor(227, 0, 34);
    public static readonly cadmiumYellow = createRgbColor(255, 246, 0);
    public static readonly cafAuLait = createRgbColor(166, 123, 91);
    public static readonly cafNoir = createRgbColor(75, 54, 33);
    public static readonly calPolyGreen = createRgbColor(30, 77, 43);
    public static readonly cambridgeBlue = createRgbColor(163, 193, 173);
    public static readonly camel = createRgbColor(193, 154, 107);
    public static readonly cameoPink = createRgbColor(239, 187, 204);
    public static readonly camouflageGreen = createRgbColor(120, 134, 107);
    public static readonly canaryYellow = createRgbColor(255, 239, 0);
    public static readonly candyAppleRed = createRgbColor(255, 8, 0);
    public static readonly candyPink = createRgbColor(228, 113, 122);
    public static readonly capri = createRgbColor(0, 191, 255);
    public static readonly caputMortuum = createRgbColor(89, 39, 32);
    public static readonly cardinal = createRgbColor(196, 30, 58);
    public static readonly caribbeanGreen = createRgbColor(0, 204, 153);
    public static readonly carmine = createRgbColor(150, 0, 24);
    public static readonly carmineMP = createRgbColor(215, 0, 64);
    public static readonly carminePink = createRgbColor(235, 76, 66);
    public static readonly carmineRed = createRgbColor(255, 0, 56);
    public static readonly carnationPink = createRgbColor(255, 166, 201);
    public static readonly carnelian = createRgbColor(179, 27, 27);
    public static readonly carolinaBlue = createRgbColor(153, 186, 221);
    public static readonly carrotOrange = createRgbColor(237, 145, 33);
    public static readonly catalinaBlue = createRgbColor(6, 42, 120);
    public static readonly ceil = createRgbColor(146, 161, 207);
    public static readonly celadon = createRgbColor(172, 225, 175);
    public static readonly celadonBlue = createRgbColor(0, 123, 167);
    public static readonly celadonGreen = createRgbColor(47, 132, 124);
    public static readonly celesteColour = createRgbColor(178, 255, 255);
    public static readonly celestialBlue = createRgbColor(73, 151, 208);
    public static readonly cerise = createRgbColor(222, 49, 99);
    public static readonly cerisePink = createRgbColor(236, 59, 131);
    public static readonly cerulean = createRgbColor(0, 123, 167);
    public static readonly ceruleanBlue = createRgbColor(42, 82, 190);
    public static readonly ceruleanFrost = createRgbColor(109, 155, 195);
    public static readonly cgBlue = createRgbColor(0, 122, 165);
    public static readonly cgRed = createRgbColor(224, 60, 49);
    public static readonly chamoisee = createRgbColor(160, 120, 90);
    public static readonly champagne = createRgbColor(250, 214, 165);
    public static readonly charcoal = createRgbColor(54, 69, 79);
    public static readonly charmPink = createRgbColor(230, 143, 172);
    public static readonly chartreuseTraditional = createRgbColor(223, 255, 0);
    public static readonly chartreuseWeb = createRgbColor(127, 255, 0);
    public static readonly cherry = createRgbColor(222, 49, 99);
    public static readonly cherryBlossomPink = createRgbColor(255, 183, 197);
    public static readonly chestnut = createRgbColor(205, 92, 92);
    public static readonly chinaPink = createRgbColor(222, 111, 161);
    public static readonly chinaRose = createRgbColor(168, 81, 110);
    public static readonly chineseRed = createRgbColor(170, 56, 30);
    public static readonly chocolateTraditional = createRgbColor(123, 63, 0);
    public static readonly chocolateWeb = createRgbColor(210, 105, 30);
    public static readonly chromeYellow = createRgbColor(255, 167, 0);
    public static readonly cinereous = createRgbColor(152, 129, 123);
    public static readonly cinnabar = createRgbColor(227, 66, 52);
    public static readonly cinnamon = createRgbColor(210, 105, 30);
    public static readonly citrine = createRgbColor(228, 208, 10);
    public static readonly classicRose = createRgbColor(251, 204, 231);
    public static readonly cobalt = createRgbColor(0, 71, 171);
    public static readonly cocoaBrown = createRgbColor(210, 105, 30);
    public static readonly coffee = createRgbColor(111, 78, 55);
    public static readonly columbiaBlue = createRgbColor(155, 221, 255);
    public static readonly congoPink = createRgbColor(248, 131, 121);
    public static readonly coolBlack = createRgbColor(0, 46, 99);
    public static readonly coolGrey = createRgbColor(140, 146, 172);
    public static readonly copper = createRgbColor(184, 115, 51);
    public static readonly copperCrayola = createRgbColor(218, 138, 103);
    public static readonly copperPenny = createRgbColor(173, 111, 105);
    public static readonly copperRed = createRgbColor(203, 109, 81);
    public static readonly copperRose = createRgbColor(153, 102, 102);
    public static readonly coquelicot = createRgbColor(255, 56, 0);
    public static readonly coral = createRgbColor(255, 127, 80);
    public static readonly coralPink = createRgbColor(248, 131, 121);
    public static readonly coralRed = createRgbColor(255, 64, 64);
    public static readonly cordovan = createRgbColor(137, 63, 69);
    public static readonly corn = createRgbColor(251, 236, 93);
    public static readonly cornellRed = createRgbColor(179, 27, 27);
    public static readonly cornflowerBlue = createRgbColor(100, 149, 237);
    public static readonly cornsilk = createRgbColor(255, 248, 220);
    public static readonly cosmicLatte = createRgbColor(255, 248, 231);
    public static readonly cottonCandy = createRgbColor(255, 188, 217);
    public static readonly cream = createRgbColor(255, 253, 208);
    public static readonly crimson = createRgbColor(220, 20, 60);
    public static readonly crimsonGlory = createRgbColor(190, 0, 50);
    public static readonly cyan = createRgbColor(0, 255, 255);
    public static readonly cyanProcess = createRgbColor(0, 183, 235);
    public static readonly daffodil = createRgbColor(255, 255, 49);
    public static readonly dandelion = createRgbColor(240, 225, 48);
    public static readonly darkBlue = createRgbColor(0, 0, 139);
    public static readonly darkBrown = createRgbColor(101, 67, 33);
    public static readonly darkByzantium = createRgbColor(93, 57, 84);
    public static readonly darkCandyAppleRed = createRgbColor(164, 0, 0);
    public static readonly darkCerulean = createRgbColor(8, 69, 126);
    public static readonly darkChestnut = createRgbColor(152, 105, 96);
    public static readonly darkCoral = createRgbColor(205, 91, 69);
    public static readonly darkCyan = createRgbColor(0, 139, 139);
    public static readonly darkElectricBlue = createRgbColor(83, 104, 120);
    public static readonly darkGoldenrod = createRgbColor(184, 134, 11);
    public static readonly darkGray = createRgbColor(169, 169, 169);
    public static readonly darkGreen = createRgbColor(1, 50, 32);
    public static readonly darkImperialBlue = createRgbColor(0, 65, 106);
    public static readonly darkJungleGreen = createRgbColor(26, 36, 33);
    public static readonly darkKhaki = createRgbColor(189, 183, 107);
    public static readonly darkLava = createRgbColor(72, 60, 50);
    public static readonly darkLavender = createRgbColor(115, 79, 150);
    public static readonly darkMagenta = createRgbColor(139, 0, 139);
    public static readonly darkMidnightBlue = createRgbColor(0, 51, 102);
    public static readonly darkOliveGreen = createRgbColor(85, 107, 47);
    public static readonly darkOrange = createRgbColor(255, 140, 0);
    public static readonly darkOrchid = createRgbColor(153, 50, 204);
    public static readonly darkPastelBlue = createRgbColor(119, 158, 203);
    public static readonly darkPastelGreen = createRgbColor(3, 192, 60);
    public static readonly darkPastelPurple = createRgbColor(150, 111, 214);
    public static readonly darkPastelRed = createRgbColor(194, 59, 34);
    public static readonly darkPink = createRgbColor(231, 84, 128);
    public static readonly darkPowderBlue = createRgbColor(0, 51, 153);
    public static readonly darkRaspberry = createRgbColor(135, 38, 87);
    public static readonly darkRed = createRgbColor(139, 0, 0);
    public static readonly darkSalmon = createRgbColor(233, 150, 122);
    public static readonly darkScarlet = createRgbColor(86, 3, 25);
    public static readonly darkSeaGreen = createRgbColor(143, 188, 143);
    public static readonly darkSienna = createRgbColor(60, 20, 20);
    public static readonly darkSlateBlue = createRgbColor(72, 61, 139);
    public static readonly darkSlateGray = createRgbColor(47, 79, 79);
    public static readonly darkSpringGreen = createRgbColor(23, 114, 69);
    public static readonly darkTan = createRgbColor(145, 129, 81);
    public static readonly darkTangerine = createRgbColor(255, 168, 18);
    public static readonly darkTaupe = createRgbColor(72, 60, 50);
    public static readonly darkTerraCotta = createRgbColor(204, 78, 92);
    public static readonly darkTurquoise = createRgbColor(0, 206, 209);
    public static readonly darkViolet = createRgbColor(148, 0, 211);
    public static readonly darkYellow = createRgbColor(155, 135, 12);
    public static readonly dartmouthGreen = createRgbColor(0, 112, 60);
    public static readonly davySGrey = createRgbColor(85, 85, 85);
    public static readonly debianRed = createRgbColor(215, 10, 83);
    public static readonly deepCarmine = createRgbColor(169, 32, 62);
    public static readonly deepCarminePink = createRgbColor(239, 48, 56);
    public static readonly deepCarrotOrange = createRgbColor(233, 105, 44);
    public static readonly deepCerise = createRgbColor(218, 50, 135);
    public static readonly deepChampagne = createRgbColor(250, 214, 165);
    public static readonly deepChestnut = createRgbColor(185, 78, 72);
    public static readonly deepCoffee = createRgbColor(112, 66, 65);
    public static readonly deepFuchsia = createRgbColor(193, 84, 193);
    public static readonly deepJungleGreen = createRgbColor(0, 75, 73);
    public static readonly deepLilac = createRgbColor(153, 85, 187);
    public static readonly deepMagenta = createRgbColor(204, 0, 204);
    public static readonly deepPeach = createRgbColor(255, 203, 164);
    public static readonly deepPink = createRgbColor(255, 20, 147);
    public static readonly deepRuby = createRgbColor(132, 63, 91);
    public static readonly deepSaffron = createRgbColor(255, 153, 51);
    public static readonly deepSkyBlue = createRgbColor(0, 191, 255);
    public static readonly deepTuscanRed = createRgbColor(102, 66, 77);
    public static readonly denim = createRgbColor(21, 96, 189);
    public static readonly desert = createRgbColor(193, 154, 107);
    public static readonly desertSand = createRgbColor(237, 201, 175);
    public static readonly dimGray = createRgbColor(105, 105, 105);
    public static readonly dodgerBlue = createRgbColor(30, 144, 255);
    public static readonly dogwoodRose = createRgbColor(215, 24, 104);
    public static readonly dollarBill = createRgbColor(133, 187, 101);
    public static readonly drab = createRgbColor(150, 113, 23);
    public static readonly dukeBlue = createRgbColor(0, 0, 156);
    public static readonly earthYellow = createRgbColor(225, 169, 95);
    public static readonly ebony = createRgbColor(85, 93, 80);
    public static readonly ecru = createRgbColor(194, 178, 128);
    public static readonly eggplant = createRgbColor(97, 64, 81);
    public static readonly eggshell = createRgbColor(240, 234, 214);
    public static readonly egyptianBlue = createRgbColor(16, 52, 166);
    public static readonly electricBlue = createRgbColor(125, 249, 255);
    public static readonly electricCrimson = createRgbColor(255, 0, 63);
    public static readonly electricCyan = createRgbColor(0, 255, 255);
    public static readonly electricGreen = createRgbColor(0, 255, 0);
    public static readonly electricIndigo = createRgbColor(111, 0, 255);
    public static readonly electricLavender = createRgbColor(244, 187, 255);
    public static readonly electricLime = createRgbColor(204, 255, 0);
    public static readonly electricPurple = createRgbColor(191, 0, 255);
    public static readonly electricUltramarine = createRgbColor(63, 0, 255);
    public static readonly electricViolet = createRgbColor(143, 0, 255);
    public static readonly electricYellow = createRgbColor(255, 255, 0);
    public static readonly emerald = createRgbColor(80, 200, 120);
    public static readonly englishLavender = createRgbColor(180, 131, 149);
    public static readonly etonBlue = createRgbColor(150, 200, 162);
    public static readonly fallow = createRgbColor(193, 154, 107);
    public static readonly faluRed = createRgbColor(128, 24, 24);
    public static readonly fandango = createRgbColor(181, 51, 137);
    public static readonly fashionFuchsia = createRgbColor(244, 0, 161);
    public static readonly fawn = createRgbColor(229, 170, 112);
    public static readonly feldgrau = createRgbColor(77, 93, 83);
    public static readonly fernGreen = createRgbColor(79, 121, 66);
    public static readonly ferrariRed = createRgbColor(255, 40, 0);
    public static readonly fieldDrab = createRgbColor(108, 84, 30);
    public static readonly fireEngineRed = createRgbColor(206, 32, 41);
    public static readonly firebrick = createRgbColor(178, 34, 34);
    public static readonly flame = createRgbColor(226, 88, 34);
    public static readonly flamingoPink = createRgbColor(252, 142, 172);
    public static readonly flavescent = createRgbColor(247, 233, 142);
    public static readonly flax = createRgbColor(238, 220, 130);
    public static readonly floralWhite = createRgbColor(255, 250, 240);
    public static readonly fluorescentOrange = createRgbColor(255, 191, 0);
    public static readonly fluorescentPink = createRgbColor(255, 20, 147);
    public static readonly fluorescentYellow = createRgbColor(204, 255, 0);
    public static readonly folly = createRgbColor(255, 0, 79);
    public static readonly forestGreenTraditional = createRgbColor(1, 68, 33);
    public static readonly forestGreenWeb = createRgbColor(34, 139, 34);
    public static readonly frenchBeige = createRgbColor(166, 123, 91);
    public static readonly frenchBlue = createRgbColor(0, 114, 187);
    public static readonly frenchLilac = createRgbColor(134, 96, 142);
    public static readonly frenchLime = createRgbColor(204, 255, 0);
    public static readonly frenchRaspberry = createRgbColor(199, 44, 72);
    public static readonly frenchRose = createRgbColor(246, 74, 138);
    public static readonly fuchsia = createRgbColor(255, 0, 255);
    public static readonly fuchsiaCrayola = createRgbColor(193, 84, 193);
    public static readonly fuchsiaPink = createRgbColor(255, 119, 255);
    public static readonly fuchsiaRose = createRgbColor(199, 67, 117);
    public static readonly fulvous = createRgbColor(228, 132, 0);
    public static readonly fuzzyWuzzy = createRgbColor(204, 102, 102);
    public static readonly gainsboro = createRgbColor(220, 220, 220);
    public static readonly gamboge = createRgbColor(228, 155, 15);
    public static readonly ghostWhite = createRgbColor(248, 248, 255);
    public static readonly ginger = createRgbColor(176, 101, 0);
    public static readonly glaucous = createRgbColor(96, 130, 182);
    public static readonly glitter = createRgbColor(230, 232, 250);
    public static readonly goldMetallic = createRgbColor(212, 175, 55);
    public static readonly goldWebGolden = createRgbColor(255, 215, 0);
    public static readonly goldenBrown = createRgbColor(153, 101, 21);
    public static readonly goldenPoppy = createRgbColor(252, 194, 0);
    public static readonly goldenYellow = createRgbColor(255, 223, 0);
    public static readonly goldenrod = createRgbColor(218, 165, 32);
    public static readonly grannySmithApple = createRgbColor(168, 228, 160);
    public static readonly gray = createRgbColor(128, 128, 128);
    public static readonly grayAsparagus = createRgbColor(70, 89, 69);
    public static readonly grayHtmlCssGray = createRgbColor(128, 128, 128);
    public static readonly grayX11Gray = createRgbColor(190, 190, 190);
    public static readonly greenColorWheelX11Green = createRgbColor(0, 255, 0);
    public static readonly greenCrayola = createRgbColor(28, 172, 120);
    public static readonly greenHtmlCssGreen = createRgbColor(0, 128, 0);
    public static readonly greenMunsell = createRgbColor(0, 168, 119);
    public static readonly greenNcs = createRgbColor(0, 159, 107);
    public static readonly greenPigment = createRgbColor(0, 165, 80);
    public static readonly greenRyb = createRgbColor(102, 176, 50);
    public static readonly greenYellow = createRgbColor(173, 255, 47);
    public static readonly grullo = createRgbColor(169, 154, 134);
    public static readonly guppieGreen = createRgbColor(0, 255, 127);
    public static readonly halayBe = createRgbColor(102, 56, 84);
    public static readonly hanBlue = createRgbColor(68, 108, 207);
    public static readonly hanPurple = createRgbColor(82, 24, 250);
    public static readonly hansaYellow = createRgbColor(233, 214, 107);
    public static readonly harlequin = createRgbColor(63, 255, 0);
    public static readonly harvardCrimson = createRgbColor(201, 0, 22);
    public static readonly harvestGold = createRgbColor(218, 145, 0);
    public static readonly heartGold = createRgbColor(128, 128, 0);
    public static readonly heliotrope = createRgbColor(223, 115, 255);
    public static readonly hollywoodCerise = createRgbColor(244, 0, 161);
    public static readonly honeydew = createRgbColor(240, 255, 240);
    public static readonly honoluluBlue = createRgbColor(0, 127, 191);
    public static readonly hookerSGreen = createRgbColor(73, 121, 107);
    public static readonly hotMagenta = createRgbColor(255, 29, 206);
    public static readonly hotPink = createRgbColor(255, 105, 180);
    public static readonly hunterGreen = createRgbColor(53, 94, 59);
    public static readonly iceberg = createRgbColor(113, 166, 210);
    public static readonly icterine = createRgbColor(252, 247, 94);
    public static readonly imperialBlue = createRgbColor(0, 35, 149);
    public static readonly inchworm = createRgbColor(178, 236, 93);
    public static readonly indiaGreen = createRgbColor(19, 136, 8);
    public static readonly indianRed = createRgbColor(205, 92, 92);
    public static readonly indianYellow = createRgbColor(227, 168, 87);
    public static readonly indigo = createRgbColor(111, 0, 255);
    public static readonly indigoDye = createRgbColor(0, 65, 106);
    public static readonly indigoWeb = createRgbColor(75, 0, 130);
    public static readonly internationalKleinBlue = createRgbColor(0, 47, 167);
    public static readonly internationalOrangeAerospace = createRgbColor(255, 79, 0);
    public static readonly internationalOrangeEngineering = createRgbColor(186, 22, 12);
    public static readonly internationalOrangeGoldenGateBridge = createRgbColor(192, 54, 44);
    public static readonly iris = createRgbColor(90, 79, 207);
    public static readonly isabelline = createRgbColor(244, 240, 236);
    public static readonly islamicGreen = createRgbColor(0, 144, 0);
    public static readonly ivory = createRgbColor(255, 255, 240);
    public static readonly jade = createRgbColor(0, 168, 107);
    public static readonly jasmine = createRgbColor(248, 222, 126);
    public static readonly jasper = createRgbColor(215, 59, 62);
    public static readonly jazzberryJam = createRgbColor(165, 11, 94);
    public static readonly jet = createRgbColor(52, 52, 52);
    public static readonly jonquil = createRgbColor(250, 218, 94);
    public static readonly juneBud = createRgbColor(189, 218, 87);
    public static readonly jungleGreen = createRgbColor(41, 171, 135);
    public static readonly kellyGreen = createRgbColor(76, 187, 23);
    public static readonly kenyanCopper = createRgbColor(124, 28, 5);
    public static readonly khakiHtmlCssKhaki = createRgbColor(195, 176, 145);
    public static readonly khakiX11LightKhaki = createRgbColor(240, 230, 140);
    public static readonly kuCrimson = createRgbColor(232, 0, 13);
    public static readonly laSalleGreen = createRgbColor(8, 120, 48);
    public static readonly languidLavender = createRgbColor(214, 202, 221);
    public static readonly lapisLazuli = createRgbColor(38, 97, 156);
    public static readonly laserLemon = createRgbColor(254, 254, 34);
    public static readonly laurelGreen = createRgbColor(169, 186, 157);
    public static readonly lava = createRgbColor(207, 16, 32);
    public static readonly lavenderBlue = createRgbColor(204, 204, 255);
    public static readonly lavenderBlush = createRgbColor(255, 240, 245);
    public static readonly lavenderFloral = createRgbColor(181, 126, 220);
    public static readonly lavenderGray = createRgbColor(196, 195, 208);
    public static readonly lavenderIndigo = createRgbColor(148, 87, 235);
    public static readonly lavenderMagenta = createRgbColor(238, 130, 238);
    public static readonly lavenderMist = createRgbColor(230, 230, 250);
    public static readonly lavenderPink = createRgbColor(251, 174, 210);
    public static readonly lavenderPurple = createRgbColor(150, 123, 182);
    public static readonly lavenderRose = createRgbColor(251, 160, 227);
    public static readonly lavenderWeb = createRgbColor(230, 230, 250);
    public static readonly lawnGreen = createRgbColor(124, 252, 0);
    public static readonly lemon = createRgbColor(255, 247, 0);
    public static readonly lemonChiffon = createRgbColor(255, 250, 205);
    public static readonly lemonLime = createRgbColor(227, 255, 0);
    public static readonly licorice = createRgbColor(26, 17, 16);
    public static readonly lightApricot = createRgbColor(253, 213, 177);
    public static readonly lightBlue = createRgbColor(173, 216, 230);
    public static readonly lightBrown = createRgbColor(181, 101, 29);
    public static readonly lightCarminePink = createRgbColor(230, 103, 113);
    public static readonly lightCoral = createRgbColor(240, 128, 128);
    public static readonly lightCornflowerBlue = createRgbColor(147, 204, 234);
    public static readonly lightCrimson = createRgbColor(245, 105, 145);
    public static readonly lightCyan = createRgbColor(224, 255, 255);
    public static readonly lightFuchsiaPink = createRgbColor(249, 132, 239);
    public static readonly lightGoldenrodYellow = createRgbColor(250, 250, 210);
    public static readonly lightGray = createRgbColor(211, 211, 211);
    public static readonly lightGreen = createRgbColor(144, 238, 144);
    public static readonly lightKhaki = createRgbColor(240, 230, 140);
    public static readonly lightPastelPurple = createRgbColor(177, 156, 217);
    public static readonly lightPink = createRgbColor(255, 182, 193);
    public static readonly lightRedOchre = createRgbColor(233, 116, 81);
    public static readonly lightSalmon = createRgbColor(255, 160, 122);
    public static readonly lightSalmonPink = createRgbColor(255, 153, 153);
    public static readonly lightSeaGreen = createRgbColor(32, 178, 170);
    public static readonly lightSkyBlue = createRgbColor(135, 206, 250);
    public static readonly lightSlateGray = createRgbColor(119, 136, 153);
    public static readonly lightTaupe = createRgbColor(179, 139, 109);
    public static readonly lightThulianPink = createRgbColor(230, 143, 172);
    public static readonly lightYellow = createRgbColor(255, 255, 224);
    public static readonly lilac = createRgbColor(200, 162, 200);
    public static readonly limeColorWheel = createRgbColor(191, 255, 0);
    public static readonly limeGreen = createRgbColor(50, 205, 50);
    public static readonly limeWebX11Green = createRgbColor(0, 255, 0);
    public static readonly limerick = createRgbColor(157, 194, 9);
    public static readonly lincolnGreen = createRgbColor(25, 89, 5);
    public static readonly linen = createRgbColor(250, 240, 230);
    public static readonly lion = createRgbColor(193, 154, 107);
    public static readonly littleBoyBlue = createRgbColor(108, 160, 220);
    public static readonly liver = createRgbColor(83, 75, 79);
    public static readonly lust = createRgbColor(230, 32, 32);
    public static readonly magenta = createRgbColor(255, 0, 255);
    public static readonly magentaDye = createRgbColor(202, 31, 123);
    public static readonly magentaProcess = createRgbColor(255, 0, 144);
    public static readonly magicMint = createRgbColor(170, 240, 209);
    public static readonly magnolia = createRgbColor(248, 244, 255);
    public static readonly mahogany = createRgbColor(192, 64, 0);
    public static readonly maize = createRgbColor(251, 236, 93);
    public static readonly majorelleBlue = createRgbColor(96, 80, 220);
    public static readonly malachite = createRgbColor(11, 218, 81);
    public static readonly manatee = createRgbColor(151, 154, 170);
    public static readonly mangoTango = createRgbColor(255, 130, 67);
    public static readonly mantis = createRgbColor(116, 195, 101);
    public static readonly mardiGras = createRgbColor(136, 0, 133);
    public static readonly maroonCrayola = createRgbColor(195, 33, 72);
    public static readonly maroonHtmlCss = createRgbColor(128, 0, 0);
    public static readonly maroonX11 = createRgbColor(176, 48, 96);
    public static readonly mauve = createRgbColor(224, 176, 255);
    public static readonly mauveTaupe = createRgbColor(145, 95, 109);
    public static readonly mauvelous = createRgbColor(239, 152, 170);
    public static readonly mayaBlue = createRgbColor(115, 194, 251);
    public static readonly meatBrown = createRgbColor(229, 183, 59);
    public static readonly mediumAquamarine = createRgbColor(102, 221, 170);
    public static readonly mediumBlue = createRgbColor(0, 0, 205);
    public static readonly mediumCandyAppleRed = createRgbColor(226, 6, 44);
    public static readonly mediumCarmine = createRgbColor(175, 64, 53);
    public static readonly mediumChampagne = createRgbColor(243, 229, 171);
    public static readonly mediumElectricBlue = createRgbColor(3, 80, 150);
    public static readonly mediumJungleGreen = createRgbColor(28, 53, 45);
    public static readonly mediumLavenderMagenta = createRgbColor(221, 160, 221);
    public static readonly mediumOrchid = createRgbColor(186, 85, 211);
    public static readonly mediumPersianBlue = createRgbColor(0, 103, 165);
    public static readonly mediumPurple = createRgbColor(147, 112, 219);
    public static readonly mediumRedViolet = createRgbColor(187, 51, 133);
    public static readonly mediumRuby = createRgbColor(170, 64, 105);
    public static readonly mediumSeaGreen = createRgbColor(60, 179, 113);
    public static readonly mediumSlateBlue = createRgbColor(123, 104, 238);
    public static readonly mediumSpringBud = createRgbColor(201, 220, 135);
    public static readonly mediumSpringGreen = createRgbColor(0, 250, 154);
    public static readonly mediumTaupe = createRgbColor(103, 76, 71);
    public static readonly mediumTurquoise = createRgbColor(72, 209, 204);
    public static readonly mediumTuscanRed = createRgbColor(121, 68, 59);
    public static readonly mediumVermilion = createRgbColor(217, 96, 59);
    public static readonly mediumVioletRed = createRgbColor(199, 21, 133);
    public static readonly mellowApricot = createRgbColor(248, 184, 120);
    public static readonly mellowYellow = createRgbColor(248, 222, 126);
    public static readonly melon = createRgbColor(253, 188, 180);
    public static readonly midnightBlue = createRgbColor(25, 25, 112);
    public static readonly midnightGreenEagleGreen = createRgbColor(0, 73, 83);
    public static readonly mikadoYellow = createRgbColor(255, 196, 12);
    public static readonly mint = createRgbColor(62, 180, 137);
    public static readonly mintCream = createRgbColor(245, 255, 250);
    public static readonly mintGreen = createRgbColor(152, 255, 152);
    public static readonly mistyRose = createRgbColor(255, 228, 225);
    public static readonly moccasin = createRgbColor(250, 235, 215);
    public static readonly modeBeige = createRgbColor(150, 113, 23);
    public static readonly moonstoneBlue = createRgbColor(115, 169, 194);
    public static readonly mordantRed19 = createRgbColor(174, 12, 0);
    public static readonly mossGreen = createRgbColor(173, 223, 173);
    public static readonly mountainMeadow = createRgbColor(48, 186, 143);
    public static readonly mountbattenPink = createRgbColor(153, 122, 141);
    public static readonly msuGreen = createRgbColor(24, 69, 59);
    public static readonly mulberry = createRgbColor(197, 75, 140);
    public static readonly mustard = createRgbColor(255, 219, 88);
    public static readonly myrtle = createRgbColor(33, 66, 30);
    public static readonly nadeshikoPink = createRgbColor(246, 173, 198);
    public static readonly napierGreen = createRgbColor(42, 128, 0);
    public static readonly naplesYellow = createRgbColor(250, 218, 94);
    public static readonly navajoWhite = createRgbColor(255, 222, 173);
    public static readonly navyBlue = createRgbColor(0, 0, 128);
    public static readonly neonCarrot = createRgbColor(255, 163, 67);
    public static readonly neonFuchsia = createRgbColor(254, 65, 100);
    public static readonly neonGreen = createRgbColor(57, 255, 20);
    public static readonly newYorkPink = createRgbColor(215, 131, 127);
    public static readonly nonPhotoBlue = createRgbColor(164, 221, 237);
    public static readonly northTexasGreen = createRgbColor(5, 144, 51);
    public static readonly oceanBoatBlue = createRgbColor(0, 119, 190);
    public static readonly ochre = createRgbColor(204, 119, 34);
    public static readonly officeGreen = createRgbColor(0, 128, 0);
    public static readonly oldGold = createRgbColor(207, 181, 59);
    public static readonly oldLace = createRgbColor(253, 245, 230);
    public static readonly oldLavender = createRgbColor(121, 104, 120);
    public static readonly oldMauve = createRgbColor(103, 49, 71);
    public static readonly oldRose = createRgbColor(192, 128, 129);
    public static readonly olive = createRgbColor(128, 128, 0);
    public static readonly oliveDrab7 = createRgbColor(60, 52, 31);
    public static readonly oliveDrabWebOliveDrab3 = createRgbColor(107, 142, 35);
    public static readonly olivine = createRgbColor(154, 185, 115);
    public static readonly onyx = createRgbColor(53, 56, 57);
    public static readonly operaMauve = createRgbColor(183, 132, 167);
    public static readonly orangeColorWheel = createRgbColor(255, 127, 0);
    public static readonly orangePeel = createRgbColor(255, 159, 0);
    public static readonly orangeRed = createRgbColor(255, 69, 0);
    public static readonly orangeRyb = createRgbColor(251, 153, 2);
    public static readonly orangeWebColor = createRgbColor(255, 165, 0);
    public static readonly orchid = createRgbColor(218, 112, 214);
    public static readonly otterBrown = createRgbColor(101, 67, 33);
    public static readonly ouCrimsonRed = createRgbColor(153, 0, 0);
    public static readonly outerSpace = createRgbColor(65, 74, 76);
    public static readonly outrageousOrange = createRgbColor(255, 110, 74);
    public static readonly oxfordBlue = createRgbColor(0, 33, 71);
    public static readonly pakistanGreen = createRgbColor(0, 102, 0);
    public static readonly palatinateBlue = createRgbColor(39, 59, 226);
    public static readonly palatinatePurple = createRgbColor(104, 40, 96);
    public static readonly paleAqua = createRgbColor(188, 212, 230);
    public static readonly paleBlue = createRgbColor(175, 238, 238);
    public static readonly paleBrown = createRgbColor(152, 118, 84);
    public static readonly paleCarmine = createRgbColor(175, 64, 53);
    public static readonly paleCerulean = createRgbColor(155, 196, 226);
    public static readonly paleChestnut = createRgbColor(221, 173, 175);
    public static readonly paleCopper = createRgbColor(218, 138, 103);
    public static readonly paleCornflowerBlue = createRgbColor(171, 205, 239);
    public static readonly paleGold = createRgbColor(230, 190, 138);
    public static readonly paleGoldenrod = createRgbColor(238, 232, 170);
    public static readonly paleGreen = createRgbColor(152, 251, 152);
    public static readonly paleLavender = createRgbColor(220, 208, 255);
    public static readonly paleMagenta = createRgbColor(249, 132, 229);
    public static readonly palePink = createRgbColor(250, 218, 221);
    public static readonly palePlum = createRgbColor(221, 160, 221);
    public static readonly paleRedViolet = createRgbColor(219, 112, 147);
    public static readonly paleRobinEggBlue = createRgbColor(150, 222, 209);
    public static readonly paleSilver = createRgbColor(201, 192, 187);
    public static readonly paleSpringBud = createRgbColor(236, 235, 189);
    public static readonly paleTaupe = createRgbColor(188, 152, 126);
    public static readonly paleVioletRed = createRgbColor(219, 112, 147);
    public static readonly pansyPurple = createRgbColor(120, 24, 74);
    public static readonly papayaWhip = createRgbColor(255, 239, 213);
    public static readonly parisGreen = createRgbColor(80, 200, 120);
    public static readonly pastelBlue = createRgbColor(174, 198, 207);
    public static readonly pastelBrown = createRgbColor(131, 105, 83);
    public static readonly pastelGray = createRgbColor(207, 207, 196);
    public static readonly pastelGreen = createRgbColor(119, 221, 119);
    public static readonly pastelMagenta = createRgbColor(244, 154, 194);
    public static readonly pastelOrange = createRgbColor(255, 179, 71);
    public static readonly pastelPink = createRgbColor(222, 165, 164);
    public static readonly pastelPurple = createRgbColor(179, 158, 181);
    public static readonly pastelRed = createRgbColor(255, 105, 97);
    public static readonly pastelViolet = createRgbColor(203, 153, 201);
    public static readonly pastelYellow = createRgbColor(253, 253, 150);
    public static readonly patriarch = createRgbColor(128, 0, 128);
    public static readonly payneSGrey = createRgbColor(83, 104, 120);
    public static readonly peach = createRgbColor(255, 229, 180);
    public static readonly peachCrayola = createRgbColor(255, 203, 164);
    public static readonly peachOrange = createRgbColor(255, 204, 153);
    public static readonly peachPuff = createRgbColor(255, 218, 185);
    public static readonly peachYellow = createRgbColor(250, 223, 173);
    public static readonly pear = createRgbColor(209, 226, 49);
    public static readonly pearl = createRgbColor(234, 224, 200);
    public static readonly pearlAqua = createRgbColor(136, 216, 192);
    public static readonly pearlyPurple = createRgbColor(183, 104, 162);
    public static readonly peridot = createRgbColor(230, 226, 0);
    public static readonly periwinkle = createRgbColor(204, 204, 255);
    public static readonly persianBlue = createRgbColor(28, 57, 187);
    public static readonly persianGreen = createRgbColor(0, 166, 147);
    public static readonly persianIndigo = createRgbColor(50, 18, 122);
    public static readonly persianOrange = createRgbColor(217, 144, 88);
    public static readonly persianPink = createRgbColor(247, 127, 190);
    public static readonly persianPlum = createRgbColor(112, 28, 28);
    public static readonly persianRed = createRgbColor(204, 51, 51);
    public static readonly persianRose = createRgbColor(254, 40, 162);
    public static readonly persimmon = createRgbColor(236, 88, 0);
    public static readonly peru = createRgbColor(205, 133, 63);
    public static readonly phlox = createRgbColor(223, 0, 255);
    public static readonly phthaloBlue = createRgbColor(0, 15, 137);
    public static readonly phthaloGreen = createRgbColor(18, 53, 36);
    public static readonly piggyPink = createRgbColor(253, 221, 230);
    public static readonly pineGreen = createRgbColor(1, 121, 111);
    public static readonly pink = createRgbColor(255, 192, 203);
    public static readonly pinkLace = createRgbColor(255, 221, 244);
    public static readonly pinkOrange = createRgbColor(255, 153, 102);
    public static readonly pinkPearl = createRgbColor(231, 172, 207);
    public static readonly pinkSherbet = createRgbColor(247, 143, 167);
    public static readonly pistachio = createRgbColor(147, 197, 114);
    public static readonly platinum = createRgbColor(229, 228, 226);
    public static readonly plumTraditional = createRgbColor(142, 69, 133);
    public static readonly plumWeb = createRgbColor(221, 160, 221);
    public static readonly portlandOrange = createRgbColor(255, 90, 54);
    public static readonly powderBlueWeb = createRgbColor(176, 224, 230);
    public static readonly princetonOrange = createRgbColor(255, 143, 0);
    public static readonly prune = createRgbColor(112, 28, 28);
    public static readonly prussianBlue = createRgbColor(0, 49, 83);
    public static readonly psychedelicPurple = createRgbColor(223, 0, 255);
    public static readonly puce = createRgbColor(204, 136, 153);
    public static readonly pumpkin = createRgbColor(255, 117, 24);
    public static readonly purpleHeart = createRgbColor(105, 53, 156);
    public static readonly purpleHtmlCss = createRgbColor(128, 0, 128);
    public static readonly purpleMountainMajesty = createRgbColor(150, 120, 182);
    public static readonly purpleMunsell = createRgbColor(159, 0, 197);
    public static readonly purplePizzazz = createRgbColor(254, 78, 218);
    public static readonly purpleTaupe = createRgbColor(80, 64, 77);
    public static readonly purpleX11 = createRgbColor(160, 32, 240);
    public static readonly quartz = createRgbColor(81, 72, 79);
    public static readonly rackley = createRgbColor(93, 138, 168);
    public static readonly radicalRed = createRgbColor(255, 53, 94);
    public static readonly rajah = createRgbColor(251, 171, 96);
    public static readonly raspberry = createRgbColor(227, 11, 93);
    public static readonly raspberryGlace = createRgbColor(145, 95, 109);
    public static readonly raspberryPink = createRgbColor(226, 80, 152);
    public static readonly raspberryRose = createRgbColor(179, 68, 108);
    public static readonly rawUmber = createRgbColor(130, 102, 68);
    public static readonly razzleDazzleRose = createRgbColor(255, 51, 204);
    public static readonly razzmatazz = createRgbColor(227, 37, 107);
    public static readonly red = createRgbColor(255, 0, 0);
    public static readonly redBrown = createRgbColor(165, 42, 42);
    public static readonly redDevil = createRgbColor(134, 1, 17);
    public static readonly redMunsell = createRgbColor(242, 0, 60);
    public static readonly redNcs = createRgbColor(196, 2, 51);
    public static readonly redOrange = createRgbColor(255, 83, 73);
    public static readonly redPigment = createRgbColor(237, 28, 36);
    public static readonly redRyb = createRgbColor(254, 39, 18);
    public static readonly redViolet = createRgbColor(199, 21, 133);
    public static readonly redwood = createRgbColor(171, 78, 82);
    public static readonly regalia = createRgbColor(82, 45, 128);
    public static readonly resolutionBlue = createRgbColor(0, 35, 135);
    public static readonly richBlack = createRgbColor(0, 64, 64);
    public static readonly richBrilliantLavender = createRgbColor(241, 167, 254);
    public static readonly richCarmine = createRgbColor(215, 0, 64);
    public static readonly richElectricBlue = createRgbColor(8, 146, 208);
    public static readonly richLavender = createRgbColor(167, 107, 207);
    public static readonly richLilac = createRgbColor(182, 102, 210);
    public static readonly richMaroon = createRgbColor(176, 48, 96);
    public static readonly rifleGreen = createRgbColor(65, 72, 51);
    public static readonly robinEggBlue = createRgbColor(0, 204, 204);
    public static readonly rose = createRgbColor(255, 0, 127);
    public static readonly roseBonbon = createRgbColor(249, 66, 158);
    public static readonly roseEbony = createRgbColor(103, 72, 70);
    public static readonly roseGold = createRgbColor(183, 110, 121);
    public static readonly roseMadder = createRgbColor(227, 38, 54);
    public static readonly rosePink = createRgbColor(255, 102, 204);
    public static readonly roseQuartz = createRgbColor(170, 152, 169);
    public static readonly roseTaupe = createRgbColor(144, 93, 93);
    public static readonly roseVale = createRgbColor(171, 78, 82);
    public static readonly rosewood = createRgbColor(101, 0, 11);
    public static readonly rossoCorsa = createRgbColor(212, 0, 0);
    public static readonly rosyBrown = createRgbColor(188, 143, 143);
    public static readonly royalAzure = createRgbColor(0, 56, 168);
    public static readonly royalBlueTraditional = createRgbColor(0, 35, 102);
    public static readonly royalBlueWeb = createRgbColor(65, 105, 225);
    public static readonly royalFuchsia = createRgbColor(202, 44, 146);
    public static readonly royalPurple = createRgbColor(120, 81, 169);
    public static readonly royalYellow = createRgbColor(250, 218, 94);
    public static readonly rubineRed = createRgbColor(209, 0, 86);
    public static readonly ruby = createRgbColor(224, 17, 95);
    public static readonly rubyRed = createRgbColor(155, 17, 30);
    public static readonly ruddy = createRgbColor(255, 0, 40);
    public static readonly ruddyBrown = createRgbColor(187, 101, 40);
    public static readonly ruddyPink = createRgbColor(225, 142, 150);
    public static readonly rufous = createRgbColor(168, 28, 7);
    public static readonly russet = createRgbColor(128, 70, 27);
    public static readonly rust = createRgbColor(183, 65, 14);
    public static readonly rustyRed = createRgbColor(218, 44, 67);
    public static readonly sacramentoStateGreen = createRgbColor(0, 86, 63);
    public static readonly saddleBrown = createRgbColor(139, 69, 19);
    public static readonly safetyOrangeBlazeOrange = createRgbColor(255, 103, 0);
    public static readonly saffron = createRgbColor(244, 196, 48);
    public static readonly salmon = createRgbColor(255, 140, 105);
    public static readonly salmonPink = createRgbColor(255, 145, 164);
    public static readonly sand = createRgbColor(194, 178, 128);
    public static readonly sandDune = createRgbColor(150, 113, 23);
    public static readonly sandstorm = createRgbColor(236, 213, 64);
    public static readonly sandyBrown = createRgbColor(244, 164, 96);
    public static readonly sandyTaupe = createRgbColor(150, 113, 23);
    public static readonly sangria = createRgbColor(146, 0, 10);
    public static readonly sapGreen = createRgbColor(80, 125, 42);
    public static readonly sapphire = createRgbColor(15, 82, 186);
    public static readonly sapphireBlue = createRgbColor(0, 103, 165);
    public static readonly satinSheenGold = createRgbColor(203, 161, 53);
    public static readonly scarlet = createRgbColor(255, 36, 0);
    public static readonly scarletCrayola = createRgbColor(253, 14, 53);
    public static readonly schoolBusYellow = createRgbColor(255, 216, 0);
    public static readonly screaminGreen = createRgbColor(118, 255, 122);
    public static readonly seaBlue = createRgbColor(0, 105, 148);
    public static readonly seaGreen = createRgbColor(46, 139, 87);
    public static readonly sealBrown = createRgbColor(50, 20, 20);
    public static readonly seashell = createRgbColor(255, 245, 238);
    public static readonly selectiveYellow = createRgbColor(255, 186, 0);
    public static readonly sepia = createRgbColor(112, 66, 20);
    public static readonly shadow = createRgbColor(138, 121, 93);
    public static readonly shamrockGreen = createRgbColor(0, 158, 96);
    public static readonly shockingPink = createRgbColor(252, 15, 192);
    public static readonly shockingPinkCrayola = createRgbColor(255, 111, 255);
    public static readonly sienna = createRgbColor(136, 45, 23);
    public static readonly silver = createRgbColor(192, 192, 192);
    public static readonly sinopia = createRgbColor(203, 65, 11);
    public static readonly skobeloff = createRgbColor(0, 116, 116);
    public static readonly skyBlue = createRgbColor(135, 206, 235);
    public static readonly skyMagenta = createRgbColor(207, 113, 175);
    public static readonly slateBlue = createRgbColor(106, 90, 205);
    public static readonly slateGray = createRgbColor(112, 128, 144);
    public static readonly smaltDarkPowderBlue = createRgbColor(0, 51, 153);
    public static readonly smokeyTopaz = createRgbColor(147, 61, 65);
    public static readonly smokyBlack = createRgbColor(16, 12, 8);
    public static readonly snow = createRgbColor(255, 250, 250);
    public static readonly spiroDiscoBall = createRgbColor(15, 192, 252);
    public static readonly springBud = createRgbColor(167, 252, 0);
    public static readonly springGreen = createRgbColor(0, 255, 127);
    public static readonly stPatrickSBlue = createRgbColor(35, 41, 122);
    public static readonly steelBlue = createRgbColor(70, 130, 180);
    public static readonly stilDeGrainYellow = createRgbColor(250, 218, 94);
    public static readonly stizza = createRgbColor(153, 0, 0);
    public static readonly stormcloud = createRgbColor(79, 102, 106);
    public static readonly straw = createRgbColor(228, 217, 111);
    public static readonly sunglow = createRgbColor(255, 204, 51);
    public static readonly sunset = createRgbColor(250, 214, 165);
    public static readonly tan = createRgbColor(210, 180, 140);
    public static readonly tangelo = createRgbColor(249, 77, 0);
    public static readonly tangerine = createRgbColor(242, 133, 0);
    public static readonly tangerineYellow = createRgbColor(255, 204, 0);
    public static readonly tangoPink = createRgbColor(228, 113, 122);
    public static readonly taupe = createRgbColor(72, 60, 50);
    public static readonly taupeGray = createRgbColor(139, 133, 137);
    public static readonly teaGreen = createRgbColor(208, 240, 192);
    public static readonly teaRoseOrange = createRgbColor(248, 131, 121);
    public static readonly teaRoseRose = createRgbColor(244, 194, 194);
    public static readonly teal = createRgbColor(0, 128, 128);
    public static readonly tealBlue = createRgbColor(54, 117, 136);
    public static readonly tealGreen = createRgbColor(0, 130, 127);
    public static readonly telemagenta = createRgbColor(207, 52, 118);
    public static readonly tennTawny = createRgbColor(205, 87, 0);
    public static readonly terraCotta = createRgbColor(226, 114, 91);
    public static readonly thistle = createRgbColor(216, 191, 216);
    public static readonly thulianPink = createRgbColor(222, 111, 161);
    public static readonly tickleMePink = createRgbColor(252, 137, 172);
    public static readonly tiffanyBlue = createRgbColor(10, 186, 181);
    public static readonly tigerSEye = createRgbColor(224, 141, 60);
    public static readonly timberwolf = createRgbColor(219, 215, 210);
    public static readonly titaniumYellow = createRgbColor(238, 230, 0);
    public static readonly tomato = createRgbColor(255, 99, 71);
    public static readonly toolbox = createRgbColor(116, 108, 192);
    public static readonly topaz = createRgbColor(255, 200, 124);
    public static readonly tractorRed = createRgbColor(253, 14, 53);
    public static readonly trolleyGrey = createRgbColor(128, 128, 128);
    public static readonly tropicalRainForest = createRgbColor(0, 117, 94);
    public static readonly trueBlue = createRgbColor(0, 115, 207);
    public static readonly tuftsBlue = createRgbColor(65, 125, 193);
    public static readonly tumbleweed = createRgbColor(222, 170, 136);
    public static readonly turkishRose = createRgbColor(181, 114, 129);
    public static readonly turquoise = createRgbColor(48, 213, 200);
    public static readonly turquoiseBlue = createRgbColor(0, 255, 239);
    public static readonly turquoiseGreen = createRgbColor(160, 214, 180);
    public static readonly tuscanRed = createRgbColor(124, 72, 72);
    public static readonly twilightLavender = createRgbColor(138, 73, 107);
    public static readonly tyrianPurple = createRgbColor(102, 2, 60);
    public static readonly uaBlue = createRgbColor(0, 51, 170);
    public static readonly uaRed = createRgbColor(217, 0, 76);
    public static readonly ube = createRgbColor(136, 120, 195);
    public static readonly uclaBlue = createRgbColor(83, 104, 149);
    public static readonly uclaGold = createRgbColor(255, 179, 0);
    public static readonly ufoGreen = createRgbColor(60, 208, 112);
    public static readonly ultraPink = createRgbColor(255, 111, 255);
    public static readonly ultramarine = createRgbColor(18, 10, 143);
    public static readonly ultramarineBlue = createRgbColor(65, 102, 245);
    public static readonly umber = createRgbColor(99, 81, 71);
    public static readonly unbleachedSilk = createRgbColor(255, 221, 202);
    public static readonly unitedNationsBlue = createRgbColor(91, 146, 229);
    public static readonly universityOfCaliforniaGold = createRgbColor(183, 135, 39);
    public static readonly unmellowYellow = createRgbColor(255, 255, 102);
    public static readonly upForestGreen = createRgbColor(1, 68, 33);
    public static readonly upMaroon = createRgbColor(123, 17, 19);
    public static readonly upsdellRed = createRgbColor(174, 32, 41);
    public static readonly urobilin = createRgbColor(225, 173, 33);
    public static readonly usafaBlue = createRgbColor(0, 79, 152);
    public static readonly uscCardinal = createRgbColor(153, 0, 0);
    public static readonly uscGold = createRgbColor(255, 204, 0);
    public static readonly utahCrimson = createRgbColor(211, 0, 63);
    public static readonly vanilla = createRgbColor(243, 229, 171);
    public static readonly vegasGold = createRgbColor(197, 179, 88);
    public static readonly venetianRed = createRgbColor(200, 8, 21);
    public static readonly verdigris = createRgbColor(67, 179, 174);
    public static readonly vermilionCinnabar = createRgbColor(227, 66, 52);
    public static readonly vermilionPlochere = createRgbColor(217, 96, 59);
    public static readonly veronica = createRgbColor(160, 32, 240);
    public static readonly violet = createRgbColor(143, 0, 255);
    public static readonly violetBlue = createRgbColor(50, 74, 178);
    public static readonly violetColorWheel = createRgbColor(127, 0, 255);
    public static readonly violetRyb = createRgbColor(134, 1, 175);
    public static readonly violetWeb = createRgbColor(238, 130, 238);
    public static readonly viridian = createRgbColor(64, 130, 109);
    public static readonly vividAuburn = createRgbColor(146, 39, 36);
    public static readonly vividBurgundy = createRgbColor(159, 29, 53);
    public static readonly vividCerise = createRgbColor(218, 29, 129);
    public static readonly vividTangerine = createRgbColor(255, 160, 137);
    public static readonly vividViolet = createRgbColor(159, 0, 255);
    public static readonly warmBlack = createRgbColor(0, 66, 66);
    public static readonly waterspout = createRgbColor(164, 244, 249);
    public static readonly wenge = createRgbColor(100, 84, 82);
    public static readonly wheat = createRgbColor(245, 222, 179);
    public static readonly white = createRgbColor(255, 255, 255);
    public static readonly whiteSmoke = createRgbColor(245, 245, 245);
    public static readonly wildBlueYonder = createRgbColor(162, 173, 208);
    public static readonly wildStrawberry = createRgbColor(255, 67, 164);
    public static readonly wildWatermelon = createRgbColor(252, 108, 133);
    public static readonly wine = createRgbColor(114, 47, 55);
    public static readonly wineDregs = createRgbColor(103, 49, 71);
    public static readonly wisteria = createRgbColor(201, 160, 220);
    public static readonly woodBrown = createRgbColor(193, 154, 107);
    public static readonly xanadu = createRgbColor(115, 134, 120);
    public static readonly yaleBlue = createRgbColor(15, 77, 146);
    public static readonly yellow = createRgbColor(255, 255, 0);
    public static readonly yellowGreen = createRgbColor(154, 205, 50);
    public static readonly yellowMunsell = createRgbColor(239, 204, 0);
    public static readonly yellowNcs = createRgbColor(255, 211, 0);
    public static readonly yellowOrange = createRgbColor(255, 174, 66);
    public static readonly yellowProcess = createRgbColor(255, 239, 0);
    public static readonly yellowRyb = createRgbColor(254, 254, 51);
    public static readonly zaffre = createRgbColor(0, 20, 168);
    public static readonly zinnwalditeBrown = createRgbColor(44, 22, 8);

    public readonly space: ColorSpace;
    public readonly data: ReadonlyArray<number>;

    constructor(space: ColorSpace, data: ReadonlyArray<number>) {
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

    get inverse() {
        return invert(this);
    }

    public opacity() {
        return getOpacity(this);
    }

    public withRed(value: number) {
        return withRed(this, value);
    }

    public withGreen(value: number) {
        return withGreen(this, value);
    }

    public withBlue(value: number) {
        return withBlue(this, value);
    }

    public withHue(value: number) {
        return withHue(this, value);
    }

    public withSaturation(value: number) {
        return withSaturation(this, value);
    }

    public withLightness(value: number) {
        return withLightness(this, value);
    }

    public withOpacity(value: number) {
        return withOpacity(this, value);
    }

    public lighten(value: number) {
        return lighten(this, value);
    }

    public darken(value: number) {
        return darken(this, value);
    }

    public tint(value: number) {
        return tint(this, value);
    }

    public tone(value: number) {
        return tone(this, value);
    }

    public grayscale() {
        return grayscale(this);
    }

    public fadeIn(value: number) {
        return fadeIn(this, value);
    }

    public fadeOut(value: number) {
        return fadeOut(this, value);
    }

    public toFunctionExpression() {
        return toFunctionExpression(this);
    }

    public toHexExpression() {
        return toHexExpression(this);
    }

    public toString() {
        return toString(this);
    }
}

export function createColor(space: ColorSpace, data: number[]) {
    return new Color(space, data);
}

export function createRgbColor(r: number, g: number, b: number) {
    return createColor(ColorSpace.RGB, [r, g, b]);
}

export function createRgbaColor(r: number, g: number, b: number, a: number) {
    return createColor(ColorSpace.RGBA, [r, g, b, a]);
}

export function createHslColor(h: number, s: number, l: number) {
    return createColor(ColorSpace.HSL, [h, s, l]);
}

export function createHslaColor(h: number, s: number, l: number, a: number) {
    return createColor(ColorSpace.HSLA, [h, s, l, a]);
}

export function parseColor(value: string) {
    if (value in Color) {
        return Color[value as keyof typeof Color];
    }
    if (value.startsWith('#')) {
        return parseHexExpression(value);
    }
    return parseFunctionExpression(value);
}

export function dye(literals: TemplateStringsArray) {
    return parseColor(literals.raw.join(''));
}
