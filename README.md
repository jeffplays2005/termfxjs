# Termfx JS
Currently work in progress project

[![npm version][npm-image]][npm-url]
[![install size][install-size-image]][install-size-url]

![](https://nodei.co/npm/termfx.png)

# Table of contents:
- [Installation](#Installation)
- [Usage](#Usage)
- [Bugs](#Bugs)
- [License](#License)

# Installation
```
npm install termfx
```

# Usage
```js
const termfx = require('termfx');
const delay = require('delay');
var registry = new termfx.New();

registry.RegisterVariable("foo", "bar")
registry.RegisterFunction("sleep", function(x){ await delay(x) });

var string =
`<<sleep(1000)>>
that was 1 second
<<sleep(5000)>>
that was 5 seconds
<<$foo>>`

registry.Execute(string, console.log)
```

# Bugs
To fix termfx logging `undefined` at the start, you can add a clear function and clear the log first before starting.

# License
Copyright Apache 2.0 License © 2022 Jeffplays2005
See LICENSE in root directory.

[npm-image]: https://flat.badgen.net/npm/v/termfx
[npm-url]: https://www.npmjs.com/package/termfx
[install-size-image]: https://flat.badgen.net/packagephobia/install/termfx
[install-size-url]: https://packagephobia.com/result?p=termfx
