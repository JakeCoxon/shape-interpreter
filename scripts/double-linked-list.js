define(function(require, exports, module) {

  function DoubleLinkedList(elem, prev, next) {
    this.elem = elem;
    this.next = next ? (next.prev = this) && next : null;
    this.prev = prev ? (prev.next = this) && prev : null;
  }
  DoubleLinkedList.prototype.remove = function() {
    if (this.prev) this.prev.next = this.next;
    if (this.next) this.next.prev = this.prev;
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

  DoubleLinkedList.fromArray = function(array) {
    if (!array.length) return null;
    return new DoubleLinkedList(array[0], null, DoubleLinkedList.fromArray(array.slice(1)));
  };

  return DoubleLinkedList;
  
});