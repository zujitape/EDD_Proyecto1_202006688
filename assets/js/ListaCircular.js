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
        this.size
    }

    agregar(valor){
        if(this.cabeza == null){//si la cabeza es nula, agregamos el nuevo nodo en ella y lo enlazamos
            this.cabeza = new Nodo(valor)
            this.cabeza.siguiente = this.cabeza
            this.cabeza.anterior = this.cabeza
            this.size++
        }else{//si la cabeza existe, recorremos la lista e insertamos en la última posición
            var temp = this.cabeza
            if(this.size == 1){//Si tiene tamaño 1, el único elemento es la cabeza, asignamos a su siguiente nodo el nuevo nodo y lo enlazamos
                var newNodo = new Nodo(valor)
                temp.siguiente = newNodo
                newNodo.anterior = temp 
                newNodo.siguiente = this.cabeza
                this.cabeza.anterior = newNodo
                this.size++
            }else{//Si el tamaño es mayor a 1, recorremos hasta el final y agregamos el nuevo nodo
                var i = 0
                var actual = this.cabeza
                while(i < this.size){
                    actual = actual.siguiente
                    i++
                }

                actual = actual.anterior //nos posicionamos en un elemento antes del último
                var tempo = new Nodo(valor)
                actual.siguiente = tempo
                tempo.anterior = actual
                tempo.siguiente = this.cabeza //enlace último-cabeza
                this.cabeza.anterior = tempo
                this.size++
            }
        }
    }

    generarDot(){
        var dot = 'digraph Matriz{\n node[fontsize="10pt", margin="0.1,0.1", fontname="IMPACT", shape = box fillcolor="#FFEDBB" color=white style=filled, border = white]';
        dot += ' fontname="IMPACT" \n subgraph cluster_p{';
        dot += 'label = "Playlist" fontsize="20pt" bgcolor = white \n';

        var temp = this.cabeza 

        //Para poder graficar
        var temp = this.cabeza
        var conexiones ="";
        var nodos ="";
        var rank = "";
        var i= 0;

        while(temp){
            nodos+= "N" + i + "[label = \"" + temp.valor.username + "\"];\n"
            rank+= "N" + i
            if(temp.siguiente != null){
              var auxi = i+1
              conexiones += "N" + i +" -> N" + auxi + ";\n"
              conexiones += "N" + auxi +" -> N" + i + ";\n"
              rank+= ", "
            }
    
            temp = temp.siguiente
            i++
          }
        
        dot+= nodos+"\n \n"+conexiones+"\n\n"
        dot+= "{rank = same;" + rank + "}\n}\n}"
        return dot

    }
}