define(function(require, exports, module) {

  function LinkedList(elem, next) {
    this.elem = elem;
    this.next = next || null;
  }

  return LinkedList;
  
});