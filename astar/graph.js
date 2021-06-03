module.exports = class Graph {
    // Si definiscono per il grafo la lista di adiacenza
    // e l'array dei vertici (ridondanza sulla memoria che riduce la ciomplessità)
    constructor() {
        this.adjList = new Map();
        this.verticesList = new Array();
    }
  
   
  
    //aggiunge i vertici
    addVertex(v){
        // La lista di adiacenza contiene la coppia nodo-lista archi che partono da quel vertice (qua vuota)
        this.adjList.set(v, []);
        this.verticesList.push(v);
    }

    addEdge(v, w, c){
        // Associamo a ogni vertice il vicino e il costo per arrivarci, che nel nostro caso è 
        // un dato presente nel file .cedge e rapprensenta la distanza effettiva tra i due vertici
        this.adjList.get(v).push({vertex: w, cost: c});
        this.adjList.get(w).push({vertex: v, cost: c});
    }


    getVertices(){
        return this.verticesList;
    }

    getNeighbors(id){
        return this.adjList.get(this.verticesList[id]);
    }

    // Stampa il grafo
    printGraph(){
        var get_keys = this.adjList.keys();
        for (var i of get_keys) {
            var get_values = this.adjList.get(i);
            var conc = "";
            for (var j of get_values)
                conc += j.vertex.id+"["+j.cost+"]" + " ";
            console.log(i.id + " -> " + conc);
        }
    }
};