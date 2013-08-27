define(function(require, exports, module) {

  var Runtime = require('runtime'),
      evaluate = require('evaluator'),
      Shape = require('shape');

  function ShapeRuntime() {
    Runtime.call(this);
  }
  ShapeRuntime.prototype = Object.create(Runtime.prototype);

  function move(shape, x, y) {
    return new Shape(shape.name, shape.shape, x, y, shape.w, shape.h, shape.color);
  };

  ShapeRuntime.prototype.endLoop = function(cmd) {
    this.popScope();

    var indexVar = cmd.loopBack.elem.indexVar,
        indexVal = this.scope.get(indexVar) + 1;

    if (indexVal >= cmd.loopBack.elem.count) {
      this.popScope();
      return;
    }
    this.scope.set(indexVar, indexVal);
    this.pushScope();
    return cmd.loopBack.next;
  };

  ShapeRuntime.prototype.beginLoop = function(cmd) {
    this.pushScope().declare(cmd.indexVar, 0);
    this.pushScope();
    this.pushStack();
    return cmd.commands;
  }

  ShapeRuntime.prototype.execute = function(cmd) {

    var scope = this.scope;
    function e(expr) { return evaluate(expr, scope); }
    

    if      (cmd.type == "create")   scope.declareLink(cmd.name, new Shape(cmd.name, cmd.shape, e(cmd.x), e(cmd.y), e(cmd.w), e(cmd.h), cmd.color));
    else if (cmd.type == "move")     scope.setLink(cmd.name, move(scope.getLink(cmd.name), e(cmd.x), e(cmd.y)));
    else if (cmd.type == "loop")     return this.beginLoop(cmd);
    else if (cmd.type == "endLoop")  return this.endLoop(cmd);
    else if (cmd.type == "setVar")   scope.declare(cmd.varName, cmd.value);
    else if (cmd.type == "printVar") console.log(cmd.varName + " = " + scope.get(cmd.varName));
  };

  return ShapeRuntime;

});