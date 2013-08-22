define(function(require, exports, module) {

  function Scope(parent) {
    this.parent = parent || null;
    this.values = {};
  }

  Scope.prototype.declare = function(name, value) {
    this.values[name] = value;
  };
  Scope.prototype.set = function(name, value) {
    if (this.values[name] !== undefined) {
      this.values[name] = value;
      return true;
    }
    if (this.parent) return this.parent.set(name, value);
    throw new Error("Not found in scope " + name);
  };
  Scope.prototype.get = function(name) {
    if (this.values[name] !== undefined) return this.values[name];
    if (this.parent) return this.parent.get(name);
    throw new Error("Not found in scope " + name);
  };

  return Scope;
});