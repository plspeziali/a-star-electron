const Astar = require('./astar');
const AstarPQ = require('./astarPQ');
const GraphCreator = require('./graphCreator');
const fs = require('fs');
const {execSync} = require('child_process');

var g = GraphCreator.createGraph('./maps/cal.cnode','./maps/cal.cedge');
//g.printGraph();
let vertices = g.getVertices();

var start = Date.now();
let routeNoPQ = Astar.aStar(vertices[9],vertices[11],g);
var millis = Date.now() - start;
console.log(`milliseconds elapsed without PQ = ${millis}`);
console.log(routeNoPQ);

start = Date.now();
let routePQ = AstarPQ.aStar(vertices[9],vertices[11],g);
millis = Date.now() - start;
console.log(`milliseconds elapsed with PQ = ${millis}`);
console.log(routePQ);

var routeList = new Array();

for(el of routePQ){
    routeList.push(vertices[el]);
}
console.log(routeList);

try {
    fs.writeFileSync('gui/demo/route.json', 'var jsonRoute = '+JSON.stringify(routeList));
    execSync('opener gui/demo/demo.html',{stdio: 'inherit'});
} catch (error) {
    console.error(error);
}