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

  const script = `<<$clear>>the following: "<<$foo>>" was a replacer!

<<$doesnt_exist>> <- this variable doesn't exist!
<<doesnt_exist()>> <- this function doesn't exist!
there is a 3 second delay before the next line is executed

<<sleep(3000)>>3 seconds is up!
<<sleep(1000)>>this<<sleep(1000)>> will<<sleep(1000)>> print<<sleep(1000)>> very<<sleep(1000)>> slowly`;

  // Execute the registry with the test input
  await registry.execute(script, process.stdout.write.bind(process.stdout));
})();
