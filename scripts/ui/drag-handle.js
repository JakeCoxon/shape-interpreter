define(function(require, exports, module) {
  function DragHandle(paper, shapeDef, shape, dragCallback) {
    this.paper = paper;
    this.shapeDef = shapeDef;
    this.shape = shape;
    this.dragCallback = dragCallback;

    var elem = this.elem = this.paper.circle(shapeDef.x, shapeDef.y, 4)
      .attr({
        fill: shapeDef.color,
        "stroke": "#444",
      });


    this.elem.drag(function(dx, dy, x, y, ev) {
      dragCallback(shapeDef, shape, ev);
      elem.attr({cx: shape.attr('cx'), cy: shape.attr('cy')});
    }, function(ev) {
      elem.node.focus();
    }, function(ev) {
    });
  }

  return DragHandle;

});