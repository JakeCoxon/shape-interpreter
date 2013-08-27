define(function(require, exports, module) {

  var Parser = require('parser'),
      ShapeRuntime = require('shape-runtime'),
      compile = require('compiler'),
      CommandList = require('ui/command-list'),
      ImagePanel = require('ui/image-panel'),
      CommandBar = require('ui/command-bar'),
      Program = require('program');

  $(document).ready(function() {


    var runtime = new ShapeRuntime();

    var exprX = new Parser("50 + 25 * i").parseNext();
    var exprY = new Parser("y + 65 * j").parseNext();
    var exprSize = new Parser("(1 - (i/20)) * 50").parseNext();


    var program = compile([
      {type: "create", shape: "rectangle", name: "rect1", x: 0, y: 0, w:20, h:20},
      {type: "move", name: "rect1", x: 20, y: 50},
      {type: "create", shape: "circle", name: "circle1", x: 400, y: 200, w:100, h:100, color: 'lightgreen'},
      {type: "move", name: "circle1", x: 500, y: 200},
      {type: "setVar", varName: 'y', value: 100},
      {type: "loop", indexVar: "i", count: 20, commands: [
        {type: "create", shape: "rectangle", name: "rect2", x: exprX, y: 50, w: 40, h: 40, color: '#ccf'},
        {type: "loop", indexVar: "j", count: 5, commands: [
          {type: "create", shape: "circle", name: "circle1", x: exprX, y: exprY, w:60, h:60, color: 'magenta'},
          {type: "create", shape: "circle", name: "circle2", x: exprX, y: exprY, w:exprSize, h:exprSize}
        ]}
      ]}
    ]);

    program = new Program(program);


    runtime.setProgram(program);


    var commandList = new CommandList("#command-list", runtime);

    var imagePanel = new ImagePanel("#image", runtime.env);
    imagePanel.onShapeDrag = function(shapeDef, shape, ev) {
      var x = ev.offsetX, y = ev.offsetY;
      shapeDef.x = x;
      shapeDef.y = y;

      var cmd = runtime.programPointer.prev.elem;
      if (cmd.type == "move" || cmd.type == "create" && runtime.scope.getLink(cmd.name) == shapeDef) {
        runtime.program.modify(runtime.programPointer.prev, {x: x, y: y});
      }
      else {
        runtime.program.insertBefore(runtime.programPointer,
         {type: "move", name: shapeDef.name, x: x, y: y});
      }

      shape.attr({cx: x, cy: y, x: x, y: y});
    };
    commandList.onChange($.proxy(imagePanel.update, imagePanel));

    var commandBar = new CommandBar("#current-command", commandList);
    commandList.onChange($.proxy(commandBar.update, commandBar));


  });
});
