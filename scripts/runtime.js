define(function(require, exports, module) {

  var LinkedList = require('linked-list'),
      LinkScope = require('link-scope');


  function Runtime() {
    this.programPointer = null;
    this.program = null;
    this.programStack = null;
    this.env = { head: null };
    this.rootScope = null;
    this.scope = null;
  }



  Runtime.prototype.setProgram = function(program) {
    this.program = program;
    this.programStack = new LinkedList(program.head);
    this.programPointer = program.head;
    this.rootScope = this.scope = new LinkScope(null, this.env);
    this.env.head = null;
  };
  Runtime.prototype.reset = function() { this.setProgram(this.program); };

  Runtime.prototype.pushScope = function() {
    this.scope = new LinkScope(this.scope, this.env);
    return this.scope;
  };
  Runtime.prototype.popScope = function() {
    this.scope = this.scope.parent;
  };

  Runtime.prototype.pushStack = function(subprogram) {
    this.programStack = new LinkedList(this.programPointer, this.programStack);
  };

  Runtime.prototype.popStack = function(nextProgram) {
    this.programStack = this.programStack.next;
  };

  Runtime.prototype.step = function() {

    if (this.programPointer) {
      var next = this.execute(this.programPointer.elem) || this.programPointer.next;
      this.programPointer = next;
    }
    return !!this.programPointer;

  };



  Runtime.prototype.execute = function(command) {};

  return Runtime;

});