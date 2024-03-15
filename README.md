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
**Note:** An update has been planned to remove the need to explicitly declare if the file is CRLF or LF break files!

```js
const termfx = require('termfx');
```

`New()` is the main class, create a new instance of this!
The instance of termfx has three main functions, two of them registering variables and functions, the third being the executer.

`RegisterVariable` - Takes in two strings, the first is the replacer(or tag) and the second is the "to be replaced".
`RegisterFunction` - Takes in a string and a function, the first one being the tag, the second one being the function that can be executed.

`Execute` - Takes a string and writer(a function/method), the string template is parsed. Any regular strings that are not variable/function tags will be executed by the writer. Variable tags will be replaced and functions will be executed with respect to the parameters that were provided in the string template.

## Examples:
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
`<<sleep(1000)>>that was 1 second
<<sleep(5000)>>that was 5 seconds
<<$foo>> <- this is a variable replacer!`;
```

## Carriage Return Line Feed Files
Also known as CRLF, this is what most files termfx is supposedly parsing, files are expected to have `\r\n` at the end of each line. This mode will not add a carriage return `\r` at the end of each line.
```js
const termfx = require('termfx');
var registry = new termfx.New();
```
## Line feed
Also known as LF, these type of files **do not** have a carriage return character at the end of each line(`\r`). A `\r` character will be added to the end of every line.  This is used to handle the issue where everything is output in 1 line by the writer.
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
// E.g. This will now allow you to use [[$tag]] instead of <<$tag>>
```

# Bugs or suggestions
* Please report any bugs or provide suggestions in the github!

# License
Copyright Apache 2.0 License © 2022 Jeffplays2005.

[npm-image]: https://flat.badgen.net/npm/v/termfx
[npm-url]: https://www.npmjs.com/package/termfx
[install-size-image]: https://flat.badgen.net/packagephobia/install/termfx
[install-size-url]: https://packagephobia.com/result?p=termfx
