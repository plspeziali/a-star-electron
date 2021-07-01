module.exports = {
    
    aStar(start, goal, graph){
        var openSet = new Array();
        openSet.push(start.getId());//
        var cameFrom = new Map();//
        var gScore = new Map();//
        var fScore = new Map();//

        var visited = 0;

        let idsList = graph.getIds();
        for (let v of idsList){//per ogni vertice che è nel grafo assegno una gScore Infinita
            gScore[v.getId()] = Infinity;
            fScore[v.getId()] = Infinity;
        }

        gScore[start.getId()] = 0;
        fScore[start.getId()] = goal.heuristic(start);
        while(openSet.length !== 0){
            current = module.exports.minKey(fScore, openSet);
            if(current === goal.getId()){
                return module.exports.reconstructPath(cameFrom, current, visited)
            }
            openSet.splice(openSet.indexOf(current),1);
            let neighbors = graph.getNeighbors(current)
            for(let edge of neighbors){
                visited++;
                neighbor = edge.vertex;
                let tentative_gScore = gScore[current] + edge.cost;
                //console.log("tentative_gScore: "+tentative_gScore);
                //console.log("gscore: "+gScore[neighbor.getId()]);
                if(tentative_gScore < gScore[neighbor.getId()]){
                    cameFrom[neighbor.getId()] = current;
                    gScore[neighbor.getId()] = tentative_gScore;
                    fScore[neighbor.getId()] = gScore[neighbor.getId()] + goal.heuristic(neighbor);
                    if(!openSet.includes(neighbor.getId())){
                        openSet.push(neighbor.getId());
                    }
                }
                //console.log("fscore: "+fScore[neighbor.getId()]);
            }
        }
        //console.log(cameFrom)
        return false;
    },

    reconstructPath(cameFrom, current, visited){
        var totalPath = new Array();
        totalPath.push(current);
        while(typeof(cameFrom[current]) !== "undefined"){
            current = cameFrom[current]
            totalPath.push(current);
        }
        return [totalPath.reverse(), visited]
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