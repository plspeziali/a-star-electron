// Importiamo i moduli di NodeJS tra cui quello per gestire il FS e leggerne e scriverne i file di interesse in esso contenuti
const fs = require('fs');
const Graph = require('./graph');
const Vertex = require('./vertex');

// Indichiamo quali funzioni e variabili rendiamo disponibili a chi importa questo modulo
module.exports = {
    
    // Dati due file che contengono i vertici e gli archi, restituisce il grafo costruito su di essi e la lista dei vertici
    createGraph(nodes, edges){
        var g = new Graph();
        var vertices = new Array();
        
        //leggiamo il file nodes riga per riga e ogni vertice viene messo nell'array
        var nodesArray = fs.readFileSync(nodes).toString().split("\n");

        // Creiamo i vertici
        for(line of nodesArray){
            let info = line.split(" "); // Prendo le informanzioni di ogni nodo
            let id = parseInt(info[0]);
            let x = parseFloat(info[1]);
            let y = parseFloat(info[2]);
            // Dopo aver letto ogni riga del file e 1aver recuperato ogni valore separato
            // da uno spazio possiamo creare i vertici sulla base di id, x e y e aggiungerli alla lista e al grafo
            let newVertex = new Vertex(id,x,y);
            vertices.push(newVertex);
            g.addVertex(newVertex);
        }

        //Procediamo per gli archi allo stesso modo
        var edgesArray = fs.readFileSync(edges).toString().split("\n");
        
        for(line of edgesArray){
            let info = line.split(" "); // Prendo le informanzioni di ogni vertice
            let firstNode = parseInt(info[1]);
            let secondNode = parseInt(info[2]);
            let cost = parseFloat(info[2]);
            g.addEdge(vertices[firstNode], vertices[secondNode],cost);
        }

        return [g, vertices];
    }
    
}