class Nodo{
    constructor(valor){
        this.valor = valor
        this.next = null
    }
}

export default class Pila{
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
    
    push(valor){
        var newNodo = new Nodo(valor);
        if (this.size == 0){
            this.top = newNodo
            this.bottom = newNodo
            this.size++
        }else{
            newNodo.next = this.top 
            this.top = newNodo
            this.size++
        }
    }

    pop(){
        if(this.size == 0){
            return "no existen";
        }
        
        if(this.size == 1){
            this.top = null
            this.bottom = null
            this.size--
            return this
        }

        var temp = this.top;
        this.top = temp.next;
        this.size--;
        return temp
    }

}