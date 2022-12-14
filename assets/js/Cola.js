class Nodo{
    constructor(valor){
        this.valor = valor
        this.next = null
    }
}

export default class Cola{
    constructor(){
        this.top = null
        this.bottom = null
        this.size = 0
    }

    //primer ingresado 
    firstQue(){
        return this.bottom
    }

    //último ingresado 
    lastQue(){
        return this.top
    }

    enqueue(valor){
        var newNodo = new Nodo(valor)
        if (this.length === 0) {
            this.bottom = newNodo;
            this.top = newNodo;
            this.size++;
        }
        newNodo.next = this.top 
        this.top = newNodo
        this.size++
    }

    dequeue(){
        if (this.size === 0) {
            return "No hay datos para borrar";
        }

        if (this.size === 1) {
            this.top = null;
            this.bottom = null;
            this.size--;
            return this;
        }

        this.bottom = this.bottom.next;
        this.size--;
        return this;
    }
}