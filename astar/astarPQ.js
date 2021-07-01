const PriorityQueue = require('./priorityQueue');

module.exports = {
    
    aStar(start, goal, graph){
        var cameFrom = new Map();//
        var gScore = new Map();//
        var fScore = new Map();//
        var openSet = new PriorityQueue(fScore);
        openSet.insert(start.getId());//
        
        idsList = graph.getIds();
        for (let v of idsList){//per ogni vertice che è nel grafo assegno una gScore Infinita
            gScore[v.getId()] = Infinity;
            fScore[v.getId()] = Infinity;
        }

        gScore[start.getId()] = 0;
        fScore[start.getId()] = goal.heuristic(start);
        while(openSet.size() !== 0){
            current = openSet.extractMin();
            //console.log("extract min: "+current);
            if(current == goal.getId()){
                return module.exports.reconstructPath(cameFrom, current)
            } 
            //non ci serve più splice perchè c'è già extractmin
            let neighbors = graph.getNeighbors(current)
            for(let edge of neighbors){
                neighbor = edge.vertex;
                let tentative_gScore = gScore[current] + edge.cost;
                //console.log("tentative_gScore: "+tentative_gScore);
                //console.log("gscore: "+gScore[neighbor.getId()]);
                if(tentative_gScore < gScore[neighbor.getId()]){
                    cameFrom[neighbor.getId()] = current;
                    gScore[neighbor.getId()] = tentative_gScore;
                    fScore[neighbor.getId()] = gScore[neighbor.getId()] + goal.heuristic(neighbor);
                    if(!openSet.includes(neighbor.getId())){ //includes è una ricerca lineare O(n)
                        openSet.insert(neighbor.getId());
                    }
                }
                //console.log("fscore: "+fScore[neighbor.getId()]);
            }
        }
        //console.log(cameFrom)
        return false;
    },

    reconstructPath(cameFrom, current){
        var totalPath = new Array();
        totalPath.push(current);
        while(typeof(cameFrom[current]) !== "undefined"){
            current = cameFrom[current]
            totalPath.push(current);
        }
        return totalPath.reverse()
    }
}