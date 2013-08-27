define(function(require, exports, module) {

  function Program(head) {
    this.head = head;
    this.onInsertCallback = null;
    this.onModifyCallback = null;
  }

  Program.prototype.onInsert = function(f) {
    this.onInsertCallback = f;
  };
  Program.prototype.onModify = function(f) {
    this.onModifyCallback = f;
  };

  Program.prototype.insertAfter = function(list, elem) {
    var newElem = list.insertAfter(elem);
    if (this.onInsertCallback) this.onInsertCallback(newElem);
    return newElem;
  };
  Program.prototype.insertBefore = function(list, elem) {
    var newElem = list.insertBefore(elem);
    if (this.onInsertCallback) this.onInsertCallback(newElem);
    return newElem;
  };

  Program.prototype.modify = function(list, properties) {
    for (var p in properties) {
      if (properties.hasOwnProperty(p)) {
        list.elem[p] = properties[p];
      }
    }
    if (this.onModifyCallback) this.onModifyCallback(list);
  }

  return Program;

});