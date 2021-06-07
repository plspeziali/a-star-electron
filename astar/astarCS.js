const PriorityQueue = require('./priorityQueue');

module.exports = {
    
    // Qui inizia l'algoritmo vero e proprio, la funzione prende come parametri i vertici di inizio e fine e il grafo totale
    aStar(start, goal, graph){
        var cameFrom = new Map();                   // Mappa che associa ad ogni nodo il proprio predecessore così che
                                                    // si possa risalire ai nodi che costituiscono il cammino scelto
        var gScore = new Map();                     // Mappa che associa ad ogni nodo il costo minimo per arrivarci dal nodo start fino ad ora 
        var fScore = new Map();//                   // Mappa che associa ad ogni nodo il valore della f(n)=g(n)+h(n) fino ad ora conosciuta 
        var openSet = new PriorityQueue(fScore);    // Coda di priorità che tiene traccia dei nodi da analizzare(o rianalizzare) e dei loro vicini
        var closedSet = new Map();
        // All'inizio si inserisce solo il nodo di start
        openSet.insert(start.id);
        
        // Assegnamo ad ogni nodo gScore ed fScore infiniti
        for (let v of graph.adjList.keys()){
            gScore[v.id] = Infinity;
            fScore[v.id] = Infinity;
            closedSet[v.id] = false;
        }
        
        gScore[start.id] = 0;
        fScore[start.id] = goal.heuristic(start);

        // Continuiamo finché openSet sarà vuoto (implica fallimento)
        while(openSet.size() !== 0){
            // Prendiamo il nodo in openSet con minor valore di fScore
            current = openSet.extractMin();
            closedSet[current] = true;
            //Se siamo arrivati al nodo di goal richiamiamo il metodo reconstructPath
            if(current == goal.id){
                return module.exports.reconstructPath(cameFrom, current)
            } 
            //Ricaviamo i vicini di current
            let neighbors = graph.getNeighbors(current)
            //Per ogni vicino di current 
            for(let edge of neighbors){
                // Ogni edge è formato da una coppia Vertex e Cost
                let neighbor = edge.vertex;
                if(!closedSet[neighbor.id]){
                    let tentative_gScore = gScore[current] + edge.cost;
                    // Se il nuovo gscore è minore di quello registrato precedentemente, aggiorniamo i valori relativi
                    if(tentative_gScore < gScore[neighbor.id]){
                        cameFrom[neighbor.id] = current;
                        gScore[neighbor.id] = tentative_gScore;
                        fScore[neighbor.id] = gScore[neighbor.id] + goal.heuristicRandom(neighbor);
                        // Controlliamo se il vicino in questione è già stato inserito in openSet
                        // indexOf è una ricerca lineare con complessità O(n)
                        let index = openSet.indexOf(neighbor.id);
                        if(index == -1){
                            //Se il vicino non era già in openSet lo aggiungiamo
                            openSet.insert(neighbor.id);
                        } else {
                            // Se è gia presente, aggiorniamo la sua posizione nella coda
                            openSet.decreaseKey(index);
                        }
                    }
                }
            }
        }
        // Fallimento nel trovare un percorso
        return false;
    },

    reconstructPath(cameFrom, current){
        // Si utilizza un array per ricostruire il percorso ottenuto a partire dal goal, procedendo al contrario fino al nodo di start
        var totalPath = new Array();
        totalPath.push(current);
        while(typeof(cameFrom[current]) !== "undefined"){
            current = cameFrom[current]
            totalPath.push(current);
        }
        // Si restituisce la lista nell'ordine corretto
        return totalPath.reverse() 
    }
}