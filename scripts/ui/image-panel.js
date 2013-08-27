define(function(require, exports, module) {

  var DragHandle = require('ui/drag-handle');

  function ImagePanel(target, env) {
    this.env = env;
    this.paper = Raphael($(target)[0], 600, 400);
    this.onDragCallback = null;
  }

  ImagePanel.prototype.onShapeDrag = function(shapeDef, shape, ev) {
    if (this.onDragCallback) this.onDragCallback(shapeDef, shape, ev);
  };

  ImagePanel.prototype.update = function() {
    this.paper.clear();

    var set = this.paper.set();
    var list = this.env.head;
    while (list) {
      var shapeDef = list.elem;
      var shape;

      if (shapeDef.shape == "circle")
        shape = this.paper.ellipse(shapeDef.x, shapeDef.y, shapeDef.w/2, shapeDef.h/2);
      else
        shape = this.paper.rect(shapeDef.x, shapeDef.y, shapeDef.w, shapeDef.h);



      var handle = new DragHandle(this.paper, shapeDef, shape, $.proxy(this.onShapeDrag, this));
      handle.elem.toBack();

      shape.attr({"fill": shapeDef.color, "stroke":"#444", "stroke-width": 2});
      shape.toBack();
      
      set.push(shape);

      list = list.next;
    }

  };

  return ImagePanel;

});