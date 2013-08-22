define(function(require, exports, module) {

  var Parser = require('parser'),
      ShapeRuntime = require('shape-runtime'),
      compile = require('compiler');

  $(document).ready(function() {


    var runtime = new ShapeRuntime();

    var exprX = new Parser("50 + 55 * i").parseNext();
    var exprY = new Parser("y + 55 * j").parseNext();
    var exprSize = new Parser("(1 - (i/7)) * 50").parseNext();


    var program = compile([
      {type: "create", shape: "rectangle", name: "rect1", x: 0, y: 0, w:20, h:20},
      {type: "move", name: "rect1", x: 20, y: 50},
      {type: "create", shape: "circle", name: "circle1", x: 20, y: 0, w:10, h:10},
      {type: "setVar", varName: 'y', value: 100},
      {type: "loop", indexVar: "i", count: 7, commands: [
        {type: "loop", indexVar: "j", count: 5, commands: [
          {type: "create", shape: "circle", name: "circle1", x: exprX, y: exprY, w:exprSize, h:exprSize}
        ]}
      ]}
    ]);


    runtime.setProgram(program);

    window.runtime = runtime;
    for (var i = 0; i < 100; i++) runtime.step();
    
    var paper = Raphael("image", 600, 400);

    var set = paper.set();
    var list = runtime.env.head;
    while (list) {
      var shapeDef = list.elem;
      var shape;

      if (shapeDef.shape == "circle")
        shape = paper.ellipse(shapeDef.x, shapeDef.y, shapeDef.w/2, shapeDef.h/2);
      else
        shape = paper.rect(shapeDef.x, shapeDef.y, shapeDef.w, shapeDef.h);


      shape.attr({"fill": "#f62", "stroke":"#333", "stroke-width": 2});
      
      set.push(shape);

      list = list.next;
    }

    set.transform(['t',1,1]);
  });
});
