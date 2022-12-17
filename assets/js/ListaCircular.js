class Nodo{
    constructor(valor){
        this.valor = valor
        this.siguiente = null
        this.anterior = null
    }
}

class ListaCircular{
    constructor(){
        this.cabeza = null
        this.cola = null
        this.size
    }

    agregarInicio(valor){
        var temp = new Nodo(valor)
        if (this.size == 0){
            this.cabeza = this.cola =  temp
        }else{
            temp.siguiente = this.cabeza
            this.cabeza.anterior = temp
            this.cabeza = temp 
        }
        unir()
    }

    agregarFinal(valor){
        var temp = new Nodo(valor)
        if(this.size == 0){
            this.cabeza = this.cola = temp 
        }else{
            var aux = this.cola
            this.cola = aux.siguiente = temp 
            this.cola.anterior = aux
        }
        unir()
    }

    unir(){
        this.cabeza.anterior = this.cola
        this.cola.siguiente = this.cabeza
    }

    
}