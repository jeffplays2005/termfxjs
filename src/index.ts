type WriterFunction = (output: string) => void;

export default class Termfx {
  private commands: Record<string, string | Function>;
  private delimiters: [string, string];
  private carriageReturn: boolean;

  /**
   * The constructor initializes the Termfx instance with optional configuration
   *
   * @param options Optional configuration object, which can include:
   * - `delimiters`: An array of two strings that define the delimiters for
   *   variable and function substitution.
   * - `carriageReturn`: A boolean that indicates whether to add a carriage return
   */
  constructor(
    options: { delimiters?: [string, string]; carriageReturn?: boolean } = {
      delimiters: ["<<", ">>"],
      carriageReturn: false,
    },
  ) {
    this.commands = {};
    this.delimiters = options.delimiters || ["<<", ">>"];
    this.carriageReturn = options.carriageReturn || false;
  }

  /**
   * Executes the input string by replacing variables and executing functions.
   *
   * @param input The input string to be executed
   * @param writer The function to write the output
   */
  public async execute(input: string, writer: WriterFunction): Promise<void> {
    this.validateExecute(input, writer);
    const lines = input.split(/(?<=\r?\n)/);
    for (const [line_position, line] of lines.entries()) {
      const segments = line
        .split(this.delimiters[0])
        .join(this.delimiters[1])
        .split(this.delimiters[1]);

      for (let i = segments.length - 1; i >= 0; i--) {
        if (segments[i] === "") {
          segments.splice(i, 1);
        }
      }

      if (!this.carriageReturn && line_position !== lines.length - 1) {
        segments.push("\r");
      }

      segments.forEach((token, part_position) => {
        if (token in this.commands) {
          segments[part_position] = segments[part_position]
            .split(token)
            .join(this.commands[token] as string);
        } else if (token.startsWith("$")) {
          segments[part_position] = `[#Unknown tag "${token}"#]`;
        }
      });

      for (let token of segments) {
        const possibleFunction = token.split("(");
        const command = this.commands[possibleFunction[0] + "()"];
        if (command && typeof command === "function") {
          await command.apply(
            null,
            possibleFunction[1].split(")").join("").split(/,\s?/),
          );
        } else {
          if (possibleFunction.length > 1 && token.endsWith(")")) {
            token = `[#Unknown tag "${possibleFunction[0] + "()"}"#]`;
          }
          writer(token);
        }
      }
    }
  }

  /**
   * This method allows you to define a custom function that can be invoked
   * within the input string using the specified name.
   *
   * @param name The name of the function to register. This name will be used
   *             to call the function in the input string.
   * @param func The function to register. It should be a callable function
   *             that performs the desired operation.
   * @throws {Error} If a function or variable with the same name has already been registered.
   */
  public registerFunction(name: string, func: Function): void {
    name += "()";

    if (name in this.commands) {
      throw new Error(
        "Function with the same name has already been registered",
      );
    }

    this.commands[name] = func;
  }

  /**
   * This method allows you to register a variable that can be used in the input
   *
   * @param name The name of the variable to register. This name will be used
   *             to substitute the variable in the input string.
   * @param value The value of the variable to register. It should be a string
   * @throws {Error} If a function or variable with the same name has already been registered.
   */
  public registerVariable(name: string, value: string): void {
    name = "$" + name;

    if (name in this.commands) {
      throw new Error(
        "Variable with the same name has already been registered",
      );
    }

    this.commands[name] = value;
  }

  private validateExecute(input: string, writer: WriterFunction): void {
    if (!input) {
      throw new Error(
        "Not enough arguments in call to execute. Missing input.",
      );
    }
    if (!writer) {
      throw new Error(
        "Not enough arguments in call to execute. Missing writer.",
      );
    }
    if (typeof writer !== "function") {
      throw new Error("Writer must be a function.");
    }
    if (typeof input !== "string") {
      throw new Error("Input must be a string.");
    }
  }
}
