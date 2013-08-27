define(function(require, exports, module) {

  var _ = require('libs/jquery'),
      Parser = require('parser'),
      ast = require('ast');

  function CommandBar(target, commandList) {
    var self = this;
    this.commandList = commandList;
    this.focused = null;
    this.target = $(target);

    var $hiddenSpan = this.hiddenSpan = $("<span>").addClass("input-span").appendTo($(document.body));

    this.target.on('keypress', 'input[type="text"]', function(e) {
      if (e.which !== 0 && e.charCode !== 0) {
          var c = String.fromCharCode(e.keyCode|e.charCode);
          $hiddenSpan.text($(this).val() + c);
          var inputSize = $hiddenSpan.width() + 8;
          $(this).css("width", inputSize);
       }
       if (e.which == 13) { // enter
        this.blur();
       }
    });
    this.target.on('keyup', 'input[type="text"]', function(e) {
      self.resizeInputs();
    });
    this.target.on('focus', 'input[type="text"]', function(e) {
      self.focused = $(this);

    });
    this.target.on('blur', 'input[type="text"]', function(e) {
      self.focused = null;
      self.update();
    });
  }

  CommandBar.prototype.resizeInputs = function() {
    var $hiddenSpan = this.hiddenSpan;
    this.target.find('input').each(function() {
      $hiddenSpan.text($(this).val());
      var inputSize = $hiddenSpan.width() + 8;
      $(this).css("width", inputSize);
    });
  };

  CommandBar.prototype.update = function() {
    if (this.focused) return;
    this.target.empty();
    this.program = this.commandList.program;

    var command = this.commandList.selectedCommand();
    if (!command) this.target.text("");
    else this.target.append(this.buildElements(command));

    this.resizeInputs();
  };

  CommandBar.prototype.textBox = function(program, prop) {
    return "<input type='text' value='"+program.elem[prop]+"'>";
  };
  CommandBar.prototype.expressionBox = function(program, prop) {
    var input = $("<input type='text' value='"+expressionToText(program.elem[prop])+"'>");
    var self = this;
    input.keyup(function() {
      var expr = new Parser($(this).val()).parseNext();
      var obj = {}; obj[prop] = expr;
      self.program.modify(program, obj);
      self.commandList.replay();
    });
    return input;
  };
  CommandBar.prototype.doubleExpression = function(program, prop1, prop2) {
    var span = $("<span>").addClass("nowrap");
    return span.append(["(", this.expressionBox(program, prop1), ",", this.expressionBox(program, prop2), ")"]);
  };

  CommandBar.prototype.buildElements = function(program) {

    var cmd = program.elem;
    if (!cmd) return "Start";
    if (cmd.type == "create")
      return ["Create ", this.textBox(program, 'shape'), " called ", this.textBox(program, 'name'),
              " size ", this.doubleExpression(program, 'w', 'h'),
              " at ", this.doubleExpression(program, 'x', 'y')];
    
    else if (cmd.type == "move")
      return ["Move ", this.textBox(program, 'name'), " to ", this.doubleExpression(program, 'x', 'y')];
    
    else if (cmd.type == "loop")
      return ["Loop ", this.textBox(program, 'indexVar'), " from 0 to ", this.expressionBox(program, 'count')];

    else if (cmd.type == "endLoop")
      return "End loop";

    else if (cmd.type == "setVar")
      return ["Set ", this.textBox(program, 'varName'), " = ", this.expressionBox(program, 'value')];

    else if (cmd.type == "printVar")
      return ["Print ", this.textBox(program, 'varName')];
  };

  var expressionToText = function(expr) {
    if (expr instanceof ast.Operator) {

      var left = expressionToText(expr.left),
          right = expressionToText(expr.right);

      return left + " " + expr.op + " " + right;

    } else if (expr instanceof ast.Var) {

      return expr.varName;

    } else if (typeof(expr) == 'number') {
      return expr;

    }

  };


  return CommandBar;

});