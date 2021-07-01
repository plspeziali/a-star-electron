const PriorityQueue = require('./priorityQueue');

module.exports = {
    
    // Qui inizia l'algoritmo vero e proprio, la funzione prende come parametri i vertici di inizio e fine e il grafo totale
    aStar(start, goal, graph){
        var cameFrom = new Map();                   // Mappa che associa ad ogni nodo il proprio predecessore così che
                                                    // si possa risalire ai nodi che costituiscono il cammino scelto
        var gScore = new Map();                     // Mappa che associa ad ogni nodo il costo minimo per arrivarci dal nodo start fino ad ora 
        var fScore = new Map();//                   // Mappa che associa ad ogni nodo il valore della f(n)=g(n)+h(n) fino ad ora conosciuta 
        var openSet = new PriorityQueue(fScore);    // Coda di priorità che tiene traccia dei nodi da analizzare(o rianalizzare) e dei loro vicini
        
        var visited = 0;
        // All'inizio si inserisce solo il nodo di start
        openSet.insert(start.getId());
        
        // Assegnamo ad ogni nodo gScore ed fScore infiniti
        idsList = graph.getIds();
        for (let v of idsList){
            gScore[v.getId()] = Infinity;
            fScore[v.getId()] = Infinity;
        }
        
        gScore[start.getId()] = 0;
        fScore[start.getId()] = goal.heuristic(start);

        // Continuiamo finché openSet sarà vuoto (implica fallimento)
        while(openSet.size() !== 0){
            // Prendiamo il nodo in openSet con minor valore di fScore
            current = openSet.extractMin();
            //Se siamo arrivati al nodo di goal richiamiamo il metodo reconstructPath
            if(current == goal.getId()){
                return module.exports.reconstructPath(cameFrom, current, visited)
            } 
            //Ricaviamo i vicini di current
            let neighbors = graph.getNeighbors(current)
            //Per ogni vicino di current 
            for(let edge of neighbors){
                visited++;
                // Ogni edge è formato da una coppia Vertex e Cost
                let neighbor = edge.vertex;
                let tentative_gScore = gScore[current] + edge.cost;
                // Se il nuovo gscore è minore di quello registrato precedentemente, aggiorniamo i valori relativi
                if(tentative_gScore < gScore[neighbor.getId()]){
                    cameFrom[neighbor.getId()] = current;
                    gScore[neighbor.getId()] = tentative_gScore;
                    fScore[neighbor.getId()] = gScore[neighbor.getId()] + goal.heuristic(neighbor);
                    // Controlliamo se il vicino in questione è già stato inserito in openSet
                    // indexOf è una ricerca lineare con complessità O(n)
                    let index = openSet.indexOf(neighbor.getId());
                    if(index == -1){
                        //Se il vicino non era già in openSet lo aggiungiamo
                        openSet.insert(neighbor.getId());
                    } else {
                        // Se è gia presente, aggiorniamo la sua posizione nella coda
                        openSet.decreaseKey(index);
                    }
                }
            }
        }
        // Fallimento nel trovare un percorso
        return false;
    },

    reconstructPath(cameFrom, current, visited){
        // Si utilizza un array per ricostruire il percorso ottenuto a partire dal goal, procedendo al contrario fino al nodo di start
        var totalPath = new Array();
        totalPath.push(current);
        while(typeof(cameFrom[current]) !== "undefined"){
            current = cameFrom[current]
            totalPath.push(current);
        }
        // Si restituisce la lista nell'ordine corretto
        return [totalPath.reverse(), visited] 
    }
}