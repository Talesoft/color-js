Color JS
========

[![Build status](https://img.shields.io/travis/talesoft/color-js/master.svg?style=flat-square)](https://travis-ci.org/talesoft/color-js)
[![Coverage](https://img.shields.io/codeclimate/coverage/Talesoft/color-js.svg)](https://codecov.io/github/Talesoft/color-js?branch=master)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@talesoft/color.svg)](https://snyk.io/package/npm/@talesoft/color)

A color manipulation and conversion library.

It's supposed to ease up creation of JS-based frontend themes when using CSS in JavaScript.

It's written for React's Styled Components and Emotion CSS and designed to work well with it,
but does work well anywhere where you need color manipulation and automatic
generation of color schemes.

What can it do
==============

- **Parsing of different color formats**
  - **866** different color names ([List](https://github.com/codebrainz/color-names/blob/master/output/colors.csv))
  - Hexadecimal colors (e.g. `#f0a` or `#ef0bac`)
  - CSS color functions (e.g. `rgb(255, 127, 0)` or `hsla(180, 1, .5)`)
- **Convert colors between different color spaces. Supported/planned spaces:**
  - [x] RGB/RGBA
  - [x] HSL/HSLA
  - [ ] HSV/HSVA
  - [ ] CMYK Approximation
  - [ ] CIE-XYZ
  - [ ] CIE-LAB
- **Retrieving information from colors**
  - Get RGB information (amount of red, green and blue)
  - Get HSL information (hue/color tone, saturation, lightness)
  - Get alpha information (transparency)
- **Color manipulation**
  - darken, lighten, saturate and desaturate colors
  - Change color properties like the amount of red or green
  - inverse and mix colors
  - Change transparency of colors (fade in, fade out)
  - Generate complementary or similar colors
- **Easily generate color schemes and palettes from base colors**
  - Complementary schemes (playing with hues)
  - Shades, tints and tones of colors

Installation
------------

```bash
npm i @talesoft/color
```

TypeScript supported by default.

Usage
-----

Directly access known colors and manipulate them:

```typescript
import Color from '@talesoft/color';

const darkRed = Color.red.darken(.2);
console.log(`Dark red is: ${darkRed}`); // "Dark red is: #900"
```

Works well with e.g. Styled-Components/Emotion CSS for React:

```typescript
const StyledDiv = styled.div`
    background-color: ${Color.mediumCarmine.darken(.1).fadeOut(.2)};
    color: ${Color.palatinatePurple};
`;
```

Use the `dye` template tag or `Color.parse` to quickly parse and modify own colors.

```typescript
import Color, { dye } from '@talesoft/color';

const darkRed = dye`#f00`.darken(.2);
console.log(`Dark red is: ${darkRed}`);

const darkGreen = Color.parse('rgb(0, 255, 0)').darken(.2);
console.log(`Dark green is: ${darkGreen}`);
```

`Color.parse` and `dye` support most commonly known ways to write colors

```typescript
import Color, { dye } from '@talesoft/color';

const red = Color.parse('#f00');

const green = dye`#00ff00`;

const green = dye`green`;

const yellow = dye`rgb(255, 255, 0)`;

const redToo = dye`hsl(0, 1, .5)`;

// Percent values are allowed anywhere

const redAgain = dye`rgb(100%, 0%, 0%)`;
```

Pick from a growing list of color manipulation functions

```typescript
const color = Color.pastelYellow;

// Get RGB Values
console.log(color.red, color.green, color.blue); // 253, 253, 150

// Get HSL Values
console.log(color.hue, color.saturation, color.lightness); // 60, 0.790..., 0.962...

// Get the transparency/opacity
console.log(color.opacity); // 1

// Modify Red value
color = color.withRed(255);

// Modify Green Value
color = color.withGreen(255);

// Modify Blue value
color = color.withBlue(255);

// Modify Hue value (color tone)
color = color.withHue(180);

// Modify saturation
color = color.withSaturation(.4);

// Modify lightness
color = color.withLightness(.2);

// Modify opacity/transparency
color = color.withOpacity(.5);

// Get complementary color
color = color.complement();

// Mix colors
color = color.mix(Color.red); // Using subtractive model by default
color = color.mix(Color.red, MixMode.RGB_ADDITIVE);

// Lighten/darken a color
color = color.lighten(.1);
color = color.darken(.2);

// Tint or tone colors (increase or decrease saturation)
color = color.tint(.1);
color = color.tone(.2);

// Invert a color
color = color.invert();

// Get the grayscale version of color
color = color.grayscale();

// Increase/decrease opacity of a color
color = color.fadeIn(.2);
color = color.fadeOut(.1);

// Cast to strings/output
console.log(color.toFunctionExpression()); // e.g. "rgb(255,43,45)"
console.log(color.toHexExpression()); // e.g. "#34ca3f"

// Perfectly fitting string representation for CSS
console.log(color.toString());
console.log(`Color: ${color}`);
console.log('Color: ' + color);
```

Easily create automatically generated color schemes from your colors:

```typescript
import { dye } from '@talesoft/color';

const { primary, secondary } = dye`#f00`.complements;
// primary will be red, secondary will be green (the complementary color)

const shadesOfGrey = Color.gray.shades;
shadesOfGrey.lightest;
shadesOfGrey.lighter;
shadesOfGrey.light;
shadesOfGrey.normal
shadesOfGrey.dark;
shadesOfGrey.darker;
shadesOfGrey.darkest;

// Complex hue rotation schemes are supported
const {
    primary,
    secondary,
    tertiary,
    quartenary
} = dye`#ce5a62`.tetradicComplements;

// Easily run your own scheme
import { darken } from '@talesoft/color';

const { firstShade, secondShade, thirdShade } = dye`#ce5a62`.createScheme(
    ['firstShade','secondShade','thirdShade'],
    darken,
    { start: .2, step: .2},
);
```

Contributing
------------

Before contributing, check out the [Contribution Guidelines][contribution-guidelines]

Requires: [npm][nodejs-download]

```bash
// Pull project
git clone https://github.com/Talesoft/color-js

// Enter project directory
cd color-js

// Install development dependencies
npm install

// ... make your changes ...

// Run tests
npm run test

// Lint
npm run lint

// Fix linting problems
npm run lint:fix

// Build
npm run build

// ... create branch, commit, push, merge request etc. ...
```

[contribution-guidelines]: https://github.com/Talesoft/color-js/blob/master/CONTRIBUTING.md
[nodejs-download]: https://nodejs.org/en/
