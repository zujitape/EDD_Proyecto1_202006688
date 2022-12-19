class Nodo{
    constructor(valor){
        this.valor = valor
        this.derecha = null
        this.izquierda = null
    }
}

export default class Arbol{
    constructor(){
        this.cabeza = null
        this.size = 0
    }

    agregar(valor){
        this.raiz = this.agregarNuevo(valor, this.cabeza)
    }

    agregarNuevo(valor, nodo){
        if(nodo == null){
            console.log("????")
            console.log(valor.valor.name)
            console.log(nodo.valor.name)
            return new Nodo(valor)
        }else{  

            if(valor.valor.name > nodo.valor.name){
                nodo.derecha = this.agregarNuevo(valor, nodo.derecha)
            }else{
                nodo.izquierda = this.agregarNuevo(valor, nodo.izquierda)
            }
        }
        return nodo
    }

    generarDot(){
        var temp = this.cabeza
        var nodos = ""

        var dot = 'digraph Matriz{\n node[margin="0.3,0.3", fontname="IMPACT", shape = box fillcolor="#FFEDBB" color=white style=filled, border = white]';
        dot += ' fontname="IMPACT"\n subgraph cluster_p{';
        dot += 'label = "Podcast" fontsize="20pt" bgcolor = white \n';
        dot += this.generarArbol(temp)
        dot+= "}\n"
        return dot
    }

    generarArbol(nodo){
        var dot = ""
        var i = 0
        var deri = 2
        var izqi = 1

        if(nodo.izquierda == null && nodo.derecha == null){
            dot = "N" + i + " [ label =\""+nodo.valor.name+"\"];\n"
        }else{
            dot = "N" + i +" [ label =\"<C0>|"+nodo.valor.name+"|<C1>\"];\n"
        }

        if(nodo.izquierda != null){
            dot += this.generarArbol(nodo.izquierda) + "N"+izqi+":C0->N"+(izqi++)+"\n"
            izqi++
        }

        if(nodo.derecha!=null){
            dot+= this.generarArbol(nodo.derecha) + "N"+deri+":C1->nodo"+(deri++)+"\n";   
            deri++                 
        }

        return dot
    }
}