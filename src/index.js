class New {
  constructor(split){
    var commands = {};
    this.split = this._validateSplitters(split) || [ "<<", ">>" ];;
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
      const loop = async () => {
        for(var line of input.split('\n')){
          line = line.split(this.split[0]).join('');
          line = line.split(this.split[1]).join('');
          for(var i in commands){
            if(i.startsWith('$')){
              line = line.split(i).join(commands[i]);
            }
          };
          var cmdArgs;
          var el = line.split('(');
          var loop2 = async () => {
            var command = commands[el[0] + "()"];
            cmdArgs = el[1]?.split(")");
            console.log(cmdArgs)
            cmdArgs?.pop();
            cmdArgs = cmdArgs?.join();
            if(command){
              await command?.apply(null, cmdArgs.split(/,\s?/));
            } else {
              await writer(el.toString())
            }
          }
          await loop2()
        }
      }
      return loop();
    }
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
}

module.exports = New;
