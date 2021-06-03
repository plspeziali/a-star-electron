// Questa classe implementa una coda di priorità che ci serve per ordinare openSet
module.exports = class PriorityQueue {
    // fScore viene passato per riferimento in modo da avere i suoi valori per l'ordinamento sempre aggiornati
    constructor(fScore){
        this.list = new Array();
        this.fScore = fScore;
    }

    minHeapify(i){
        let l = this.left(i);
        let r = this.right(i);
        var min = i;
        // Confronto i due valori fScore dei due vertici presi da list
        if (l<this.list.length && this.fScore[this.list[l]] < this.fScore[this.list[i]]){
            min = l;
        }
        if (r<this.list.length && this.fScore[this.list[r]] < this.fScore[this.list[min]]){
            min = r;
        }
        if(min != i){ 
            [this.list[i], this.list[min]] = [this.list[min], this.list[i]];
            //minHeapify ristabilisce la struttura del minHeap ricorsivamente
            this.minHeapify(min);
        }
    }

    // Inserisce una nuova chiave nella coda e ordina l'array affinché sia un min heap
    insert(key){  
        this.list.push(key);
        var i = this.list.length-1;
        while(i>0 && this.fScore[this.list[this.parent(i)]] > this.fScore[this.list[i]]){
            [this.list[i],this.list[this.parent(i)]] = [this.list[this.parent(i)], this.list[i]];
            i = this.parent(i);
        }
    }

    // Permette di estrarre il valore corretto di openSet semplicemente prendendo il primo elemento dell'array
    extractMin(){
        if (this.list.length != 0){
            let min = this.list[0];
            this.list[0] = this.list[this.list.length-1];
            this.list.pop();
            this.minHeapify(0);
            return min;
        }
    }

    // Permette di andare a riordinare correttamente il minHeap se c'è un elemento di openSet il cui valore di fScore è cambiato
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