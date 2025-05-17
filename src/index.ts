type WriterFunction = (output: string) => void;

export default class Termfx {
  private commands: Record<string, string | Function>;
  private delimiters: [string, string];
  private carriageReturn: boolean;

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
      const individualCharacters = line
        .split(this.delimiters[0])
        .join(this.delimiters[1])
        .split(this.delimiters[1]);

      for (let i = individualCharacters.length - 1; i >= 0; i--) {
        if (individualCharacters[i] === "") {
          individualCharacters.splice(i, 1);
        }
      }

      if (!this.carriageReturn && line_position !== lines.length - 1) {
        individualCharacters.push("\r");
      }

      for (const part_position in individualCharacters) {
        const part = individualCharacters[part_position];
        if (
          Object.keys(this.commands).some((variable) => part.includes(variable))
        ) {
          for (const variable in this.commands) {
            individualCharacters[part_position] = individualCharacters[
              part_position
            ]
              .split(variable)
              .join(this.commands[variable] as string);
          }
        } else if (part.startsWith("$")) {
          individualCharacters[part_position] = `[#Unknown tag "${part}"#]`;
        }
      }

      for (const part_position in individualCharacters) {
        let character = individualCharacters[part_position];
        const possible_function = character.split("(");
        const command = this.commands[possible_function[0] + "()"];
        if (command && typeof command === "function") {
          await command.apply(
            null,
            possible_function[1].split(")").join("").split(/,\s?/),
          );
        } else {
          if (possible_function.length > 1 && character.endsWith(")")) {
            character = `[#Unknown tag "${possible_function[0] + "()"}"#]`;
          }
          writer(character);
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
