const fs = require("fs");
const termfx = require("../index.js");
// var registry = new termfx.New();
const registry = new termfx.New(undefined, true); // due to example given in LF format
// testing dup
(async () => {
  registry.RegisterVariable("foo", "bar");
  registry.RegisterVariable("clear", "c[?25l");
  registry.RegisterFunction("sleep", async function (x) {
    return new Promise((resolve) => setTimeout(resolve, x));
  });

  const text = fs.readFileSync(__dirname + "/test.tfx");

  registry.Execute(text.toString(), process.stdout.write.bind(process.stdout));
  // registry.Execute(text.toString(), console.log)
})();
