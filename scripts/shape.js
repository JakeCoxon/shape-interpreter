define(function(require, exports, module) {

  function Shape(shape, x, y, w, h, color) {
    this.shape = shape;
    this.x = x; this.y = y;
    this.w = w; this.h = h;
    this.color = color || '#f62';
  }

  return Shape;
});