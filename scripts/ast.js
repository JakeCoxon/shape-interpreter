define(function(require, exports, module) {

  function Node() {}

  function Var(varName) {
    this.varName = varName;
  }
  Var.prototype = Object.create(Node);

  function Operator(left, op, right) {
    this.left = left;
    this.op = op;
    this.right = right;
  }
  Operator.prototype = Object.create(Operator);

  exports.Node     = Node;
  exports.Var      = Var;
  exports.Operator = Operator;


});