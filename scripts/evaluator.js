define(function(require, exports, module) {
  var ast = require('ast');

  var applyOp = function(left, op, right) {
    if (op == '+')      return left + right;
    else if (op == '-') return left - right;
    else if (op == '*') return left * right;
    else if (op == '/') return left / right;
  }
  var evaluate = function(expr, scope) {
    if (expr instanceof ast.Operator) {

      var left = evaluate(expr.left, scope),
          right = evaluate(expr.right, scope);

      return applyOp(left, expr.op, right);

    } else if (expr instanceof ast.Var) {

      return scope.get(expr.varName);

    } else if (typeof(expr) == 'number') {
      return expr;

    }

  }

  return evaluate;

});