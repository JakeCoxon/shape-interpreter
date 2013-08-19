define(function(require, exports, module) {

  function Scope(parent) {
    this.parent = null;
    this.values = {};
  }

  Scope.prototype.declare = function(name, value) {
    this.values[name] = value;
  };
  Scope.prototype.set = function(name, value) {
    if (this.values[name]) {
      this.values[name] = value;
      return true;
    }
    if (this.parent) return this.parent.set(name, value);
    throw "Not found in scope " + name;
  };
  Scope.prototype.get = function(name) {
    if (this.values[name]) return this.values[name];
    if (this.parent) return this.parent.get(name);
    throw "Not found in scope " + name;
  };

  return Scope;
});