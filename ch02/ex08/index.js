import * as acorn from 'acorn';
import * as fs from 'fs';

import { execSync } from 'child_process';


// 解析するコード
const code_1 = fs.readFileSync('ch02/ex08/file1.js', 'utf-8');
const code_2 = fs.readFileSync('ch02/ex08/file2.js', 'utf-8');
const code_3 = fs.readFileSync('ch02/ex08/file3.js', 'utf-8');

// ASTを生成
const ast_1 = acorn.parse(code_1, { ecmaVersion: 2020 });
const ast_2 = acorn.parse(code_2, { ecmaVersion: 2020 });
const ast_3 = acorn.parse(code_3, { ecmaVersion: 2020 });

console.log(ast_1);
console.log(ast_2);
console.log(ast_3);

// ASTをJSONとして出力
fs.writeFileSync('ch02/ex08/ast1.json', JSON.stringify(ast_1, null, 2));
fs.writeFileSync('ch02/ex08/ast2.json', JSON.stringify(ast_2, null, 2));
fs.writeFileSync('ch02/ex08/ast3.json', JSON.stringify(ast_3, null, 2));

// DOT形式に変換
function astToDot(ast, label) {
    const nodes = [];
    const edges = [];
    function traverse(node, parentId) {
        const nodeId = nodes.length;
        let nodeLabel = node.type;
        if (node.type === 'Literal' && node.hasOwnProperty('value')) {
            nodeLabel += `:${node.value}`;
        }
        nodes.push(`"${nodeId}" [label="${nodeLabel}"]`);
        if (parentId !== null) {
            edges.push(`"${parentId}" -> "${nodeId}"`);
        }
        for (const key in node) {
            if (typeof node[key] === 'object' && node[key] !== null) {
                if (Array.isArray(node[key])) {
                    node[key].forEach(child => traverse(child, nodeId));
                } else {
                    traverse(node[key], nodeId);
                }
            }
        }
    }
    traverse(ast, null);
    return `digraph ${label} {\n` +
        `  graph [label="${label}"];\n` +
        nodes.join('\n') + '\n' +
        edges.join('\n') + '\n' +
        '}';
}

// DOTファイルを保存
fs.writeFileSync('ch02/ex08/ast1.dot', astToDot(ast_1, 'AST1'));
fs.writeFileSync('ch02/ex08/ast2.dot', astToDot(ast_2, 'AST2'));
fs.writeFileSync('ch02/ex08/ast3.dot', astToDot(ast_3, 'AST3'));

// Graphvizを使って画像を生成
execSync('dot -Tpng ch02/ex08/ast1.dot -o ch02/ex08/ast1.png');
execSync('dot -Tpng ch02/ex08/ast2.dot -o ch02/ex08/ast2.png');
execSync('dot -Tpng ch02/ex08/ast3.dot -o ch02/ex08/ast3.png');
