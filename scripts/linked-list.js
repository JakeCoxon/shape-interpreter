var LinkedList = (function() {
  function LinkedList(elem, next) {
    this.elem = elem;
    this.next = next || null;
  }

  return LinkedList;
})();