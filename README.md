Color JS
========

[![Build status](https://img.shields.io/travis/talesoft/color-js/master.svg?style=flat-square)](https://travis-ci.org/talesoft/color-js)
[![Coverage](https://img.shields.io/codeclimate/coverage/Talesoft/color-js.svg)](https://codecov.io/github/Talesoft/color-js?branch=master)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@talesoft/color.svg)](https://snyk.io/package/npm/@talesoft/color)

A color manipulation and conversion library.

Installation
------------

```bash
npm i @talesoft/color
```

Usage
-----

Color JS makes color manipulation a breeze.

```typescript
import { Color } from '@talesoft/color';

const darkRed = Color.red.darken(.5);

console.log(`Dark red is: ${darkRed}`); // "Dark red is: #900"
```

Use `dye` to quickly create and modify own colors.

```typescript
import { dye } from '@talesoft/color';

const darkRed = dye`#f00`.darken(.5);

console.log(`Dark red is: ${darkRed}`);
```

Contributing
------------

Before contributing, check out the [Contribution Guidelines][contribution-guidelines]

Requires: [npm][nodejs-download]

```bash
// Pull project
git clone https://github.com/Talesoft/tick-js

// Enter project directory
cd geometry-js

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

[contribution-guidelines]: https://...coming-soon...
[nodejs-download]: https://nodejs.org/en/



