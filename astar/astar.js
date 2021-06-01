module.exports = {
    
    aStar(start, goal, graph){
        var openSet = new Array();
        openSet.push(start.id);//
        var cameFrom = new Map();//
        var gScore = new Map();//
        var fScore = new Map();//

        for (let v of graph.adjList.keys()){//per ogni vertice che è nel grafo assegno una gScore Infinita
            gScore[v.id] = Infinity;
            fScore[v.id] = Infinity;
        }

        gScore[start.id] = 0;
        fScore[start.id] = goal.heuristic(start);
        while(openSet.length !== 0){
            current = module.exports.minKey(fScore, openSet);
            if(current === goal.id){
                return module.exports.reconstructPath(cameFrom, current)
            }
            openSet.splice(openSet.indexOf(current),1);
            let neighbors = graph.getNeighbors(current)
            for(let edge of neighbors){
                neighbor = edge.vertex;
                let tentative_gScore = gScore[current] + edge.cost;
                //console.log("tentative_gScore: "+tentative_gScore);
                //console.log("gscore: "+gScore[neighbor.id]);
                if(tentative_gScore < gScore[neighbor.id]){
                    cameFrom[neighbor.id] = current;
                    gScore[neighbor.id] = tentative_gScore;
                    fScore[neighbor.id] = gScore[neighbor.id] + goal.heuristic(neighbor);
                    if(!openSet.includes(neighbor.id)){
                        openSet.push(neighbor.id);
                    }
                }
                //console.log("fscore: "+fScore[neighbor.id]);
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
    },

    minKey(map, list){
        var minKey;
        var minValue = Infinity;
        for(let key of list){
            let value = map[key];
            if(value < minValue){
                minValue = value;
                minKey = key;
            }
        }
        return minKey;
    }
}