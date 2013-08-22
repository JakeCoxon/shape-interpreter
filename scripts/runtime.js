define(function(require, exports, module) {

  var LinkedList = require('linked-list');

  function isCommandInProgram(command, program) {
    anyCommand(program, function(c) { return c == command; });
  }

  function anyCommand(program, func) {
    while (program) {
      if (func(program.elem)) return true;
      if (program.elem.commands && traverseProgram(program.elem.commands, func)) return true;
      program = program.next;
    }
    return false;
  }


  function Runtime() {
    this.programPointer = null;
    this.program = null;
    this.programStack = null;
  }

  Runtime.prototype.setProgram = function(program) {
    this.program = program;
    this.programStack = new LinkedList(program);

    if (!isCommandInProgram(this.programPointer, program)) this.programPointer = program;
  };

  Runtime.prototype.step = function() {
    if (this.programPointer.elem.commands) {
      // Step in
      this.programStack = new LinkedList(this.programPointer, this.programStack);
      this.programPointer = this.programPointer.elem.commands;
    }
    else if (this.programPointer.next) {
      this.programPointer = this.programPointer.next;
    }
    else if (this.programStack.next) {
      // Step out
      this.programPointer = this.programStack.elem.next;
      this.programStack = this.programStack.next;
    }
    else {
      // End of program
      return;
    }

    // Execute command

  };

  return Runtime;

});