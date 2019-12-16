import { Parser } from 'jison'

// a grammar in JSON
const grammar = {
  "lex": {
    "rules": [
       ["\\s+", "/* skip whitespace */"],
       ["\\d+(\\.\\d+)?\\b", "return 'NUMBER';"],
       ["\\+", "return '+';"],
       ["-", "return '-';"],
       ["\\*", "return '*';"],
       ["\\/", "return '/';"],
       ["\\(", "return '(';"],
       ["\\)", "return ')';"],
       ["$", "return 'EOF';"],
    ]
  },

  operators: [
    ['left', '+', '-'],
    ['left', '*', '/'],
  ],

  "bnf": {
    "program" : [[ "e EOF", "_app.print($1)" ]],
    "e" : [
      ["e + e", "$$ = $1 + $3;"],
      ["e - e", "$$ = $1 - $3;"],
      ["e * e", "$$ = $1 * $3;"],
      ["e / e", "$$ = $1 / $3;"],
      ["( e )", "$$ = $2;"],
      ["NUMBER", "$$ = Number(yytext)"]
    ]
  }
}

// `grammar` can also be a string that uses jison's grammar format
export const defaultParser = new Parser(grammar)
