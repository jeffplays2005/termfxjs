type WriterFunction = (output: string) => void;

export default class Termfx {
  private commands: Record<string, string | Function>;
  private split: [string, string];
  private carriageReturn: boolean;

  constructor(
    options: { split?: [string, string]; carriageReturn?: boolean } = {
      split: ["<<", ">>"],
      carriageReturn: false,
    },
  ) {
    this.commands = {};
    this.split = options.split || ["<<", ">>"];
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
      const individual_characters = line
        .split(this.split[0])
        .join(this.split[1])
        .split(this.split[1]);

      for (let i = individual_characters.length - 1; i >= 0; i--) {
        if (individual_characters[i] === "") {
          individual_characters.splice(i, 1);
        }
      }

      if (!this.carriageReturn && line_position !== lines.length - 1) {
        individual_characters.push("\r");
      }

      for (const part_position in individual_characters) {
        const part = individual_characters[part_position];
        if (
          Object.keys(this.commands).some((variable) => part.includes(variable))
        ) {
          for (const variable in this.commands) {
            individual_characters[part_position] = individual_characters[
              part_position
            ]
              .split(variable)
              .join(this.commands[variable] as string);
          }
        } else if (part.startsWith("$")) {
          individual_characters[part_position] = `[#Unknown tag "${part}"#]`;
        }
      }

      for (const part_position in individual_characters) {
        let character = individual_characters[part_position];
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
   * Registers a function to be executed when called in the input string.
   *
   * @param name The name of the function to register
   * @param func The function to register
   */
  public registerFunction(name: string, func: Function): void {
    name += "()";

    if (this.commands[name]) {
      throw new Error(
        "Function with the same name has already been registered",
      );
    }

    this.commands[name] = func;
  }

  /**
   * Registers a variable to be replaced in the input string.
   *
   * @param name The name of the variable to register
   * @param value The value of the variable to register
   */
  public registerVariable(name: string, value: string): void {
    name = "$" + name;

    if (this.commands[name]) {
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
