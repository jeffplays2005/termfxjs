import { readFileSync } from "fs";
import Termfx from "../index.js";

const registry = new Termfx({ carriageReturn: true });

(async () => {
  // Register variables
  registry.registerVariable("foo", "bar");
  registry.registerVariable("clear", "\x1bc\x1b[?25l");

  // Register a function
  registry.registerFunction("sleep", async function (x: string): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, parseInt(x)));
  });

  const script = readFileSync("src/examples/test.tfx").toString();
  // Execute the registry with the test input
  await registry.execute(script, process.stdout.write.bind(process.stdout));
})();
