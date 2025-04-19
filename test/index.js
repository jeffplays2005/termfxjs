import fs from "fs";
import termfx from "../index.js";
const registry = new termfx(undefined, true); // due to example given in LF format
// testing dup
(async () => {
  registry.registerVariable("foo", "bar");
  registry.registerVariable("clear", "c[?25l");
  registry.registerFunction("sleep", async function (x) {
    return new Promise((resolve) => setTimeout(resolve, x));
  });

  const text = fs.readFileSync("./test.tfx");

  registry.execute(text.toString(), process.stdout.write.bind(process.stdout));
  // registry.Execute(text.toString(), console.log)
})();
