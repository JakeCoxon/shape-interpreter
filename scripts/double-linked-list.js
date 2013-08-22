define(function(require, exports, module) {

  function DoubleLinkedList(elem, prev, next) {
    this.elem = elem;
    join(this, next); join(prev, this);
  }

  function join(a, b) {
    a && (a.next = b); b && (b.prev = a);
  }

  DoubleLinkedList.prototype.remove = function() {
    join(this.prev, this.next);
    this.prev = null; this.next = null;
    return this;
  };
  DoubleLinkedList.prototype.insertAfter = function(elem) {
    return new DoubleLinkedList(elem, this, this.next);
  };
  DoubleLinkedList.prototype.insertBefore = function(elem) {
    return new DoubleLinkedList(elem, this.prev, this);
  };
  DoubleLinkedList.prototype.begin = function() { return this.prev ? this.prev.begin() : this; };
  DoubleLinkedList.prototype.end   = function() { return this.next ? this.next.end()   : this; };

  DoubleLinkedList.prototype.insertListAfter = function(list) {
    var end = list.end();
    join(end, this.next);
    join(this, list);
    return end;
  };

  DoubleLinkedList.fromArray = function(array) {
    if (!array.length) return null;
    return new DoubleLinkedList(array[0], null, DoubleLinkedList.fromArray(array.slice(1)));
  };

  DoubleLinkedList.prototype.each = function(func) {
    var list = this;
    while (list) { func.call(this, list); list = list.next; }
  };

  return DoubleLinkedList;
  
});