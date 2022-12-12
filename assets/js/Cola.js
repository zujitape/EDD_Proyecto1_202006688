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
    peek(){
        return this.bottom
    }

    //último ingresado 
    bottom(){
        return this.top
    }

    enqueue(valor){
        var newNodo = new Nodo(valor)
        if (this.length === 0) {
            this.bottom = newNodo;
            this.top = newNodo;
            this.size++;
        }

        this.top.next = newNodo;
        this.top = newNodo;
        this.length++;
    }

    dequeue(){
        if (this.size === 0) {
            return "No hay datos para borrar";
        }

        if (this.length === 1) {
            this.top = null;
            this.bottom = null;
            this.length--;
            return this;
        }

        this.bottom = this.bottom.next;
        this.length--;
        return this;
    }
}