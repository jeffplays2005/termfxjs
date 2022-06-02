class New {
  // constructor(){
  //   this.variables = {};
  //   this.functions = {};
  //
  //
  // }
  constructor(){
    this.commands = {};
    this._ErrFunctionAlreadyRegistered = function (){
      throw Error("function with the same name has already been registered")
    }
  }
  RegisterVariable(name, value){
    name = "$" + name;

    var ok = this.commands[name];
    if(ok){
      return this._ErrFunctionAlreadyRegistered();
    }
    this.commands[name] = value;
  }
}

module.exports = New;
