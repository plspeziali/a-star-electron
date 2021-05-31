module.exports = class Graph {
    // defining vertex array and
    // adjacent list
    constructor() {
        this.numVertices = 0;
        this.adjList = new Map();
    }
  
    // functions to be implemented
  
    // add vertex to the graph
    addVertex(v){
        // initialize the adjacent list with a
        // null array
        this.adjList.set(v, []);
        this.numVertices++;
    }

    addEdge(v, w, c){
        // get the list for vertex v and put the
        // vertex w denoting edge between v and w
        this.adjList.get(v).push({vertex: w, cost: c});
    
        // Since graph is undirected,
        // add an edge from w to v also
        this.adjList.get(w).push({vertex: v, cost: c});
    }

    getVertices(){
        this.verticesList = Array.from(this.adjList.keys());
        return this.verticesList;
    }

    getNeighbors(id){
        return this.adjList.get(this.verticesList[id]);
    }

    // Prints the vertex and adjacency list
    printGraph(){
        // get all the vertices
        var get_keys = this.adjList.keys();
    
        // iterate over the vertices
        for (var i of get_keys) {
            // great the corresponding adjacency list
            // for the vertex
            var get_values = this.adjList.get(i);
            var conc = "";
    
            // iterate over the adjacency list
            // concatenate the values into a string
            for (var j of get_values)
                conc += j.vertex.id+"["+j.cost+"]" + " ";
    
            // print the vertex and its adjacency list
            console.log(i.id + " -> " + conc);
        }
    }
  
    // bfs(v)
    // dfs(v)
};