class New {
  constructor(split){
    var commands = {};
    this.split = this._validateSplitters(split) || [ "<<", ">>" ];
    this.RegisterVariable = function RegisterVariable(name, value){
      name = "$" + name;

      var ok = commands[name];
      if(ok){
        throw new Error("function with the same name has already been registered")
      };

      commands[name] = value;
    };
    this.RegisterFunction = function RegisterFunction(name, func){
      name += "()";

      var ok = commands[name];
      if(ok){
        throw new Error("function with the same name has already been registered")
      };

      commands[name] = func;
    };
    this.Execute = async function Execute(input, writer){
      this._validateExecute(input, writer);
      const loop = async () => {
        for(var line of input.split('\n')){
          line = line.split(this.split[0]).join(this.split[1]);
          line = line.split(this.split[1]);
          for(var i in line){
            if(Object.keys(commands).some(c=>line[i].includes(c))){
              for(var c in commands){
                line[i] = line[i].split(c).join(commands[c]);
              };
            };
          };
          for (var pos in line) {
            const word = line[pos];
            var ew = word.split('(');
            if(pos == line.length - 1) ew += "\n";
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
      };
      return loop();
    };
  };
  _validateExecute(input, writer){
    if(!input) throw new Error(`Not enough arguments in call to Execute. Missing input. `);
    if(!writer) throw new Error(`Not enough arguments in call to Execute. Missing writer. `);
    if(typeof(writer) !== 'function') throw new Error(`Writer must be a function. `);
  };
  _validateSplitters(CustomSplit){
    if(CustomSplit){
      if(!Array.isArray(CustomSplit)) throw new Error("CustomSplit must be an array")
      if(!CustomSplit[0]) throw new Error("startTag cannot be empty")
      if(!CustomSplit[1]) throw new Error("endTag cannot be empty")
      return CustomSplit
    };
    return;
  };
};

module.exports = New;
