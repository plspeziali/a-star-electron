const Astar = require('./astar');
const AstarPQ = require('./astarPQ');
const AstarPQDC = require('./astarPQDC');
const GraphCreator = require('./graphCreator');
const fs = require('fs');
const {execSync} = require('child_process');

var g = GraphCreator.createGraph('./maps/cal.cnode','./maps/cal.cedge');
//g.printGraph();
let vertices = g.getVertices();

var start = Date.now();
let routeNoPQ = Astar.aStar(vertices[0],vertices[21047],g);
var millis = Date.now() - start;
console.log(`milliseconds elapsed without PQ = ${millis}`);
console.log(routeNoPQ);

start = Date.now();
let routePQ = AstarPQ.aStar(vertices[0],vertices[21047],g);
millis = Date.now() - start;
console.log(`milliseconds elapsed with PQ = ${millis}`);
console.log(routePQ);

start = Date.now();
let routePQDC = AstarPQDC.aStar(vertices[0],vertices[21047],g);
millis = Date.now() - start;
console.log(`milliseconds elapsed with PQ DC = ${millis}`);
console.log(routePQDC);

var routeList = new Array();

for(el of routePQ){
    routeList.push(vertices[el]);
}
//console.log(routeList);