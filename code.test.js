const fs = require('fs');
const jsc = require('jsverify');

eval(fs.readFileSync('code.js') + '');

const test = jsc.forall("array (pair nat nat)", function(edges) {
    let max = edges.reduce((a, b) => Math.max(a, Math.max(b[0], b[1])),0);

    let graph = {};
    for (let i = 0; i <= max; i++) {
        graph[i] = [];
    }
    
    for (let [u, v] of edges) {
        graph[u].push(v);
    }

    function manaulDetect(graph) {
        let visited = new Set();
        let recursionStack = new Set();

        function dfs(vertex) {
            visited.add(vertex);
            recursionStack.add(vertex);
            for (let neighbor of (graph[vertex] || [])) {
                if (!visited.has(neighbor)) {
                    if (dfs(neighbor)) return true;
                } else if (recursionStack.has(neighbor)) {
                    return true;
                }
            }

            recursionStack.delete(vertex);
            return false;
        }
        for (let vertex in graph) {
            if (!visited.has(Number(vertex))) {
                if (dfs(Number(vertex))) return true;
            }
        }
        return false;
    }

    return hasCycle(graph) == manaulDetect(graph);
});

jsc.assert(test, { tests: 1000 });