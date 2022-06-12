const termfx = require('../index.js');
var registry = new termfx.New();
const delay = require('delay');
const fs = require('fs');
// testing dup
(async() => {
  registry.RegisterVariable('foo', 'bar');
  registry.RegisterFunction('sleep', async function(x){ return new Promise(resolve => setTimeout(resolve, x)) });
  registry.RegisterFunction('clear', function(){ console.clear() });

  var text = await fs.readFileSync(__dirname+'/test.tfx')

  registry.Execute(text.toString(), console.log)
})()
