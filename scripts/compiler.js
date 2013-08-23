define(function(require, exports, module) {

  var DoubleLinkedList = require('double-linked-list');

  function compile(program) {

    var list = program = DoubleLinkedList.fromArray(program);

    while (list) { 

      if (list.elem.type == "loop") {

        var subprogram = compile(list.elem.commands);
        var endloop = {type: "endLoop", loopBack: list};

        delete list.elem.commands;
        list = list.insertListAfter(subprogram).insertAfter(endloop);
      }

      list = list.next;
    }
    return program;
  }

  

  return compile;

});