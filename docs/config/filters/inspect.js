var util = require("util");
module.exports = {
  name: 'inspect',
  process: function(obj) {
    return util.inspect(obj);
  }
};