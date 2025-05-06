const fs = require('fs');
const assert = require('assert');

eval(fs.readFileSync('code.js')+'');

// Simple cycle
var graph = {
    0: [1],
    1: [2],
    2: [0]
};
assert(hasCycle(graph) == true);

// No cycle
var graph = {
    0: [1],
    1: [2],
    2: []
};
assert(hasCycle(graph) == false);

// Self loop
var graph = {
    0: [0]
};
assert(hasCycle(graph) == true);

// Empty
var graph = {};
assert(hasCycle(graph) == false);

// Complex
var graph = {
    0: [1, 2],
    1: [2],
    2: [3],
    3: [1]
};
assert(hasCycle(graph) == true);

// Disconnected nodes
var graph = {
    0: [1],
    1: [],
    2: [3],
    3: [4],
    4: [2]
};
assert(hasCycle(graph) == true);

// Multiple nodes, no cycle
var graph = {
    0: [1, 2],
    1: [3],
    2: [3],
    3: []
};
assert(hasCycle(graph) == false);
