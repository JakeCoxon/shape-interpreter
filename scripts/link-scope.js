define(function(require, exports, module) {

  var Scope = require('scope'),
      LinkedList = require('linked-list');

  function LinkScope(parent, list) {
    Scope.call(this, parent);
    this.list = list;
  }
  LinkScope.prototype = Object.create(Scope.prototype);

  LinkScope.prototype.declareLink = function(name, value) {
    var newHead = new LinkedList(value, this.list.head);
    this.list.head = newHead;
    value = newHead;
    Scope.prototype.declare.call(this, name, value);
  };
  LinkScope.prototype.setLink = function(name, value) {
    var oldValue = Scope.prototype.get.call(this, name);
    oldValue.elem = value;
    return true;
  };
  LinkScope.prototype.getLink = function(name) {
    return Scope.prototype.get.call(this, name).elem;
  };

  return LinkScope;

});