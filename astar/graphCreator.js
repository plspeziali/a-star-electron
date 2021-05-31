const readline = require('readline');
const fs = require('fs');
const Graph = require('./graph');
const Vertex = require('./vertex');

module.exports = {
    
    createGraph(nodes, edges){
        var nodesArray = fs.readFileSync(nodes).toString().split("\n");

        var g = new Graph();
        var vertices = [];
        // adding vertices
        for(line of nodesArray){
            let info = line.split(" "); // Prendo le informanzioni di ogni nodo
            let id = parseInt(info[0]);
            let x = parseFloat(info[1]);
            let y = parseFloat(info[2]);
            let newVertex = new Vertex(id,x,y);
            vertices.push(newVertex);
            g.addVertex(newVertex);
        }

        var edgesArray = fs.readFileSync(edges).toString().split("\n");
        
        for(line of edgesArray){
            let info = line.split(" "); // Prendo le informanzioni di ogni vertice
            let firstNode = parseInt(info[1]);
            let secondNode = parseInt(info[2]);
            let cost = parseFloat(info[2]);
            g.addEdge(vertices[firstNode], vertices[secondNode],cost);
        }

        //g.printGraph();

        return g;
    }
    
}