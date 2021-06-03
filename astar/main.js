// Questo script non viene mai utilizzato nell'applicativo Electron, 
// serve solo per eseguire test e confronti tra i veri algoritmi

//importiamo i vari moduli NodeJS
const Astar = require('./astar');
const AstarPQ = require('./astarPQ');
const AstarPQDC = require('./astarPQDC');
const GraphCreator = require('./graphCreator');

// Creiamo la struttura grafo passando come parametri i due file .cnode e .cedge
// con, rispettivamente, la lista dei nodi e degli archi
let [g, vertices] = GraphCreator.createGraph('./maps/esempio.cnode','./maps/esempio.cedge');

var start = Date.now(); 
let routeNoPQ = Astar.aStar(vertices[0],vertices[2],g);
var millis = Date.now() - start;
console.log(`milliseconds elapsed without PQ = ${millis}`);
console.log(routeNoPQ);

start = Date.now();
let routePQ = AstarPQ.aStar(vertices[0],vertices[2],g);
millis = Date.now() - start;
console.log(`milliseconds elapsed with PQ = ${millis}`);
console.log(routePQ);

start = Date.now();
let routePQDC = AstarPQDC.aStar(vertices[0],vertices[2],g);
millis = Date.now() - start;
console.log(`milliseconds elapsed with PQ DC = ${millis}`);
console.log(routePQDC);