function hasCycle(graph) {
    // graph is empty or has no vertices
    if (!graph || Object.keys(graph).length == 0) return false;
    
    const visited = new Set();
    const recursionStack = new Set();
    
    function dfsHasCycle(vertex) {
        visited.add(vertex);
        recursionStack.add(vertex);
        
        // neighbors of current vertex
        const neighbors = graph[vertex] || [];
        for (let neighbor of neighbors) {
            // if neighbor hasnt been visited explore it
            if (!visited.has(neighbor)) {
                if (dfsHasCycle(neighbor)) return true;
            }
            // neighbor is in recursion stack cycle found
            else if (recursionStack.has(neighbor)) {
                return true;
            }
        }
        
        recursionStack.delete(vertex);
        return false;
    }
    
    // in case graph is disconnected
    for (let vertex of Object.keys(graph)) {
        if (!visited.has(vertex)) {
            if (dfsHasCycle(vertex)) return true;
        }
    }
    
    return false;
}
