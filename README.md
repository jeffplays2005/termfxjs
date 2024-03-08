# Termfx JS
A template parser in Node.js that supports replacers and functions. Allows users to use custom outputs and access functions and variables in a custom template file.

[![npm version][npm-image]][npm-url]
[![install size][install-size-image]][install-size-url]

![](https://nodei.co/npm/termfx.png)

# Table of contents:
- [Installation](#Installation)
- [Usage](#Usage)
  - [Carriage Return Line Feed Files](#Carriage-Return-Line-Feed-Files)
  - [Line Feed](#Line-feed)
  - [Custom splitter](#Custom-splitter)
- [Bugs or suggestions](#Bugs-or-suggestions)
- [License](#License)

# Installation
```
npm install termfx
```

# Usage
## Carriage Return Line Feed Files
Also known as CRLF, this is what most files termfx is supposedly parsing, files are expected to have `\r\n` at the end of each line. This mode will not add a carriage return `\r` at the end of each line.
```js
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
## Line feed
Also known as LF, these type of files **do not** have a carriage return character at the end of each line(`\r`) and require this, otherwise everything printed out would be displayed in 1 line.
```js
const termfx = require('termfx');
var registry = new termfx.New(null, true);
```

## Custom splitter
Using a custom splitter that isn't the default `<<`, `>>`.
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
