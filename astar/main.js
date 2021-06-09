// Questo script non viene mai utilizzato nell'applicativo Electron, 
// serve solo per eseguire test e confronti tra i veri algoritmi

//importiamo i vari moduli NodeJS
const Astar = require('./astar');
const AstarPQ = require('./astarPQ');
const AstarPQDC = require('./astarPQDC');
const AstarCS = require('./astarCS');
const GraphCreator = require('./graphCreator');

// Creiamo la struttura grafo passando come parametri i due file .cnode e .cedge
// con, rispettivamente, la lista dei nodi e degli archi
let [g, vertices] = GraphCreator.createGraph('./maps/perugia.cnode','./maps/perugia.cedge');

/*var start = Date.now(); 
let routeNoPQ = Astar.aStar(vertices[0],vertices[21047],g);
var millis = Date.now() - start;

console.log(`milliseconds elapsed without PQ = ${millis}`);
console.log(routeNoPQ);

start = Date.now();
let routePQ = AstarPQ.aStar(vertices[0],vertices[21047],g);
millis = Date.now() - start;
console.log(`milliseconds elapsed with PQ = ${millis}`);
console.log(routePQ);*/

var start = Date.now();
var [routePQDC, N] = AstarPQDC.aStar(vertices[1],vertices[15551],g);
var millis = Date.now() - start;
var bf = Math.pow(N, 1/routePQDC.length);
console.log(`milliseconds elapsed with PQ DC = ${millis}`);
console.log(`N = ${N}`);
console.log(`d = ${routePQDC.length}`);
console.log(`branching factor = ${bf}`);
console.log(routePQDC);
start = Date.now();
[routePQDC, N] = AstarPQDC.aStar(vertices[1],vertices[15552],g);
millis = Date.now() - start;
var bf = Math.pow(N, 1/routePQDC.length);
console.log(`milliseconds elapsed with PQ DC = ${millis}`);
console.log(`N = ${N}`);
console.log(`d = ${routePQDC.length}`);
console.log(`branching factor = ${bf}`);
console.log(routePQDC);
start = Date.now();
[routePQDC, N] = AstarPQDC.aStar(vertices[1],vertices[15553],g);
millis = Date.now() - start;
var bf = Math.pow(N, 1/routePQDC.length);
console.log(`milliseconds elapsed with PQ DC = ${millis}`);
console.log(`N = ${N}`);
console.log(`d = ${routePQDC.length}`);
console.log(`branching factor = ${bf}`);
console.log(routePQDC);
start = Date.now();
[routePQDC, N] = AstarPQDC.aStar(vertices[1],vertices[15554],g);
millis = Date.now() - start;
var bf = Math.pow(N, 1/routePQDC.length);
console.log(`milliseconds elapsed with PQ DC = ${millis}`);
console.log(`N = ${N}`);
console.log(`d = ${routePQDC.length}`);
console.log(`branching factor = ${bf}`);
console.log(routePQDC);
start = Date.now();
[routePQDC, N] = AstarPQDC.aStar(vertices[1],vertices[15555],g);
millis = Date.now() - start;
var bf = Math.pow(N, 1/routePQDC.length);
console.log(`milliseconds elapsed with PQ DC = ${millis}`);
console.log(`N = ${N}`);
console.log(`d = ${routePQDC.length}`);
console.log(`branching factor = ${bf}`);
console.log(routePQDC);

/*start = Date.now();
let routeCS = AstarCS.aStar(vertices[0],vertices[21047],g);
millis = Date.now() - start;
console.log(`milliseconds elapsed with PQ CS = ${millis}`);
console.log(routeCS);*/