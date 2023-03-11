class New {
  constructor(split, paragraph){
    var commands = {};
    this.split = this._validateSplitters(split) || [ "<<", ">>" ];
    this.paragraph = paragraph;
    this.RegisterVariable = function RegisterVariable(name, value){
      name = "$" + name;

      var ok = commands[name];
      if(ok){
        throw new Error("function with the same name has already been registered")
      }

      commands[name] = value;
    }
    this.RegisterFunction = function RegisterFunction(name, func){
      name += "()";

      var ok = commands[name];
      if(ok){
        throw new Error("function with the same name has already been registered")
      }

      commands[name] = func;
    }
    this.Execute = async function Execute(input, writer){
      this._validateExecute(input, writer);
      const lines = input.split('(?<=\\R)');
      for(var line_position in lines){
        // fetch each line
        var line = lines[line_position];
        // split into individual functions and strings
        var individual_characters = line.split(this.split[0]).join(this.split[1]).split(this.split[1]);
        // check if the first char is a << splitted into "" and remove
        // if(!individual_characters[0]) individual_characters.shift();
        function removeValue(value, index, arr) {
          // If the value at the current array index matches the specified value (2)
          if (value === "") {
            // Removes the value from the original array
            arr.splice(index, 1);
            return true;
          };
          return false;
        };
        individual_characters.filter(removeValue);
        if(this.paragraph && line_position !== lines.length - 1) individual_characters.push("\r\n");
        // check if the last char is a << splitted into "" and remove
        // replace all variables, e.g. "$foo" to "bar"
        for(var part_position in individual_characters){
          // fetch all variables from the commands object and check if any are in the object of characters
          if(Object.keys(commands).some(variable => individual_characters[part_position].includes(variable))){
            // found a variable
            for(var variable in commands){
              // replace all found variables with the corresponding correct variable and replace
              individual_characters[part_position] = individual_characters[part_position].split(variable).join(commands[variable]);
            }
          } else if (individual_characters[part_position].startsWith("$")){ // check if is a variable but not existant, replace with [#Unknown tag "$tag"#]
            individual_characters[part_position] = `[#Unknown tag \"${individual_characters[part_position]}\"#]`;
          }
        };
        // all variables have been supposedly replaced
        // now replace functions into actual functions
        for(var part_position in individual_characters){
          // check if is a function
          var character = individual_characters[part_position];
          var possible_function = character.split('(');
          var command = commands[possible_function[0] + "()"];
          if(command){
            // is a function
            await command.apply(null, possible_function[1].split(")").join('').split(/,\s?/));
          } else {
            // is not a function
            if(possible_function.length > 1 && character.endsWith(")")){ // check if a function is not existant, replace with [#Unknown tag "tag()"#]
              character = `[#Unknown tag "${possible_function[0] + "()"}"#]`;
            };
            writer(character);
          }
        }
      };
      return;
      for(var linepos in splitted){
        if(((pos == line.length - 1) && linepos !== splitted.length - 1) && this.paragraph) {
          ew += "\n";
        }
        var command = commands[ew[0] + "()"];
        var cmdArgs = ew[1]?.split(")");
        cmdArgs = cmdArgs?.join('');
        if(command){
          await command?.apply(null, cmdArgs.split(/,\s?/));
        } else {
          await writer(ew.toString());
        };
      };
    };
  }
  _validateExecute(input, writer){
    if(!input) throw new Error(`Not enough arguments in call to Execute. Missing input. `);
    if(!writer) throw new Error(`Not enough arguments in call to Execute. Missing writer. `);
    if(typeof(writer) !== 'function') throw new Error(`Writer must be a function. `);
  }
  _validateSplitters(CustomSplit){
    if(CustomSplit){
      if(!Array.isArray(CustomSplit)) throw new Error("CustomSplit must be an array")
      if(!CustomSplit[0]) throw new Error("startTag cannot be empty")
      if(!CustomSplit[1]) throw new Error("endTag cannot be empty")
      return CustomSplit
    }
    return;
  }
};

module.exports = New;