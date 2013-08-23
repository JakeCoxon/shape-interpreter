define(function(require, exports, module) {

  var a = require('libs/jquery'),
      LinkedList = require('linked-list');

  function CommandList(target, runtime) {
    this.program = null;
    this.runtime = runtime;

    this.onChangeCallback = null;

    this.target = $(target).empty();
    this.list = $("<ul>").appendTo(this.target);

    this.stepButton = $("<button>").appendTo(this.target).text("[S]tep").click($.proxy(this.step, this));
    this.resetButton = $("<button>").appendTo(this.target).text("[R]eset").click($.proxy(this.reset, this));

    $(document).keypress($.proxy(this.keypress, this));

    this.setProgram(runtime.program);
  }

  CommandList.prototype.keypress = function(ev) {
    if (ev.which == 115) this.step();
    if (ev.which == 114) this.reset();
  };

  CommandList.prototype.onChange = function(f) {
    this.onChangeCallback = f;
  };

  CommandList.prototype.updateSelected = function() {
    this.selected.removeClass("selected");
    this.selected = !this.runtime.programPointer ? this.endItem :
                    !this.runtime.programPointer.prev ? this.startItem :
                    this.runtime.programPointer.prev.listItem;
    this.selected.addClass("selected");
  };
  CommandList.prototype.step = function() {
    this.runtime.step();
    this.updateSelected();
    if (this.onChangeCallback) this.onChangeCallback();
  };
  CommandList.prototype.reset = function() {
    this.runtime.reset();
    this.updateSelected();
    if (this.onChangeCallback) this.onChangeCallback();
  };

  CommandList.prototype.isProgramBeforeCurrent = function(program) {
    while (program && program != this.runtime.programPointer) program = program.next;
    return program == this.runtime.programPointer;
  };

  CommandList.prototype.moveTo = function(program) {
    if (!program || this.isProgramBeforeCurrent(program)) this.runtime.reset();
    
    while (program && this.runtime.programPointer && this.runtime.programPointer != program.next) {
      this.runtime.step();
    }
    this.updateSelected();
    if (this.onChangeCallback) this.onChangeCallback();
  };

  CommandList.prototype.setProgram = function(program) {
    this.program = program;
    this.list.empty();

    var command = program;
    var parent = new LinkedList(this.list, null);

    var listItem = function(self, parent, command) {
      var item = $("<li>").appendTo(parent.elem);
      item.text(command ? self.commandToText(command.elem) : "Start Program");
      item.click(function(ev) { self.moveTo(command); });
      return item;
    };

    this.startItem = listItem(this, parent, null);

    while (command) {
      if (command.elem.type == "endLoop") {
        parent = parent.next;
      }

      var item = listItem(this, parent, command);

      command.listItem = item;
      this.endItem = item;

      if (command.elem.type == "loop") {
        var ul = $("<ul>").appendTo(parent.elem);
        parent = new LinkedList(ul, parent);
      }
      command = command.next;
    }


    this.selected = this.startItem;
    this.selected.addClass("selected");
  };

  CommandList.prototype.commandToText = function(cmd) {
    if (cmd.type == "create")   return "Create " + cmd.shape + " called " + cmd.name;
    else if (cmd.type == "move")     return "Move " + cmd.name + " to " + cmd.x + ", " + cmd.y;
    else if (cmd.type == "loop")     return "Loop from 0 to " + cmd.count;
    else if (cmd.type == "endLoop")  return "End loop";
    else if (cmd.type == "setVar")   return "Set " + cmd.varName + " = " + cmd.value;
    else if (cmd.type == "printVar") return "Print " + cmd.varName;
  };


  return CommandList;

});