### 出力結果1

``` javascript
let a
a
=
3
console.log(a)
```


```json
{
  "type": "Program",
  "start": 0,
  "end": 35,
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 1,
      "end": 6,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 5,
          "end": 6,
          "id": {
            "type": "Identifier",
            "start": 5,
            "end": 6,
            "name": "a"
          },
          "init": null
        }
      ],
      "kind": "let"
    },
    {
      "type": "ExpressionStatement",
      "start": 8,
      "end": 15,
      "expression": {
        "type": "AssignmentExpression",
        "start": 8,
        "end": 15,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 8,
          "end": 9,
          "name": "a"
        },
        "right": {
          "type": "Literal",
          "start": 14,
          "end": 15,
          "value": 3,
          "raw": "3"
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 17,
      "end": 31,
      "expression": {
        "type": "CallExpression",
        "start": 17,
        "end": 31,
        "callee": {
          "type": "MemberExpression",
          "start": 17,
          "end": 28,
          "object": {
            "type": "Identifier",
            "start": 17,
            "end": 24,
            "name": "console"
          },
          "property": {
            "type": "Identifier",
            "start": 25,
            "end": 28,
            "name": "log"
          },
          "computed": false,
          "optional": false
        },
        "arguments": [
          {
            "type": "Identifier",
            "start": 29,
            "end": 30,
            "name": "a"
          }
        ],
        "optional": false
      }
    }
  ],
  "sourceType": "script"
}
```

<img src="ast1.png">
### 出力結果2

``` javascript
let a; a = 3; console.log(a);
```

```json
{
  "type": "Program",
  "start": 0,
  "end": 30,
  "body": [
    {
      "type": "VariableDeclaration",
      "start": 1,
      "end": 7,
      "declarations": [
        {
          "type": "VariableDeclarator",
          "start": 5,
          "end": 6,
          "id": {
            "type": "Identifier",
            "start": 5,
            "end": 6,
            "name": "a"
          },
          "init": null
        }
      ],
      "kind": "let"
    },
    {
      "type": "ExpressionStatement",
      "start": 8,
      "end": 14,
      "expression": {
        "type": "AssignmentExpression",
        "start": 8,
        "end": 13,
        "operator": "=",
        "left": {
          "type": "Identifier",
          "start": 8,
          "end": 9,
          "name": "a"
        },
        "right": {
          "type": "Literal",
          "start": 12,
          "end": 13,
          "value": 3,
          "raw": "3"
        }
      }
    },
    {
      "type": "ExpressionStatement",
      "start": 15,
      "end": 30,
      "expression": {
        "type": "CallExpression",
        "start": 15,
        "end": 29,
        "callee": {
          "type": "MemberExpression",
          "start": 15,
          "end": 26,
          "object": {
            "type": "Identifier",
            "start": 15,
            "end": 22,
            "name": "console"
          },
          "property": {
            "type": "Identifier",
            "start": 23,
            "end": 26,
            "name": "log"
          },
          "computed": false,
          "optional": false
        },
        "arguments": [
          {
            "type": "Identifier",
            "start": 27,
            "end": 28,
            "name": "a"
          }
        ],
        "optional": false
      }
    }
  ],
  "sourceType": "script"
}
```


<img src="ast1.png">

<img src="ast2.png">