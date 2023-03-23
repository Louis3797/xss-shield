<div align="center">

  <h1>xss-shield</h1>
  
  <p>
   This package provides a middleware for Express.js that helps protect against cross-site scripting (XSS) attacks. It's built on top of the <a href="https://www.npmjs.com/package/xss">xss module</a> and is written in TypeScript.
 
  </p>
  
  
<!-- Badges -->
<p>
  <a href="https://github.com/Louis3797/xss-shield/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/Louis3797/xss-shield" alt="contributors" />
  </a>
  <a href="">
    <img src="https://img.shields.io/github/last-commit/Louis3797/xss-shield" alt="last update" />
  </a>
  <a href="https://github.com/Louis3797/xss-shield/network/members">
    <img src="https://img.shields.io/github/forks/Louis3797/xss-shield" alt="forks" />
  </a>
  <a href="https://github.com/Louis3797/xss-shield/stargazers">
    <img src="https://img.shields.io/github/stars/Louis3797/xss-shield" alt="stars" />
  </a>
  <a href="https://github.com/Louis3797/xss-shield/issues/">
    <img src="https://img.shields.io/github/issues/Louis3797/xss-shield" alt="open issues" />
  </a>
  <a href="https://github.com/Louis3797/xss-shield/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/Louis3797/xss-shield.svg" alt="license" />
  </a>
</p>

</div>

## Installation

To use this middleware, first install it using npm or yarn:
```bash
npm install xss-shield
```

or 

```bash
yarn add xss-shield
```


## Usage
To use this middleware in your Express.js application, simply require or import it and add it to your middleware stack:

```ts
const express = require('express'); 
const xssShield = require('xss-shield');

const app = express();

// Add the middleware to the middleware stack
app.use(xssShield());
```

You can also pass options to the middleware to customize its behavior. See the [xss documentation](https://jsxss.com/en/options.html) for available options.

```ts
const express = require('express'); 
const xssShield = require('xss-shield');

const app = express();

// Add the middleware to the middleware stack with options
app.use(xssShield({
  whiteList: {
    a: ['href', 'title', 'target'],
    img: ['src', 'alt'],
  }
}));
```

## License
xss-shield is licensed under the MIT License. See LICENSE for more information.