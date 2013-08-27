define(function(require, exports, module) {

  function Shape(name, shape, x, y, w, h, color) {
    this.name = name;
    this.shape = shape;
    this.x = x; this.y = y;
    this.w = w; this.h = h;
    this.color = color || '#f62';
  }

  return Shape;
});