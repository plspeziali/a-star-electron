module.exports = class Vertex{

    #id;
    #x;
    #y;
    //ogni vertice ha un id identificativo unico, una x che rappresenta nel nostro caso la longitudine e y che rappresenta la latitudine 
    constructor(id, x, y){
        this.#id=id;
        this.#x=x;
        this.#y=y;
    }


    //L'euristica viene calcolata per ogni vertice che viene scoperto e nel nostro caso
    // non è altro che la distanza in linea d'aria rispetto al goal, quindi è un euristica ammissibile e consistente
    heuristic(v){
        return Math.hypot(Math.abs(this.#x - v.getX()), Math.abs(this.#y - v.getY()));
    }

    heuristicManhattan(v){
        return (Math.abs(this.#x - v.getX()) + Math.abs(this.#y - v.getY()));
    }

    heuristicRandom(v){
        return Math.floor(Math.random() * 97886655630);
    }

    getId(){return this.#id}
    getX(){return this.#x}
    getY(){return this.#y}
}