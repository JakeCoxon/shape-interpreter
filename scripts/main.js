define(function(require, exports, module) {

  var Shape = require('shape'),
      LinkScope = require('link-scope'),
      LinkedList = require('linked-list'),
      ast = require('ast'),
      Evalutor = require('evaluator'),
      Parser = require('parser');

  $(document).ready(function() {


    var expression = new Parser("(123 + 123) + hello + 20 * 100 + 200 / 20").parseNext();


    console.log(expression);


    // var env = { head: null };


    // var program = [
    //   {type: "create", shape: "rectangle", name: "rect1", x: 0, y: 0, w:20, h:20},
    //   {type: "move", name: "rect1", x: 20, y: 50},
    //   {type: "create", shape: "circle", name: "circle1", x: 20, y: 0, w:10, h:10},
    //   {type: "setVar", varName: 'y', value: 20},
    //   {type: "loop", indexVar: "i", count: 5, commands: [
    //     {type: "create", shape: "circle", name: "circle1", x: new ast.Operator(20, '*', new ast.Var('i')), y: 80, w:20, h:20},
    //     {type: "printVar", varName: "y"}
    //   ]}
    // ];

    // function applyProgram(program, scope) {


    //   function move(shape, x, y) {
    //     return new Shape(shape.shape, x, y, shape.w, shape.h);
    //   }

    //   function loop(count, indexVar, commands) {
    //     var newScope;
    //     for (var i = 0; i < count; i++) {
    //       newScope = new LinkScope(scope, scope.list);
    //       newScope.declare(indexVar, i);
    //       applyProgram(commands, newScope);
    //     }
    //   }

    //   function e(expr) { return Evalutor(expr, scope); }

    //   function applyCommand(cmd) {
    //     if      (cmd.type == "create")   scope.declareLink(cmd.name, new Shape(cmd.shape, e(cmd.x), e(cmd.y), e(cmd.w), e(cmd.h)));
    //     else if (cmd.type == "move")     scope.setLink(cmd.name, move(scope.getLink(cmd.name), e(cmd.x), e(cmd.y)));
    //     else if (cmd.type == "loop")     loop(e(cmd.count), cmd.indexVar, cmd.commands);
    //     else if (cmd.type == "setVar")   scope.declare(cmd.varName, cmd.value);
    //     else if (cmd.type == "printVar") console.log(cmd.varName + " = " + scope.get(cmd.varName));
    //   }

    //   for (var i = 0; i < program.length; i++) {
    //     applyCommand(program[i]);
    //   }
    // }

    // var rootScope = new LinkScope(null, env);
    // applyProgram(program, rootScope);


    // var paper = Raphael("image", 600, 400);

    // var set = paper.set();
    // var list = env.head;
    // while (list) {
    //   var shapeDef = list.elem;
    //   var shape;

    //   if (shapeDef.shape == "circle")
    //     shape = paper.ellipse(shapeDef.x + shapeDef.w/2, shapeDef.y + shapeDef.h/2, shapeDef.w/2, shapeDef.h/2);
    //   else
    //     shape = paper.rect(shapeDef.x, shapeDef.y, shapeDef.w, shapeDef.h);


    //   shape.attr({"fill": "#f62", "stroke":"#333", "stroke-width": 2});
      
    //   set.push(shape);

    //   list = list.next;
    // }

    // set.transform("t"+[1,1]);
  });
});
