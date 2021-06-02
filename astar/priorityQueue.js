// User defined class
// to store element and its priority
module.exports = class PriorityQueue {
    constructor(fScore){
        this.list = new Array();
        this.fScore = fScore;
    }

    minHeapify(i){
        let l = this.left(i);
        let r = this.right(i);
        var min = i;
        // confronto i due valori fScore dei due veritici presi da list
        if (l<this.list.length && this.fScore[this.list[l]] < this.fScore[this.list[i]]){
            min = l;
        }
        if (r<this.list.length && this.fScore[this.list[r]] < this.fScore[this.list[min]]){
            min = r;
        }
        if(min != i){
            [this.list[i], this.list[min]] = [this.list[min], this.list[i]];
            this.minHeapify(min);
        }
    }

    insert(key){  //inserisce una nuova chiave nella coda e sistema l'array così che sia un min heap
        this.list.push(key);
        var i = this.list.length-1;
        while(i>0 && this.fScore[this.list[this.parent(i)]] > this.fScore[this.list[i]]){
            [this.list[i],this.list[this.parent(i)]] = [this.list[this.parent(i)], this.list[i]];
            i = this.parent(i);
        }
    }

    extractMin(){
        if (this.list.length != 0){
            let min = this.list[0];
            this.list[0] = this.list[this.list.length-1];
            this.list.pop();
            this.minHeapify(0);
            return min;
        }
    }

    decreaseKey(i){
        while(i>0 && this.fScore[this.list[this.parent(i)]] > this.fScore[this.list[i]]){
            [this.list[i],this.list[this.parent(i)]] = [this.list[this.parent(i)], this.list[i]];
            i = this.parent(i);
        }
    }

    parent(i){
        return Math.floor(i/2);
    }

    left(i){
        return 2*i;
    }

    right(i){
        return 2*i+1;
    }

    size(){
        return this.list.length;
    }

    includes(el){
        return this.list.includes(el);
    }

    indexOf(el){
        return this.list.indexOf(el);
    }
    
};