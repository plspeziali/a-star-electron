module.exports = class Vertex{

    constructor(id, x, y){
        this.id=id;
        this.x=x;
        this.y=y;
    }

    heuristic(v){
        return Math.hypot(Math.abs(this.x - v.x), Math.abs(this.y - v.y));
    }
}