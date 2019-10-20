import { rotateValue } from './common';
import { toSpace } from './converters';
import { parseFunctionExpression, parseHexExpression, toFunctionExpression, toHexExpression } from './expressions';
import { mix, MixMode } from './mixers';
import {
    createAnalogousComplementaryScheme,
    createComplementaryScheme,
    createDarkShadeScheme,
    createLightShadeScheme,
    createScheme,
    createShadeScheme,
    createSplitComplementaryScheme,
    createSquareComplementaryScheme,
    createTetradicComplementaryScheme,
    createTriadicComplementaryScheme,
    Scheme,
    SchemeGenerator,
    SchemeOptions,
} from './schemes';
import { ColorSpace, getSpaceScales } from './spaces';

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
    public static readonly airForceBlueRaf = Color.rgb(93, 138, 168);
    public static readonly airForceBlueUsaf = Color.rgb(0, 48, 143);
    public static readonly airSuperiorityBlue = Color.rgb(114, 160, 193);
    public static readonly alabamaCrimson = Color.rgb(163, 38, 56);
    public static readonly aliceBlue = Color.rgb(240, 248, 255);
    public static readonly alizarinCrimson = Color.rgb(227, 38, 54);
    public static readonly alloyOrange = Color.rgb(196, 98, 16);
    public static readonly almond = Color.rgb(239, 222, 205);
    public static readonly amaranth = Color.rgb(229, 43, 80);
    public static readonly amber = Color.rgb(255, 191, 0);
    public static readonly amberSaeEce = Color.rgb(255, 126, 0);
    public static readonly americanRose = Color.rgb(255, 3, 62);
    public static readonly amethyst = Color.rgb(153, 102, 204);
    public static readonly androidGreen = Color.rgb(164, 198, 57);
    public static readonly antiFlashWhite = Color.rgb(242, 243, 244);
    public static readonly antiqueBrass = Color.rgb(205, 149, 117);
    public static readonly antiqueFuchsia = Color.rgb(145, 92, 131);
    public static readonly antiqueRuby = Color.rgb(132, 27, 45);
    public static readonly antiqueWhite = Color.rgb(250, 235, 215);
    public static readonly aoEnglish = Color.rgb(0, 128, 0);
    public static readonly appleGreen = Color.rgb(141, 182, 0);
    public static readonly apricot = Color.rgb(251, 206, 177);
    public static readonly aqua = Color.rgb(0, 255, 255);
    public static readonly aquamarine = Color.rgb(127, 255, 212);
    public static readonly armyGreen = Color.rgb(75, 83, 32);
    public static readonly arsenic = Color.rgb(59, 68, 75);
    public static readonly arylideYellow = Color.rgb(233, 214, 107);
    public static readonly ashGrey = Color.rgb(178, 190, 181);
    public static readonly asparagus = Color.rgb(135, 169, 107);
    public static readonly atomicTangerine = Color.rgb(255, 153, 102);
    public static readonly auburn = Color.rgb(165, 42, 42);
    public static readonly aureolin = Color.rgb(253, 238, 0);
    public static readonly aurometalsaurus = Color.rgb(110, 127, 128);
    public static readonly avocado = Color.rgb(86, 130, 3);
    public static readonly azure = Color.rgb(0, 127, 255);
    public static readonly azureMistWeb = Color.rgb(240, 255, 255);
    public static readonly babyBlue = Color.rgb(137, 207, 240);
    public static readonly babyBlueEyes = Color.rgb(161, 202, 241);
    public static readonly babyPink = Color.rgb(244, 194, 194);
    public static readonly ballBlue = Color.rgb(33, 171, 205);
    public static readonly bananaMania = Color.rgb(250, 231, 181);
    public static readonly bananaYellow = Color.rgb(255, 225, 53);
    public static readonly barnRed = Color.rgb(124, 10, 2);
    public static readonly battleshipGrey = Color.rgb(132, 132, 130);
    public static readonly bazaar = Color.rgb(152, 119, 123);
    public static readonly beauBlue = Color.rgb(188, 212, 230);
    public static readonly beaver = Color.rgb(159, 129, 112);
    public static readonly beige = Color.rgb(245, 245, 220);
    public static readonly bigDipORuby = Color.rgb(156, 37, 66);
    public static readonly bisque = Color.rgb(255, 228, 196);
    public static readonly bistre = Color.rgb(61, 43, 31);
    public static readonly bittersweet = Color.rgb(254, 111, 94);
    public static readonly bittersweetShimmer = Color.rgb(191, 79, 81);
    public static readonly black = Color.rgb(0, 0, 0);
    public static readonly blackBean = Color.rgb(61, 12, 2);
    public static readonly blackLeatherJacket = Color.rgb(37, 53, 41);
    public static readonly blackOlive = Color.rgb(59, 60, 54);
    public static readonly blanchedAlmond = Color.rgb(255, 235, 205);
    public static readonly blastOffBronze = Color.rgb(165, 113, 100);
    public static readonly bleuDeFrance = Color.rgb(49, 140, 231);
    public static readonly blizzardBlue = Color.rgb(172, 229, 238);
    public static readonly blond = Color.rgb(250, 240, 190);
    public static readonly blue = Color.rgb(0, 0, 255);
    public static readonly blueBell = Color.rgb(162, 162, 208);
    public static readonly blueCrayola = Color.rgb(31, 117, 254);
    public static readonly blueGray = Color.rgb(102, 153, 204);
    public static readonly blueGreen = Color.rgb(13, 152, 186);
    public static readonly blueMunsell = Color.rgb(0, 147, 175);
    public static readonly blueNcs = Color.rgb(0, 135, 189);
    public static readonly bluePigment = Color.rgb(51, 51, 153);
    public static readonly blueRyb = Color.rgb(2, 71, 254);
    public static readonly blueSapphire = Color.rgb(18, 97, 128);
    public static readonly blueViolet = Color.rgb(138, 43, 226);
    public static readonly blush = Color.rgb(222, 93, 131);
    public static readonly bole = Color.rgb(121, 68, 59);
    public static readonly bondiBlue = Color.rgb(0, 149, 182);
    public static readonly bone = Color.rgb(227, 218, 201);
    public static readonly bostonUniversityRed = Color.rgb(204, 0, 0);
    public static readonly bottleGreen = Color.rgb(0, 106, 78);
    public static readonly boysenberry = Color.rgb(135, 50, 96);
    public static readonly brandeisBlue = Color.rgb(0, 112, 255);
    public static readonly brass = Color.rgb(181, 166, 66);
    public static readonly brickRed = Color.rgb(203, 65, 84);
    public static readonly brightCerulean = Color.rgb(29, 172, 214);
    public static readonly brightGreen = Color.rgb(102, 255, 0);
    public static readonly brightLavender = Color.rgb(191, 148, 228);
    public static readonly brightMaroon = Color.rgb(195, 33, 72);
    public static readonly brightPink = Color.rgb(255, 0, 127);
    public static readonly brightTurquoise = Color.rgb(8, 232, 222);
    public static readonly brightUbe = Color.rgb(209, 159, 232);
    public static readonly brilliantLavender = Color.rgb(244, 187, 255);
    public static readonly brilliantRose = Color.rgb(255, 85, 163);
    public static readonly brinkPink = Color.rgb(251, 96, 127);
    public static readonly britishRacingGreen = Color.rgb(0, 66, 37);
    public static readonly bronze = Color.rgb(205, 127, 50);
    public static readonly brownTraditional = Color.rgb(150, 75, 0);
    public static readonly brownWeb = Color.rgb(165, 42, 42);
    public static readonly bubbleGum = Color.rgb(255, 193, 204);
    public static readonly bubbles = Color.rgb(231, 254, 255);
    public static readonly buff = Color.rgb(240, 220, 130);
    public static readonly bulgarianRose = Color.rgb(72, 6, 7);
    public static readonly burgundy = Color.rgb(128, 0, 32);
    public static readonly burlywood = Color.rgb(222, 184, 135);
    public static readonly burntOrange = Color.rgb(204, 85, 0);
    public static readonly burntSienna = Color.rgb(233, 116, 81);
    public static readonly burntUmber = Color.rgb(138, 51, 36);
    public static readonly byzantine = Color.rgb(189, 51, 164);
    public static readonly byzantium = Color.rgb(112, 41, 99);
    public static readonly cadet = Color.rgb(83, 104, 114);
    public static readonly cadetBlue = Color.rgb(95, 158, 160);
    public static readonly cadetGrey = Color.rgb(145, 163, 176);
    public static readonly cadmiumGreen = Color.rgb(0, 107, 60);
    public static readonly cadmiumOrange = Color.rgb(237, 135, 45);
    public static readonly cadmiumRed = Color.rgb(227, 0, 34);
    public static readonly cadmiumYellow = Color.rgb(255, 246, 0);
    public static readonly cafAuLait = Color.rgb(166, 123, 91);
    public static readonly cafNoir = Color.rgb(75, 54, 33);
    public static readonly calPolyGreen = Color.rgb(30, 77, 43);
    public static readonly cambridgeBlue = Color.rgb(163, 193, 173);
    public static readonly camel = Color.rgb(193, 154, 107);
    public static readonly cameoPink = Color.rgb(239, 187, 204);
    public static readonly camouflageGreen = Color.rgb(120, 134, 107);
    public static readonly canaryYellow = Color.rgb(255, 239, 0);
    public static readonly candyAppleRed = Color.rgb(255, 8, 0);
    public static readonly candyPink = Color.rgb(228, 113, 122);
    public static readonly capri = Color.rgb(0, 191, 255);
    public static readonly caputMortuum = Color.rgb(89, 39, 32);
    public static readonly cardinal = Color.rgb(196, 30, 58);
    public static readonly caribbeanGreen = Color.rgb(0, 204, 153);
    public static readonly carmine = Color.rgb(150, 0, 24);
    public static readonly carmineMP = Color.rgb(215, 0, 64);
    public static readonly carminePink = Color.rgb(235, 76, 66);
    public static readonly carmineRed = Color.rgb(255, 0, 56);
    public static readonly carnationPink = Color.rgb(255, 166, 201);
    public static readonly carnelian = Color.rgb(179, 27, 27);
    public static readonly carolinaBlue = Color.rgb(153, 186, 221);
    public static readonly carrotOrange = Color.rgb(237, 145, 33);
    public static readonly catalinaBlue = Color.rgb(6, 42, 120);
    public static readonly ceil = Color.rgb(146, 161, 207);
    public static readonly celadon = Color.rgb(172, 225, 175);
    public static readonly celadonBlue = Color.rgb(0, 123, 167);
    public static readonly celadonGreen = Color.rgb(47, 132, 124);
    public static readonly celesteColour = Color.rgb(178, 255, 255);
    public static readonly celestialBlue = Color.rgb(73, 151, 208);
    public static readonly cerise = Color.rgb(222, 49, 99);
    public static readonly cerisePink = Color.rgb(236, 59, 131);
    public static readonly cerulean = Color.rgb(0, 123, 167);
    public static readonly ceruleanBlue = Color.rgb(42, 82, 190);
    public static readonly ceruleanFrost = Color.rgb(109, 155, 195);
    public static readonly cgBlue = Color.rgb(0, 122, 165);
    public static readonly cgRed = Color.rgb(224, 60, 49);
    public static readonly chamoisee = Color.rgb(160, 120, 90);
    public static readonly champagne = Color.rgb(250, 214, 165);
    public static readonly charcoal = Color.rgb(54, 69, 79);
    public static readonly charmPink = Color.rgb(230, 143, 172);
    public static readonly chartreuseTraditional = Color.rgb(223, 255, 0);
    public static readonly chartreuseWeb = Color.rgb(127, 255, 0);
    public static readonly cherry = Color.rgb(222, 49, 99);
    public static readonly cherryBlossomPink = Color.rgb(255, 183, 197);
    public static readonly chestnut = Color.rgb(205, 92, 92);
    public static readonly chinaPink = Color.rgb(222, 111, 161);
    public static readonly chinaRose = Color.rgb(168, 81, 110);
    public static readonly chineseRed = Color.rgb(170, 56, 30);
    public static readonly chocolateTraditional = Color.rgb(123, 63, 0);
    public static readonly chocolateWeb = Color.rgb(210, 105, 30);
    public static readonly chromeYellow = Color.rgb(255, 167, 0);
    public static readonly cinereous = Color.rgb(152, 129, 123);
    public static readonly cinnabar = Color.rgb(227, 66, 52);
    public static readonly cinnamon = Color.rgb(210, 105, 30);
    public static readonly citrine = Color.rgb(228, 208, 10);
    public static readonly classicRose = Color.rgb(251, 204, 231);
    public static readonly cobalt = Color.rgb(0, 71, 171);
    public static readonly cocoaBrown = Color.rgb(210, 105, 30);
    public static readonly coffee = Color.rgb(111, 78, 55);
    public static readonly columbiaBlue = Color.rgb(155, 221, 255);
    public static readonly congoPink = Color.rgb(248, 131, 121);
    public static readonly coolBlack = Color.rgb(0, 46, 99);
    public static readonly coolGrey = Color.rgb(140, 146, 172);
    public static readonly copper = Color.rgb(184, 115, 51);
    public static readonly copperCrayola = Color.rgb(218, 138, 103);
    public static readonly copperPenny = Color.rgb(173, 111, 105);
    public static readonly copperRed = Color.rgb(203, 109, 81);
    public static readonly copperRose = Color.rgb(153, 102, 102);
    public static readonly coquelicot = Color.rgb(255, 56, 0);
    public static readonly coral = Color.rgb(255, 127, 80);
    public static readonly coralPink = Color.rgb(248, 131, 121);
    public static readonly coralRed = Color.rgb(255, 64, 64);
    public static readonly cordovan = Color.rgb(137, 63, 69);
    public static readonly corn = Color.rgb(251, 236, 93);
    public static readonly cornellRed = Color.rgb(179, 27, 27);
    public static readonly cornflowerBlue = Color.rgb(100, 149, 237);
    public static readonly cornsilk = Color.rgb(255, 248, 220);
    public static readonly cosmicLatte = Color.rgb(255, 248, 231);
    public static readonly cottonCandy = Color.rgb(255, 188, 217);
    public static readonly cream = Color.rgb(255, 253, 208);
    public static readonly crimson = Color.rgb(220, 20, 60);
    public static readonly crimsonGlory = Color.rgb(190, 0, 50);
    public static readonly cyan = Color.rgb(0, 255, 255);
    public static readonly cyanProcess = Color.rgb(0, 183, 235);
    public static readonly daffodil = Color.rgb(255, 255, 49);
    public static readonly dandelion = Color.rgb(240, 225, 48);
    public static readonly darkBlue = Color.rgb(0, 0, 139);
    public static readonly darkBrown = Color.rgb(101, 67, 33);
    public static readonly darkByzantium = Color.rgb(93, 57, 84);
    public static readonly darkCandyAppleRed = Color.rgb(164, 0, 0);
    public static readonly darkCerulean = Color.rgb(8, 69, 126);
    public static readonly darkChestnut = Color.rgb(152, 105, 96);
    public static readonly darkCoral = Color.rgb(205, 91, 69);
    public static readonly darkCyan = Color.rgb(0, 139, 139);
    public static readonly darkElectricBlue = Color.rgb(83, 104, 120);
    public static readonly darkGoldenrod = Color.rgb(184, 134, 11);
    public static readonly darkGray = Color.rgb(169, 169, 169);
    public static readonly darkGreen = Color.rgb(1, 50, 32);
    public static readonly darkImperialBlue = Color.rgb(0, 65, 106);
    public static readonly darkJungleGreen = Color.rgb(26, 36, 33);
    public static readonly darkKhaki = Color.rgb(189, 183, 107);
    public static readonly darkLava = Color.rgb(72, 60, 50);
    public static readonly darkLavender = Color.rgb(115, 79, 150);
    public static readonly darkMagenta = Color.rgb(139, 0, 139);
    public static readonly darkMidnightBlue = Color.rgb(0, 51, 102);
    public static readonly darkOliveGreen = Color.rgb(85, 107, 47);
    public static readonly darkOrange = Color.rgb(255, 140, 0);
    public static readonly darkOrchid = Color.rgb(153, 50, 204);
    public static readonly darkPastelBlue = Color.rgb(119, 158, 203);
    public static readonly darkPastelGreen = Color.rgb(3, 192, 60);
    public static readonly darkPastelPurple = Color.rgb(150, 111, 214);
    public static readonly darkPastelRed = Color.rgb(194, 59, 34);
    public static readonly darkPink = Color.rgb(231, 84, 128);
    public static readonly darkPowderBlue = Color.rgb(0, 51, 153);
    public static readonly darkRaspberry = Color.rgb(135, 38, 87);
    public static readonly darkRed = Color.rgb(139, 0, 0);
    public static readonly darkSalmon = Color.rgb(233, 150, 122);
    public static readonly darkScarlet = Color.rgb(86, 3, 25);
    public static readonly darkSeaGreen = Color.rgb(143, 188, 143);
    public static readonly darkSienna = Color.rgb(60, 20, 20);
    public static readonly darkSlateBlue = Color.rgb(72, 61, 139);
    public static readonly darkSlateGray = Color.rgb(47, 79, 79);
    public static readonly darkSpringGreen = Color.rgb(23, 114, 69);
    public static readonly darkTan = Color.rgb(145, 129, 81);
    public static readonly darkTangerine = Color.rgb(255, 168, 18);
    public static readonly darkTaupe = Color.rgb(72, 60, 50);
    public static readonly darkTerraCotta = Color.rgb(204, 78, 92);
    public static readonly darkTurquoise = Color.rgb(0, 206, 209);
    public static readonly darkViolet = Color.rgb(148, 0, 211);
    public static readonly darkYellow = Color.rgb(155, 135, 12);
    public static readonly dartmouthGreen = Color.rgb(0, 112, 60);
    public static readonly davySGrey = Color.rgb(85, 85, 85);
    public static readonly debianRed = Color.rgb(215, 10, 83);
    public static readonly deepCarmine = Color.rgb(169, 32, 62);
    public static readonly deepCarminePink = Color.rgb(239, 48, 56);
    public static readonly deepCarrotOrange = Color.rgb(233, 105, 44);
    public static readonly deepCerise = Color.rgb(218, 50, 135);
    public static readonly deepChampagne = Color.rgb(250, 214, 165);
    public static readonly deepChestnut = Color.rgb(185, 78, 72);
    public static readonly deepCoffee = Color.rgb(112, 66, 65);
    public static readonly deepFuchsia = Color.rgb(193, 84, 193);
    public static readonly deepJungleGreen = Color.rgb(0, 75, 73);
    public static readonly deepLilac = Color.rgb(153, 85, 187);
    public static readonly deepMagenta = Color.rgb(204, 0, 204);
    public static readonly deepPeach = Color.rgb(255, 203, 164);
    public static readonly deepPink = Color.rgb(255, 20, 147);
    public static readonly deepRuby = Color.rgb(132, 63, 91);
    public static readonly deepSaffron = Color.rgb(255, 153, 51);
    public static readonly deepSkyBlue = Color.rgb(0, 191, 255);
    public static readonly deepTuscanRed = Color.rgb(102, 66, 77);
    public static readonly denim = Color.rgb(21, 96, 189);
    public static readonly desert = Color.rgb(193, 154, 107);
    public static readonly desertSand = Color.rgb(237, 201, 175);
    public static readonly dimGray = Color.rgb(105, 105, 105);
    public static readonly dodgerBlue = Color.rgb(30, 144, 255);
    public static readonly dogwoodRose = Color.rgb(215, 24, 104);
    public static readonly dollarBill = Color.rgb(133, 187, 101);
    public static readonly drab = Color.rgb(150, 113, 23);
    public static readonly dukeBlue = Color.rgb(0, 0, 156);
    public static readonly earthYellow = Color.rgb(225, 169, 95);
    public static readonly ebony = Color.rgb(85, 93, 80);
    public static readonly ecru = Color.rgb(194, 178, 128);
    public static readonly eggplant = Color.rgb(97, 64, 81);
    public static readonly eggshell = Color.rgb(240, 234, 214);
    public static readonly egyptianBlue = Color.rgb(16, 52, 166);
    public static readonly electricBlue = Color.rgb(125, 249, 255);
    public static readonly electricCrimson = Color.rgb(255, 0, 63);
    public static readonly electricCyan = Color.rgb(0, 255, 255);
    public static readonly electricGreen = Color.rgb(0, 255, 0);
    public static readonly electricIndigo = Color.rgb(111, 0, 255);
    public static readonly electricLavender = Color.rgb(244, 187, 255);
    public static readonly electricLime = Color.rgb(204, 255, 0);
    public static readonly electricPurple = Color.rgb(191, 0, 255);
    public static readonly electricUltramarine = Color.rgb(63, 0, 255);
    public static readonly electricViolet = Color.rgb(143, 0, 255);
    public static readonly electricYellow = Color.rgb(255, 255, 0);
    public static readonly emerald = Color.rgb(80, 200, 120);
    public static readonly englishLavender = Color.rgb(180, 131, 149);
    public static readonly etonBlue = Color.rgb(150, 200, 162);
    public static readonly fallow = Color.rgb(193, 154, 107);
    public static readonly faluRed = Color.rgb(128, 24, 24);
    public static readonly fandango = Color.rgb(181, 51, 137);
    public static readonly fashionFuchsia = Color.rgb(244, 0, 161);
    public static readonly fawn = Color.rgb(229, 170, 112);
    public static readonly feldgrau = Color.rgb(77, 93, 83);
    public static readonly fernGreen = Color.rgb(79, 121, 66);
    public static readonly ferrariRed = Color.rgb(255, 40, 0);
    public static readonly fieldDrab = Color.rgb(108, 84, 30);
    public static readonly fireEngineRed = Color.rgb(206, 32, 41);
    public static readonly firebrick = Color.rgb(178, 34, 34);
    public static readonly flame = Color.rgb(226, 88, 34);
    public static readonly flamingoPink = Color.rgb(252, 142, 172);
    public static readonly flavescent = Color.rgb(247, 233, 142);
    public static readonly flax = Color.rgb(238, 220, 130);
    public static readonly floralWhite = Color.rgb(255, 250, 240);
    public static readonly fluorescentOrange = Color.rgb(255, 191, 0);
    public static readonly fluorescentPink = Color.rgb(255, 20, 147);
    public static readonly fluorescentYellow = Color.rgb(204, 255, 0);
    public static readonly folly = Color.rgb(255, 0, 79);
    public static readonly forestGreenTraditional = Color.rgb(1, 68, 33);
    public static readonly forestGreenWeb = Color.rgb(34, 139, 34);
    public static readonly frenchBeige = Color.rgb(166, 123, 91);
    public static readonly frenchBlue = Color.rgb(0, 114, 187);
    public static readonly frenchLilac = Color.rgb(134, 96, 142);
    public static readonly frenchLime = Color.rgb(204, 255, 0);
    public static readonly frenchRaspberry = Color.rgb(199, 44, 72);
    public static readonly frenchRose = Color.rgb(246, 74, 138);
    public static readonly fuchsia = Color.rgb(255, 0, 255);
    public static readonly fuchsiaCrayola = Color.rgb(193, 84, 193);
    public static readonly fuchsiaPink = Color.rgb(255, 119, 255);
    public static readonly fuchsiaRose = Color.rgb(199, 67, 117);
    public static readonly fulvous = Color.rgb(228, 132, 0);
    public static readonly fuzzyWuzzy = Color.rgb(204, 102, 102);
    public static readonly gainsboro = Color.rgb(220, 220, 220);
    public static readonly gamboge = Color.rgb(228, 155, 15);
    public static readonly ghostWhite = Color.rgb(248, 248, 255);
    public static readonly ginger = Color.rgb(176, 101, 0);
    public static readonly glaucous = Color.rgb(96, 130, 182);
    public static readonly glitter = Color.rgb(230, 232, 250);
    public static readonly goldMetallic = Color.rgb(212, 175, 55);
    public static readonly goldWebGolden = Color.rgb(255, 215, 0);
    public static readonly goldenBrown = Color.rgb(153, 101, 21);
    public static readonly goldenPoppy = Color.rgb(252, 194, 0);
    public static readonly goldenYellow = Color.rgb(255, 223, 0);
    public static readonly goldenrod = Color.rgb(218, 165, 32);
    public static readonly grannySmithApple = Color.rgb(168, 228, 160);
    public static readonly gray = Color.rgb(128, 128, 128);
    public static readonly grayAsparagus = Color.rgb(70, 89, 69);
    public static readonly grayHtmlCssGray = Color.rgb(128, 128, 128);
    public static readonly grayX11Gray = Color.rgb(190, 190, 190);
    public static readonly greenColorWheelX11Green = Color.rgb(0, 255, 0);
    public static readonly greenCrayola = Color.rgb(28, 172, 120);
    public static readonly greenHtmlCssGreen = Color.rgb(0, 128, 0);
    public static readonly greenMunsell = Color.rgb(0, 168, 119);
    public static readonly greenNcs = Color.rgb(0, 159, 107);
    public static readonly greenPigment = Color.rgb(0, 165, 80);
    public static readonly greenRyb = Color.rgb(102, 176, 50);
    public static readonly greenYellow = Color.rgb(173, 255, 47);
    public static readonly grullo = Color.rgb(169, 154, 134);
    public static readonly guppieGreen = Color.rgb(0, 255, 127);
    public static readonly halayBe = Color.rgb(102, 56, 84);
    public static readonly hanBlue = Color.rgb(68, 108, 207);
    public static readonly hanPurple = Color.rgb(82, 24, 250);
    public static readonly hansaYellow = Color.rgb(233, 214, 107);
    public static readonly harlequin = Color.rgb(63, 255, 0);
    public static readonly harvardCrimson = Color.rgb(201, 0, 22);
    public static readonly harvestGold = Color.rgb(218, 145, 0);
    public static readonly heartGold = Color.rgb(128, 128, 0);
    public static readonly heliotrope = Color.rgb(223, 115, 255);
    public static readonly hollywoodCerise = Color.rgb(244, 0, 161);
    public static readonly honeydew = Color.rgb(240, 255, 240);
    public static readonly honoluluBlue = Color.rgb(0, 127, 191);
    public static readonly hookerSGreen = Color.rgb(73, 121, 107);
    public static readonly hotMagenta = Color.rgb(255, 29, 206);
    public static readonly hotPink = Color.rgb(255, 105, 180);
    public static readonly hunterGreen = Color.rgb(53, 94, 59);
    public static readonly iceberg = Color.rgb(113, 166, 210);
    public static readonly icterine = Color.rgb(252, 247, 94);
    public static readonly imperialBlue = Color.rgb(0, 35, 149);
    public static readonly inchworm = Color.rgb(178, 236, 93);
    public static readonly indiaGreen = Color.rgb(19, 136, 8);
    public static readonly indianRed = Color.rgb(205, 92, 92);
    public static readonly indianYellow = Color.rgb(227, 168, 87);
    public static readonly indigo = Color.rgb(111, 0, 255);
    public static readonly indigoDye = Color.rgb(0, 65, 106);
    public static readonly indigoWeb = Color.rgb(75, 0, 130);
    public static readonly internationalKleinBlue = Color.rgb(0, 47, 167);
    public static readonly internationalOrangeAerospace = Color.rgb(255, 79, 0);
    public static readonly internationalOrangeEngineering = Color.rgb(186, 22, 12);
    public static readonly internationalOrangeGoldenGateBridge = Color.rgb(192, 54, 44);
    public static readonly iris = Color.rgb(90, 79, 207);
    public static readonly isabelline = Color.rgb(244, 240, 236);
    public static readonly islamicGreen = Color.rgb(0, 144, 0);
    public static readonly ivory = Color.rgb(255, 255, 240);
    public static readonly jade = Color.rgb(0, 168, 107);
    public static readonly jasmine = Color.rgb(248, 222, 126);
    public static readonly jasper = Color.rgb(215, 59, 62);
    public static readonly jazzberryJam = Color.rgb(165, 11, 94);
    public static readonly jet = Color.rgb(52, 52, 52);
    public static readonly jonquil = Color.rgb(250, 218, 94);
    public static readonly juneBud = Color.rgb(189, 218, 87);
    public static readonly jungleGreen = Color.rgb(41, 171, 135);
    public static readonly kellyGreen = Color.rgb(76, 187, 23);
    public static readonly kenyanCopper = Color.rgb(124, 28, 5);
    public static readonly khakiHtmlCssKhaki = Color.rgb(195, 176, 145);
    public static readonly khakiX11LightKhaki = Color.rgb(240, 230, 140);
    public static readonly kuCrimson = Color.rgb(232, 0, 13);
    public static readonly laSalleGreen = Color.rgb(8, 120, 48);
    public static readonly languidLavender = Color.rgb(214, 202, 221);
    public static readonly lapisLazuli = Color.rgb(38, 97, 156);
    public static readonly laserLemon = Color.rgb(254, 254, 34);
    public static readonly laurelGreen = Color.rgb(169, 186, 157);
    public static readonly lava = Color.rgb(207, 16, 32);
    public static readonly lavenderBlue = Color.rgb(204, 204, 255);
    public static readonly lavenderBlush = Color.rgb(255, 240, 245);
    public static readonly lavenderFloral = Color.rgb(181, 126, 220);
    public static readonly lavenderGray = Color.rgb(196, 195, 208);
    public static readonly lavenderIndigo = Color.rgb(148, 87, 235);
    public static readonly lavenderMagenta = Color.rgb(238, 130, 238);
    public static readonly lavenderMist = Color.rgb(230, 230, 250);
    public static readonly lavenderPink = Color.rgb(251, 174, 210);
    public static readonly lavenderPurple = Color.rgb(150, 123, 182);
    public static readonly lavenderRose = Color.rgb(251, 160, 227);
    public static readonly lavenderWeb = Color.rgb(230, 230, 250);
    public static readonly lawnGreen = Color.rgb(124, 252, 0);
    public static readonly lemon = Color.rgb(255, 247, 0);
    public static readonly lemonChiffon = Color.rgb(255, 250, 205);
    public static readonly lemonLime = Color.rgb(227, 255, 0);
    public static readonly licorice = Color.rgb(26, 17, 16);
    public static readonly lightApricot = Color.rgb(253, 213, 177);
    public static readonly lightBlue = Color.rgb(173, 216, 230);
    public static readonly lightBrown = Color.rgb(181, 101, 29);
    public static readonly lightCarminePink = Color.rgb(230, 103, 113);
    public static readonly lightCoral = Color.rgb(240, 128, 128);
    public static readonly lightCornflowerBlue = Color.rgb(147, 204, 234);
    public static readonly lightCrimson = Color.rgb(245, 105, 145);
    public static readonly lightCyan = Color.rgb(224, 255, 255);
    public static readonly lightFuchsiaPink = Color.rgb(249, 132, 239);
    public static readonly lightGoldenrodYellow = Color.rgb(250, 250, 210);
    public static readonly lightGray = Color.rgb(211, 211, 211);
    public static readonly lightGreen = Color.rgb(144, 238, 144);
    public static readonly lightKhaki = Color.rgb(240, 230, 140);
    public static readonly lightPastelPurple = Color.rgb(177, 156, 217);
    public static readonly lightPink = Color.rgb(255, 182, 193);
    public static readonly lightRedOchre = Color.rgb(233, 116, 81);
    public static readonly lightSalmon = Color.rgb(255, 160, 122);
    public static readonly lightSalmonPink = Color.rgb(255, 153, 153);
    public static readonly lightSeaGreen = Color.rgb(32, 178, 170);
    public static readonly lightSkyBlue = Color.rgb(135, 206, 250);
    public static readonly lightSlateGray = Color.rgb(119, 136, 153);
    public static readonly lightTaupe = Color.rgb(179, 139, 109);
    public static readonly lightThulianPink = Color.rgb(230, 143, 172);
    public static readonly lightYellow = Color.rgb(255, 255, 224);
    public static readonly lilac = Color.rgb(200, 162, 200);
    public static readonly limeColorWheel = Color.rgb(191, 255, 0);
    public static readonly limeGreen = Color.rgb(50, 205, 50);
    public static readonly limeWebX11Green = Color.rgb(0, 255, 0);
    public static readonly limerick = Color.rgb(157, 194, 9);
    public static readonly lincolnGreen = Color.rgb(25, 89, 5);
    public static readonly linen = Color.rgb(250, 240, 230);
    public static readonly lion = Color.rgb(193, 154, 107);
    public static readonly littleBoyBlue = Color.rgb(108, 160, 220);
    public static readonly liver = Color.rgb(83, 75, 79);
    public static readonly lust = Color.rgb(230, 32, 32);
    public static readonly magenta = Color.rgb(255, 0, 255);
    public static readonly magentaDye = Color.rgb(202, 31, 123);
    public static readonly magentaProcess = Color.rgb(255, 0, 144);
    public static readonly magicMint = Color.rgb(170, 240, 209);
    public static readonly magnolia = Color.rgb(248, 244, 255);
    public static readonly mahogany = Color.rgb(192, 64, 0);
    public static readonly maize = Color.rgb(251, 236, 93);
    public static readonly majorelleBlue = Color.rgb(96, 80, 220);
    public static readonly malachite = Color.rgb(11, 218, 81);
    public static readonly manatee = Color.rgb(151, 154, 170);
    public static readonly mangoTango = Color.rgb(255, 130, 67);
    public static readonly mantis = Color.rgb(116, 195, 101);
    public static readonly mardiGras = Color.rgb(136, 0, 133);
    public static readonly maroonCrayola = Color.rgb(195, 33, 72);
    public static readonly maroonHtmlCss = Color.rgb(128, 0, 0);
    public static readonly maroonX11 = Color.rgb(176, 48, 96);
    public static readonly mauve = Color.rgb(224, 176, 255);
    public static readonly mauveTaupe = Color.rgb(145, 95, 109);
    public static readonly mauvelous = Color.rgb(239, 152, 170);
    public static readonly mayaBlue = Color.rgb(115, 194, 251);
    public static readonly meatBrown = Color.rgb(229, 183, 59);
    public static readonly mediumAquamarine = Color.rgb(102, 221, 170);
    public static readonly mediumBlue = Color.rgb(0, 0, 205);
    public static readonly mediumCandyAppleRed = Color.rgb(226, 6, 44);
    public static readonly mediumCarmine = Color.rgb(175, 64, 53);
    public static readonly mediumChampagne = Color.rgb(243, 229, 171);
    public static readonly mediumElectricBlue = Color.rgb(3, 80, 150);
    public static readonly mediumJungleGreen = Color.rgb(28, 53, 45);
    public static readonly mediumLavenderMagenta = Color.rgb(221, 160, 221);
    public static readonly mediumOrchid = Color.rgb(186, 85, 211);
    public static readonly mediumPersianBlue = Color.rgb(0, 103, 165);
    public static readonly mediumPurple = Color.rgb(147, 112, 219);
    public static readonly mediumRedViolet = Color.rgb(187, 51, 133);
    public static readonly mediumRuby = Color.rgb(170, 64, 105);
    public static readonly mediumSeaGreen = Color.rgb(60, 179, 113);
    public static readonly mediumSlateBlue = Color.rgb(123, 104, 238);
    public static readonly mediumSpringBud = Color.rgb(201, 220, 135);
    public static readonly mediumSpringGreen = Color.rgb(0, 250, 154);
    public static readonly mediumTaupe = Color.rgb(103, 76, 71);
    public static readonly mediumTurquoise = Color.rgb(72, 209, 204);
    public static readonly mediumTuscanRed = Color.rgb(121, 68, 59);
    public static readonly mediumVermilion = Color.rgb(217, 96, 59);
    public static readonly mediumVioletRed = Color.rgb(199, 21, 133);
    public static readonly mellowApricot = Color.rgb(248, 184, 120);
    public static readonly mellowYellow = Color.rgb(248, 222, 126);
    public static readonly melon = Color.rgb(253, 188, 180);
    public static readonly midnightBlue = Color.rgb(25, 25, 112);
    public static readonly midnightGreenEagleGreen = Color.rgb(0, 73, 83);
    public static readonly mikadoYellow = Color.rgb(255, 196, 12);
    public static readonly mint = Color.rgb(62, 180, 137);
    public static readonly mintCream = Color.rgb(245, 255, 250);
    public static readonly mintGreen = Color.rgb(152, 255, 152);
    public static readonly mistyRose = Color.rgb(255, 228, 225);
    public static readonly moccasin = Color.rgb(250, 235, 215);
    public static readonly modeBeige = Color.rgb(150, 113, 23);
    public static readonly moonstoneBlue = Color.rgb(115, 169, 194);
    public static readonly mordantRed19 = Color.rgb(174, 12, 0);
    public static readonly mossGreen = Color.rgb(173, 223, 173);
    public static readonly mountainMeadow = Color.rgb(48, 186, 143);
    public static readonly mountbattenPink = Color.rgb(153, 122, 141);
    public static readonly msuGreen = Color.rgb(24, 69, 59);
    public static readonly mulberry = Color.rgb(197, 75, 140);
    public static readonly mustard = Color.rgb(255, 219, 88);
    public static readonly myrtle = Color.rgb(33, 66, 30);
    public static readonly nadeshikoPink = Color.rgb(246, 173, 198);
    public static readonly napierGreen = Color.rgb(42, 128, 0);
    public static readonly naplesYellow = Color.rgb(250, 218, 94);
    public static readonly navajoWhite = Color.rgb(255, 222, 173);
    public static readonly navyBlue = Color.rgb(0, 0, 128);
    public static readonly neonCarrot = Color.rgb(255, 163, 67);
    public static readonly neonFuchsia = Color.rgb(254, 65, 100);
    public static readonly neonGreen = Color.rgb(57, 255, 20);
    public static readonly newYorkPink = Color.rgb(215, 131, 127);
    public static readonly nonPhotoBlue = Color.rgb(164, 221, 237);
    public static readonly northTexasGreen = Color.rgb(5, 144, 51);
    public static readonly oceanBoatBlue = Color.rgb(0, 119, 190);
    public static readonly ochre = Color.rgb(204, 119, 34);
    public static readonly officeGreen = Color.rgb(0, 128, 0);
    public static readonly oldGold = Color.rgb(207, 181, 59);
    public static readonly oldLace = Color.rgb(253, 245, 230);
    public static readonly oldLavender = Color.rgb(121, 104, 120);
    public static readonly oldMauve = Color.rgb(103, 49, 71);
    public static readonly oldRose = Color.rgb(192, 128, 129);
    public static readonly olive = Color.rgb(128, 128, 0);
    public static readonly oliveDrab7 = Color.rgb(60, 52, 31);
    public static readonly oliveDrabWebOliveDrab3 = Color.rgb(107, 142, 35);
    public static readonly olivine = Color.rgb(154, 185, 115);
    public static readonly onyx = Color.rgb(53, 56, 57);
    public static readonly operaMauve = Color.rgb(183, 132, 167);
    public static readonly orangeColorWheel = Color.rgb(255, 127, 0);
    public static readonly orangePeel = Color.rgb(255, 159, 0);
    public static readonly orangeRed = Color.rgb(255, 69, 0);
    public static readonly orangeRyb = Color.rgb(251, 153, 2);
    public static readonly orangeWebColor = Color.rgb(255, 165, 0);
    public static readonly orchid = Color.rgb(218, 112, 214);
    public static readonly otterBrown = Color.rgb(101, 67, 33);
    public static readonly ouCrimsonRed = Color.rgb(153, 0, 0);
    public static readonly outerSpace = Color.rgb(65, 74, 76);
    public static readonly outrageousOrange = Color.rgb(255, 110, 74);
    public static readonly oxfordBlue = Color.rgb(0, 33, 71);
    public static readonly pakistanGreen = Color.rgb(0, 102, 0);
    public static readonly palatinateBlue = Color.rgb(39, 59, 226);
    public static readonly palatinatePurple = Color.rgb(104, 40, 96);
    public static readonly paleAqua = Color.rgb(188, 212, 230);
    public static readonly paleBlue = Color.rgb(175, 238, 238);
    public static readonly paleBrown = Color.rgb(152, 118, 84);
    public static readonly paleCarmine = Color.rgb(175, 64, 53);
    public static readonly paleCerulean = Color.rgb(155, 196, 226);
    public static readonly paleChestnut = Color.rgb(221, 173, 175);
    public static readonly paleCopper = Color.rgb(218, 138, 103);
    public static readonly paleCornflowerBlue = Color.rgb(171, 205, 239);
    public static readonly paleGold = Color.rgb(230, 190, 138);
    public static readonly paleGoldenrod = Color.rgb(238, 232, 170);
    public static readonly paleGreen = Color.rgb(152, 251, 152);
    public static readonly paleLavender = Color.rgb(220, 208, 255);
    public static readonly paleMagenta = Color.rgb(249, 132, 229);
    public static readonly palePink = Color.rgb(250, 218, 221);
    public static readonly palePlum = Color.rgb(221, 160, 221);
    public static readonly paleRedViolet = Color.rgb(219, 112, 147);
    public static readonly paleRobinEggBlue = Color.rgb(150, 222, 209);
    public static readonly paleSilver = Color.rgb(201, 192, 187);
    public static readonly paleSpringBud = Color.rgb(236, 235, 189);
    public static readonly paleTaupe = Color.rgb(188, 152, 126);
    public static readonly paleVioletRed = Color.rgb(219, 112, 147);
    public static readonly pansyPurple = Color.rgb(120, 24, 74);
    public static readonly papayaWhip = Color.rgb(255, 239, 213);
    public static readonly parisGreen = Color.rgb(80, 200, 120);
    public static readonly pastelBlue = Color.rgb(174, 198, 207);
    public static readonly pastelBrown = Color.rgb(131, 105, 83);
    public static readonly pastelGray = Color.rgb(207, 207, 196);
    public static readonly pastelGreen = Color.rgb(119, 221, 119);
    public static readonly pastelMagenta = Color.rgb(244, 154, 194);
    public static readonly pastelOrange = Color.rgb(255, 179, 71);
    public static readonly pastelPink = Color.rgb(222, 165, 164);
    public static readonly pastelPurple = Color.rgb(179, 158, 181);
    public static readonly pastelRed = Color.rgb(255, 105, 97);
    public static readonly pastelViolet = Color.rgb(203, 153, 201);
    public static readonly pastelYellow = Color.rgb(253, 253, 150);
    public static readonly patriarch = Color.rgb(128, 0, 128);
    public static readonly payneSGrey = Color.rgb(83, 104, 120);
    public static readonly peach = Color.rgb(255, 229, 180);
    public static readonly peachCrayola = Color.rgb(255, 203, 164);
    public static readonly peachOrange = Color.rgb(255, 204, 153);
    public static readonly peachPuff = Color.rgb(255, 218, 185);
    public static readonly peachYellow = Color.rgb(250, 223, 173);
    public static readonly pear = Color.rgb(209, 226, 49);
    public static readonly pearl = Color.rgb(234, 224, 200);
    public static readonly pearlAqua = Color.rgb(136, 216, 192);
    public static readonly pearlyPurple = Color.rgb(183, 104, 162);
    public static readonly peridot = Color.rgb(230, 226, 0);
    public static readonly periwinkle = Color.rgb(204, 204, 255);
    public static readonly persianBlue = Color.rgb(28, 57, 187);
    public static readonly persianGreen = Color.rgb(0, 166, 147);
    public static readonly persianIndigo = Color.rgb(50, 18, 122);
    public static readonly persianOrange = Color.rgb(217, 144, 88);
    public static readonly persianPink = Color.rgb(247, 127, 190);
    public static readonly persianPlum = Color.rgb(112, 28, 28);
    public static readonly persianRed = Color.rgb(204, 51, 51);
    public static readonly persianRose = Color.rgb(254, 40, 162);
    public static readonly persimmon = Color.rgb(236, 88, 0);
    public static readonly peru = Color.rgb(205, 133, 63);
    public static readonly phlox = Color.rgb(223, 0, 255);
    public static readonly phthaloBlue = Color.rgb(0, 15, 137);
    public static readonly phthaloGreen = Color.rgb(18, 53, 36);
    public static readonly piggyPink = Color.rgb(253, 221, 230);
    public static readonly pineGreen = Color.rgb(1, 121, 111);
    public static readonly pink = Color.rgb(255, 192, 203);
    public static readonly pinkLace = Color.rgb(255, 221, 244);
    public static readonly pinkOrange = Color.rgb(255, 153, 102);
    public static readonly pinkPearl = Color.rgb(231, 172, 207);
    public static readonly pinkSherbet = Color.rgb(247, 143, 167);
    public static readonly pistachio = Color.rgb(147, 197, 114);
    public static readonly platinum = Color.rgb(229, 228, 226);
    public static readonly plumTraditional = Color.rgb(142, 69, 133);
    public static readonly plumWeb = Color.rgb(221, 160, 221);
    public static readonly portlandOrange = Color.rgb(255, 90, 54);
    public static readonly powderBlueWeb = Color.rgb(176, 224, 230);
    public static readonly princetonOrange = Color.rgb(255, 143, 0);
    public static readonly prune = Color.rgb(112, 28, 28);
    public static readonly prussianBlue = Color.rgb(0, 49, 83);
    public static readonly psychedelicPurple = Color.rgb(223, 0, 255);
    public static readonly puce = Color.rgb(204, 136, 153);
    public static readonly pumpkin = Color.rgb(255, 117, 24);
    public static readonly purpleHeart = Color.rgb(105, 53, 156);
    public static readonly purpleHtmlCss = Color.rgb(128, 0, 128);
    public static readonly purpleMountainMajesty = Color.rgb(150, 120, 182);
    public static readonly purpleMunsell = Color.rgb(159, 0, 197);
    public static readonly purplePizzazz = Color.rgb(254, 78, 218);
    public static readonly purpleTaupe = Color.rgb(80, 64, 77);
    public static readonly purpleX11 = Color.rgb(160, 32, 240);
    public static readonly quartz = Color.rgb(81, 72, 79);
    public static readonly rackley = Color.rgb(93, 138, 168);
    public static readonly radicalRed = Color.rgb(255, 53, 94);
    public static readonly rajah = Color.rgb(251, 171, 96);
    public static readonly raspberry = Color.rgb(227, 11, 93);
    public static readonly raspberryGlace = Color.rgb(145, 95, 109);
    public static readonly raspberryPink = Color.rgb(226, 80, 152);
    public static readonly raspberryRose = Color.rgb(179, 68, 108);
    public static readonly rawUmber = Color.rgb(130, 102, 68);
    public static readonly razzleDazzleRose = Color.rgb(255, 51, 204);
    public static readonly razzmatazz = Color.rgb(227, 37, 107);
    public static readonly red = Color.rgb(255, 0, 0);
    public static readonly redBrown = Color.rgb(165, 42, 42);
    public static readonly redDevil = Color.rgb(134, 1, 17);
    public static readonly redMunsell = Color.rgb(242, 0, 60);
    public static readonly redNcs = Color.rgb(196, 2, 51);
    public static readonly redOrange = Color.rgb(255, 83, 73);
    public static readonly redPigment = Color.rgb(237, 28, 36);
    public static readonly redRyb = Color.rgb(254, 39, 18);
    public static readonly redViolet = Color.rgb(199, 21, 133);
    public static readonly redwood = Color.rgb(171, 78, 82);
    public static readonly regalia = Color.rgb(82, 45, 128);
    public static readonly resolutionBlue = Color.rgb(0, 35, 135);
    public static readonly richBlack = Color.rgb(0, 64, 64);
    public static readonly richBrilliantLavender = Color.rgb(241, 167, 254);
    public static readonly richCarmine = Color.rgb(215, 0, 64);
    public static readonly richElectricBlue = Color.rgb(8, 146, 208);
    public static readonly richLavender = Color.rgb(167, 107, 207);
    public static readonly richLilac = Color.rgb(182, 102, 210);
    public static readonly richMaroon = Color.rgb(176, 48, 96);
    public static readonly rifleGreen = Color.rgb(65, 72, 51);
    public static readonly robinEggBlue = Color.rgb(0, 204, 204);
    public static readonly rose = Color.rgb(255, 0, 127);
    public static readonly roseBonbon = Color.rgb(249, 66, 158);
    public static readonly roseEbony = Color.rgb(103, 72, 70);
    public static readonly roseGold = Color.rgb(183, 110, 121);
    public static readonly roseMadder = Color.rgb(227, 38, 54);
    public static readonly rosePink = Color.rgb(255, 102, 204);
    public static readonly roseQuartz = Color.rgb(170, 152, 169);
    public static readonly roseTaupe = Color.rgb(144, 93, 93);
    public static readonly roseVale = Color.rgb(171, 78, 82);
    public static readonly rosewood = Color.rgb(101, 0, 11);
    public static readonly rossoCorsa = Color.rgb(212, 0, 0);
    public static readonly rosyBrown = Color.rgb(188, 143, 143);
    public static readonly royalAzure = Color.rgb(0, 56, 168);
    public static readonly royalBlueTraditional = Color.rgb(0, 35, 102);
    public static readonly royalBlueWeb = Color.rgb(65, 105, 225);
    public static readonly royalFuchsia = Color.rgb(202, 44, 146);
    public static readonly royalPurple = Color.rgb(120, 81, 169);
    public static readonly royalYellow = Color.rgb(250, 218, 94);
    public static readonly rubineRed = Color.rgb(209, 0, 86);
    public static readonly ruby = Color.rgb(224, 17, 95);
    public static readonly rubyRed = Color.rgb(155, 17, 30);
    public static readonly ruddy = Color.rgb(255, 0, 40);
    public static readonly ruddyBrown = Color.rgb(187, 101, 40);
    public static readonly ruddyPink = Color.rgb(225, 142, 150);
    public static readonly rufous = Color.rgb(168, 28, 7);
    public static readonly russet = Color.rgb(128, 70, 27);
    public static readonly rust = Color.rgb(183, 65, 14);
    public static readonly rustyRed = Color.rgb(218, 44, 67);
    public static readonly sacramentoStateGreen = Color.rgb(0, 86, 63);
    public static readonly saddleBrown = Color.rgb(139, 69, 19);
    public static readonly safetyOrangeBlazeOrange = Color.rgb(255, 103, 0);
    public static readonly saffron = Color.rgb(244, 196, 48);
    public static readonly salmon = Color.rgb(255, 140, 105);
    public static readonly salmonPink = Color.rgb(255, 145, 164);
    public static readonly sand = Color.rgb(194, 178, 128);
    public static readonly sandDune = Color.rgb(150, 113, 23);
    public static readonly sandstorm = Color.rgb(236, 213, 64);
    public static readonly sandyBrown = Color.rgb(244, 164, 96);
    public static readonly sandyTaupe = Color.rgb(150, 113, 23);
    public static readonly sangria = Color.rgb(146, 0, 10);
    public static readonly sapGreen = Color.rgb(80, 125, 42);
    public static readonly sapphire = Color.rgb(15, 82, 186);
    public static readonly sapphireBlue = Color.rgb(0, 103, 165);
    public static readonly satinSheenGold = Color.rgb(203, 161, 53);
    public static readonly scarlet = Color.rgb(255, 36, 0);
    public static readonly scarletCrayola = Color.rgb(253, 14, 53);
    public static readonly schoolBusYellow = Color.rgb(255, 216, 0);
    public static readonly screaminGreen = Color.rgb(118, 255, 122);
    public static readonly seaBlue = Color.rgb(0, 105, 148);
    public static readonly seaGreen = Color.rgb(46, 139, 87);
    public static readonly sealBrown = Color.rgb(50, 20, 20);
    public static readonly seashell = Color.rgb(255, 245, 238);
    public static readonly selectiveYellow = Color.rgb(255, 186, 0);
    public static readonly sepia = Color.rgb(112, 66, 20);
    public static readonly shadow = Color.rgb(138, 121, 93);
    public static readonly shamrockGreen = Color.rgb(0, 158, 96);
    public static readonly shockingPink = Color.rgb(252, 15, 192);
    public static readonly shockingPinkCrayola = Color.rgb(255, 111, 255);
    public static readonly sienna = Color.rgb(136, 45, 23);
    public static readonly silver = Color.rgb(192, 192, 192);
    public static readonly sinopia = Color.rgb(203, 65, 11);
    public static readonly skobeloff = Color.rgb(0, 116, 116);
    public static readonly skyBlue = Color.rgb(135, 206, 235);
    public static readonly skyMagenta = Color.rgb(207, 113, 175);
    public static readonly slateBlue = Color.rgb(106, 90, 205);
    public static readonly slateGray = Color.rgb(112, 128, 144);
    public static readonly smaltDarkPowderBlue = Color.rgb(0, 51, 153);
    public static readonly smokeyTopaz = Color.rgb(147, 61, 65);
    public static readonly smokyBlack = Color.rgb(16, 12, 8);
    public static readonly snow = Color.rgb(255, 250, 250);
    public static readonly spiroDiscoBall = Color.rgb(15, 192, 252);
    public static readonly springBud = Color.rgb(167, 252, 0);
    public static readonly springGreen = Color.rgb(0, 255, 127);
    public static readonly stPatrickSBlue = Color.rgb(35, 41, 122);
    public static readonly steelBlue = Color.rgb(70, 130, 180);
    public static readonly stilDeGrainYellow = Color.rgb(250, 218, 94);
    public static readonly stizza = Color.rgb(153, 0, 0);
    public static readonly stormcloud = Color.rgb(79, 102, 106);
    public static readonly straw = Color.rgb(228, 217, 111);
    public static readonly sunglow = Color.rgb(255, 204, 51);
    public static readonly sunset = Color.rgb(250, 214, 165);
    public static readonly tan = Color.rgb(210, 180, 140);
    public static readonly tangelo = Color.rgb(249, 77, 0);
    public static readonly tangerine = Color.rgb(242, 133, 0);
    public static readonly tangerineYellow = Color.rgb(255, 204, 0);
    public static readonly tangoPink = Color.rgb(228, 113, 122);
    public static readonly taupe = Color.rgb(72, 60, 50);
    public static readonly taupeGray = Color.rgb(139, 133, 137);
    public static readonly teaGreen = Color.rgb(208, 240, 192);
    public static readonly teaRoseOrange = Color.rgb(248, 131, 121);
    public static readonly teaRoseRose = Color.rgb(244, 194, 194);
    public static readonly teal = Color.rgb(0, 128, 128);
    public static readonly tealBlue = Color.rgb(54, 117, 136);
    public static readonly tealGreen = Color.rgb(0, 130, 127);
    public static readonly telemagenta = Color.rgb(207, 52, 118);
    public static readonly tennTawny = Color.rgb(205, 87, 0);
    public static readonly terraCotta = Color.rgb(226, 114, 91);
    public static readonly thistle = Color.rgb(216, 191, 216);
    public static readonly thulianPink = Color.rgb(222, 111, 161);
    public static readonly tickleMePink = Color.rgb(252, 137, 172);
    public static readonly tiffanyBlue = Color.rgb(10, 186, 181);
    public static readonly tigerSEye = Color.rgb(224, 141, 60);
    public static readonly timberwolf = Color.rgb(219, 215, 210);
    public static readonly titaniumYellow = Color.rgb(238, 230, 0);
    public static readonly tomato = Color.rgb(255, 99, 71);
    public static readonly toolbox = Color.rgb(116, 108, 192);
    public static readonly topaz = Color.rgb(255, 200, 124);
    public static readonly tractorRed = Color.rgb(253, 14, 53);
    public static readonly trolleyGrey = Color.rgb(128, 128, 128);
    public static readonly tropicalRainForest = Color.rgb(0, 117, 94);
    public static readonly trueBlue = Color.rgb(0, 115, 207);
    public static readonly tuftsBlue = Color.rgb(65, 125, 193);
    public static readonly tumbleweed = Color.rgb(222, 170, 136);
    public static readonly turkishRose = Color.rgb(181, 114, 129);
    public static readonly turquoise = Color.rgb(48, 213, 200);
    public static readonly turquoiseBlue = Color.rgb(0, 255, 239);
    public static readonly turquoiseGreen = Color.rgb(160, 214, 180);
    public static readonly tuscanRed = Color.rgb(124, 72, 72);
    public static readonly twilightLavender = Color.rgb(138, 73, 107);
    public static readonly tyrianPurple = Color.rgb(102, 2, 60);
    public static readonly uaBlue = Color.rgb(0, 51, 170);
    public static readonly uaRed = Color.rgb(217, 0, 76);
    public static readonly ube = Color.rgb(136, 120, 195);
    public static readonly uclaBlue = Color.rgb(83, 104, 149);
    public static readonly uclaGold = Color.rgb(255, 179, 0);
    public static readonly ufoGreen = Color.rgb(60, 208, 112);
    public static readonly ultraPink = Color.rgb(255, 111, 255);
    public static readonly ultramarine = Color.rgb(18, 10, 143);
    public static readonly ultramarineBlue = Color.rgb(65, 102, 245);
    public static readonly umber = Color.rgb(99, 81, 71);
    public static readonly unbleachedSilk = Color.rgb(255, 221, 202);
    public static readonly unitedNationsBlue = Color.rgb(91, 146, 229);
    public static readonly universityOfCaliforniaGold = Color.rgb(183, 135, 39);
    public static readonly unmellowYellow = Color.rgb(255, 255, 102);
    public static readonly upForestGreen = Color.rgb(1, 68, 33);
    public static readonly upMaroon = Color.rgb(123, 17, 19);
    public static readonly upsdellRed = Color.rgb(174, 32, 41);
    public static readonly urobilin = Color.rgb(225, 173, 33);
    public static readonly usafaBlue = Color.rgb(0, 79, 152);
    public static readonly uscCardinal = Color.rgb(153, 0, 0);
    public static readonly uscGold = Color.rgb(255, 204, 0);
    public static readonly utahCrimson = Color.rgb(211, 0, 63);
    public static readonly vanilla = Color.rgb(243, 229, 171);
    public static readonly vegasGold = Color.rgb(197, 179, 88);
    public static readonly venetianRed = Color.rgb(200, 8, 21);
    public static readonly verdigris = Color.rgb(67, 179, 174);
    public static readonly vermilionCinnabar = Color.rgb(227, 66, 52);
    public static readonly vermilionPlochere = Color.rgb(217, 96, 59);
    public static readonly veronica = Color.rgb(160, 32, 240);
    public static readonly violet = Color.rgb(143, 0, 255);
    public static readonly violetBlue = Color.rgb(50, 74, 178);
    public static readonly violetColorWheel = Color.rgb(127, 0, 255);
    public static readonly violetRyb = Color.rgb(134, 1, 175);
    public static readonly violetWeb = Color.rgb(238, 130, 238);
    public static readonly viridian = Color.rgb(64, 130, 109);
    public static readonly vividAuburn = Color.rgb(146, 39, 36);
    public static readonly vividBurgundy = Color.rgb(159, 29, 53);
    public static readonly vividCerise = Color.rgb(218, 29, 129);
    public static readonly vividTangerine = Color.rgb(255, 160, 137);
    public static readonly vividViolet = Color.rgb(159, 0, 255);
    public static readonly warmBlack = Color.rgb(0, 66, 66);
    public static readonly waterspout = Color.rgb(164, 244, 249);
    public static readonly wenge = Color.rgb(100, 84, 82);
    public static readonly wheat = Color.rgb(245, 222, 179);
    public static readonly white = Color.rgb(255, 255, 255);
    public static readonly whiteSmoke = Color.rgb(245, 245, 245);
    public static readonly wildBlueYonder = Color.rgb(162, 173, 208);
    public static readonly wildStrawberry = Color.rgb(255, 67, 164);
    public static readonly wildWatermelon = Color.rgb(252, 108, 133);
    public static readonly wine = Color.rgb(114, 47, 55);
    public static readonly wineDregs = Color.rgb(103, 49, 71);
    public static readonly wisteria = Color.rgb(201, 160, 220);
    public static readonly woodBrown = Color.rgb(193, 154, 107);
    public static readonly xanadu = Color.rgb(115, 134, 120);
    public static readonly yaleBlue = Color.rgb(15, 77, 146);
    public static readonly yellow = Color.rgb(255, 255, 0);
    public static readonly yellowGreen = Color.rgb(154, 205, 50);
    public static readonly yellowMunsell = Color.rgb(239, 204, 0);
    public static readonly yellowNcs = Color.rgb(255, 211, 0);
    public static readonly yellowOrange = Color.rgb(255, 174, 66);
    public static readonly yellowProcess = Color.rgb(255, 239, 0);
    public static readonly yellowRyb = Color.rgb(254, 254, 51);
    public static readonly zaffre = Color.rgb(0, 20, 168);
    public static readonly zinnwalditeBrown = Color.rgb(44, 22, 8);

    public readonly space: ColorSpace;
    public readonly data: readonly number[];

    constructor(space: ColorSpace, data: readonly number[]) {
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
        return createComplementaryScheme(this);
    }

    get analogousComplements() {
        return createAnalogousComplementaryScheme(this);
    }

    get splitComplements() {
        return createSplitComplementaryScheme(this);
    }

    get triadicComplements() {
        return createTriadicComplementaryScheme(this);
    }

    get squareComplements() {
        return createSquareComplementaryScheme(this);
    }

    get tetradicComplements() {
        return createTetradicComplementaryScheme(this);
    }

    public isSpace(space: ColorSpace) {
        return isSpace(this, space);
    }

    public isRgb() {
        return isRgb(this);
    }

    public isRgba() {
        return isRgba(this);
    }

    public isAnyRgb() {
        return isAnyRgb(this);
    }

    public isHsl() {
        return isHsl(this);
    }

    public isHsla() {
        return isHsla(this);
    }

    public isAnyHsl() {
        return isAnyHsl(this);
    }

    public isAlpha() {
        return isAlpha(this);
    }

    public toRgb() {
        return toRgb(this);
    }

    public toRgba() {
        return toRgba(this);
    }

    public toAnyRgb() {
        return toAnyRgb(this);
    }

    public toHsl() {
        return toHsl(this);
    }

    public toHsla() {
        return toHsla(this);
    }

    public toAnyHsl() {
        return toAnyHsl(this);
    }

    public toAnyAlpha() {
        return toAnyAlpha(this);
    }

    public toAnyOpaque() {
        return toAnyOpaque(this);
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

    public invert() {
        return invert(this);
    }

    public grayscale() {
        return grayscale(this);
    }

    public complement(value: number = 180) {
        return complement(this, value);
    }

    public mix(color: Color, mode: MixMode = MixMode.RGB_SUBTRACTIVE) {
        return mix(this, color, mode);
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

    public fadeIn(value: number) {
        return fadeIn(this, value);
    }

    public fadeOut(value: number) {
        return fadeOut(this, value);
    }

    public createScheme<K extends string, T extends Scheme<K>>(
        keys: readonly K[],
        generate: SchemeGenerator,
        options?: SchemeOptions,
    ): T {
        return createScheme(this, keys, generate, options);
    }

    public createLightShades(options?: SchemeOptions) {
        return createLightShadeScheme(this, options);
    }

    public createDarkShades(options?: SchemeOptions) {
        return createDarkShadeScheme(this, options);
    }

    public createShades(options?: SchemeOptions) {
        return createShadeScheme(this, options);
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

    public static create(space: ColorSpace, data: ReadonlyArray<number>) {
        return new Color(space, data);
    }

    public static rgb(r: number, g: number, b: number) {
        return Color.create(ColorSpace.RGB, [r, g, b]);
    }

    public static rgba(r: number, g: number, b: number, a: number) {
        return Color.create(ColorSpace.RGBA, [r, g, b, a]);
    }

    public static hsl(h: number, s: number, l: number) {
        return Color.create(ColorSpace.HSL, [h, s, l]);
    }

    public static hsla(h: number, s: number, l: number, a: number) {
        return Color.create(ColorSpace.HSLA, [h, s, l, a]);
    }

    public static parse(value: string) {
        if (value in Color && Color[value as keyof typeof Color] instanceof Color) {
            return Color[value as keyof typeof Color] as Color;
        }
        if (value.startsWith('#')) {
            return parseHexExpression(value);
        }
        return parseFunctionExpression(value);
    }
}

export function isSpace(color: Color, space: ColorSpace) {
    return color.space === space;
}

export function isRgb(color: Color) {
    return isSpace(color, ColorSpace.RGB);
}

export function isRgba(color: Color) {
    return isSpace(color, ColorSpace.RGBA);
}

export function isAnyRgb(color: Color) {
    return isRgb(color) || isRgba(color);
}

export function isHsl(color: Color) {
    return isSpace(color, ColorSpace.HSL);
}

export function isHsla(color: Color) {
    return isSpace(color, ColorSpace.HSLA);
}

export function isAnyHsl(color: Color) {
    return isHsl(color) || isHsla(color);
}

export function isAlpha(color: Color) {
    return isRgba(color) || isHsla(color);
}

export function toRgb(color: Color) {
    return toSpace(color, ColorSpace.RGB);
}

export function toRgba(color: Color) {
    return toSpace(color, ColorSpace.RGBA);
}

export function toAnyRgb(color: Color) {
    return isAlpha(color) ? toRgba(color) : toRgb(color);
}

export function toHsl(color: Color) {
    return toSpace(color, ColorSpace.HSL);
}

export function toHsla(color: Color) {
    return toSpace(color, ColorSpace.HSLA);
}

export function toAnyHsl(color: Color) {
    return isAlpha(color) ? toHsla(color) : toHsl(color);
}

export function toAnyAlpha(color: Color) {
    if (isAnyHsl(color)) {
        return toHsla(color);
    }
    return toRgba(color);
}

export function toAnyOpaque(color: Color) {
    if (isAnyHsl(color)) {
        return toHsl(color);
    }
    return toRgb(color);
}

export function getRed(color: Color) {
    return toAnyRgb(color).data[0];
}

export function withRed(color: Color, value: number) {
    const [, g, b, a] = toAnyRgb(color).data;
    return a !== undefined ? Color.rgba(value, g, b, a) : Color.rgb(value, g, b);
}

export function getGreen(color: Color) {
    return toAnyRgb(color).data[1];
}

export function withGreen(color: Color, value: number) {
    const [r, , b, a] = toAnyRgb(color).data;
    return a !== undefined ? Color.rgba(r, value, b, a) : Color.rgb(r, value, b);
}

export function getBlue(color: Color) {
    return toAnyRgb(color).data[2];
}

export function withBlue(color: Color, value: number) {
    const [r, g, , a] = toAnyRgb(color).data;
    return a !== undefined ? Color.rgba(r, g, value, a) : Color.rgb(r, g, value);
}

export function getHue(color: Color) {
    return toAnyHsl(color).data[0];
}

export function withHue(color: Color, value: number) {
    const [, s, l, a] = toAnyHsl(color).data;
    return a !== undefined ? Color.hsla(value, s, l, a) : Color.hsl(value, s, l);
}

export function getSaturation(color: Color) {
    return toAnyHsl(color).data[1];
}

export function withSaturation(color: Color, value: number) {
    const [h, , l, a] = toAnyHsl(color).data;
    return a !== undefined ? Color.hsla(h, value, l, a) : Color.hsl(h, value, l);
}

export function getLightness(color: Color) {
    return toAnyHsl(color).data[2];
}

export function withLightness(color: Color, value: number) {
    const [h, s, , a] = toAnyHsl(color).data;
    return a !== undefined ? Color.hsla(h, s, value, a) : Color.hsl(h, s, value);
}

export function getOpacity(color: Color) {
    const { data } = toAnyAlpha(color);
    return data[data.length - 1];
}

export function withOpacity(color: Color, value: number) {
    const { space, data } = toAnyAlpha(color);
    return Color.create(space, [...data.slice(0, data.length - 1), value]);
}

export function invert(color: Color) {
    const [r, g, b, a] = toAnyRgb(color).data;
    const [rScale, gScale, bScale] = getSpaceScales(ColorSpace.RGB);
    return a !== undefined
        ? Color.rgba(rScale - r, gScale - g, bScale - b, a)
        : Color.rgb(rScale - r, gScale - g, bScale - b);
}

export function grayscale(color: Color) {
    return withSaturation(color, 0);
}

export function complement(color: Color, value: number = 180) {
    const hue = getHue(color);
    const [hScale] = getSpaceScales(ColorSpace.HSL);
    return withHue(color, rotateValue(hue + value, hScale));
}

export function lighten(color: Color, value: number) {
    return withLightness(color, getLightness(color) + value);
}

export function darken(color: Color, value: number) {
    return withLightness(color, getLightness(color) - value);
}

export function tint(color: Color, value: number) {
    return withSaturation(color, getSaturation(color) + value);
}

export function tone(color: Color, value: number) {
    return withSaturation(color, getSaturation(color) - value);
}

export function fadeIn(color: Color, value: number) {
    return withOpacity(color, getOpacity(color) + value);
}

export function fadeOut(color: Color, value: number) {
    return withOpacity(color, getOpacity(color) - value);
}

export function toString(color: Color) {
    const rgbColor = toAnyRgb(color);
    return isAlpha(rgbColor) && getOpacity(rgbColor) < 1
        ? toFunctionExpression(rgbColor)
        : toHexExpression(rgbColor);
}

export function dye(literals: TemplateStringsArray) {
    return Color.parse(literals.join(''));
}
