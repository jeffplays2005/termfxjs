class New {
  constructor(){
    this.commands = {};
  }
  RegisterVariable(name, value){
    name = "$" + name;

    var ok = this.commands[name];
    if(ok){
      throw new Error("function with the same name has already been registered")
    }
    this.commands[name] = value;
  }
  RegisterFunction(name, func){
    name += "()";

    var ok = this.commands[name];
    if(ok){
      throw new Error("function with the same name has already been registered")
    }

    this.commands[name] = func;
  }
}

module.exports = New;
