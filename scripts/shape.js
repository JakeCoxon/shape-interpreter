define(function(require, exports, module) {

  function Shape(shape, x, y, w, h) {
    this.shape = shape;
    this.x = x; this.y = y;
    this.w = w; this.h = h;
  }

  return Shape;
});