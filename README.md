# Termfx JS
A template parser in Node.js that supports replacers and functions. Allows users to use custom outputs and access functions and variables in a custom template file. 

[![npm version][npm-image]][npm-url]
[![install size][install-size-image]][install-size-url]

![](https://nodei.co/npm/termfx.png)

# Table of contents:
- [Installation](#Installation)
- [Usage](#Usage)
  - [No line break](#No-line-break)
  - [Line break](#Line-break)
  - [Custom splitter](#Custom-splitter)
- [Bugs or suggestions](#Bugs-or-suggestions)
- [License](#License)

# Installation
```
npm install termfx
```

# Usage
## No line break:
```js
// Using process.stdout (no line break)
const termfx = require('termfx');
var registry = new termfx.New();

registry.RegisterVariable("foo", "bar");
registry.RegisterFunction("sleep",
  function(delayInms){
    return new Promise(resolve => setTimeout(resolve, delayInms));
  }
);

var string =
`<<sleep(1000)>>
that was 1 second
<<sleep(5000)>>
that was 5 seconds
<<$foo>>`;

registry.Execute(string, process.stdout.write.bind(process.stdout));
```
## Line break:
```js
// Using console.log (line break)
const termfx = require('termfx');
var registry = new termfx.New(undefined, true);

registry.RegisterVariable("foo", "bar");
registry.RegisterFunction("sleep",
  function(delayInms){
    return new Promise(resolve => setTimeout(resolve, delayInms));
  }
);

var string =
`<<sleep(1000)>>
that was 1 second
<<sleep(5000)>>
that was 5 seconds
<<$foo>>`;

registry.Execute(string, console.log);
```
## Custom splitter
```js
// custom splitter
const termfx = require('termfx');
var registry = new termfx.New(["[[", "]]"], true);
```

# Bugs or suggestions
* Please report any bugs or provide suggestions in the github!

# License
Copyright Apache 2.0 License © 2022 Jeffplays2005
See LICENSE in root directory.

[npm-image]: https://flat.badgen.net/npm/v/termfx
[npm-url]: https://www.npmjs.com/package/termfx
[install-size-image]: https://flat.badgen.net/packagephobia/install/termfx
[install-size-url]: https://packagephobia.com/result?p=termfx
