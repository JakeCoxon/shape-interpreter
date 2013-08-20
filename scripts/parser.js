define(function(require, exports, module) {

  var ast = require('ast');


  var operatorPrecedence = function(op) {
    if (op == '+' || op == '-') return 3;
    if (op == '*' || op == '/') return 4;
  };

  var getToken = function(string) {
    if (string.match(/^[\+\-\*\/]$/)) return {type: "operator", string: string, precedence: operatorPrecedence(string)};
    if (string.match(/^[0-9]+$/))     return {type: "number", value: Number(string), string: string, precedence: 0};
    if (string.match(/^[a-zA-Z]+$/))  return {type: "variable", string: string, precedence: 0};
    if (string == '(')                return {type: "openBracket", string: string, precedence: 0};
    if (string == ')')                return {type: "closeBracket", string: string, precedence: 0};
    return null;
  };

  var tokenize = function(string) {
    var strings = string.replace(/([\(\)\+\-\*\/])/g, " $1 ").split(/\s+/);
    var tokens = [];
    for (var i = 0; i < strings.length; i++) {
      var token = getToken(strings[i]);
      if (token) tokens.push(token);
    }
    return tokens;
  };

  var error = function(str) { throw "Parse error: " + str; };

  var prefixParselets = {
    number : function(parser, token) {
      return token.value;
    },
    variable : function(parser, token) {
      return new ast.Var(token.string);
    },
    openBracket : function(parser, token) {
      var expression = parser.parseNext();
      if (!parser.tokens[0] || parser.tokens[0].type != 'closeBracket')
        error("Expected close bracket");
      parser.tokens.shift();
      return expression;
    }
  };

  var infixParselets = {
    operator : function(parser, leftExpression, token) {
      var rightExpression = parser.parseNext(token.precedence);
      return new ast.Operator(leftExpression, token.string, rightExpression);
    }
  };




  var Parser = function(string) {
    this.tokens = tokenize(string);
  };

  Parser.prototype.parseNext = function(precedence) {
    precedence = precedence || 0;
    var token = this.tokens.shift();
    var prefix = prefixParselets[token.type] || error("Could not parse token '" + token.string + "'");

    var leftExpression = prefix(this, token);
    if (!this.tokens.length) return leftExpression;

    while (precedence < this.nextPrecedence()) {
      token = this.tokens.shift();
      var infix = infixParselets[token.type];
      leftExpression = infix(this, leftExpression, token);
    }
    return leftExpression;
  };

  Parser.prototype.nextPrecedence = function() {
    if (!this.tokens.length) return 0;
    return this.tokens[0].precedence;
  };

  return Parser;

});
