class NodoC{
    constructor(valor){
        this.valor = valor
        this.siguiente = null
        this.anterior = null
        this.abajo = null
    }
}

class NodoV{
    constructor(valor){
        this.valor = valor;
        this.siguiente = null;
        this.anterior = null;
    }
}


export default class ListaListas{
    constructor(){
        this.cabeza = null
        this.size = 0
    }
    
    //insertar artistas
    agregarH(valor){
        var temp = new NodoC(valor);
        if(this.cabeza == null){
            this.cabeza = temp 
            this.size++
        }else{
            temp.siguiente = this.cabeza
            this.cabeza.anterior = temp 
            this.cabeza = temp 
            this.size++
        }
    }

    


    //insertar canciones
    agregarV(artist, valor){
        var tempcabeza = this.cabeza
        while(tempcabeza != null){
            if(tempcabeza.valor.name == artist){
                /*variables para cambio
                    1. nueva canción a insertar.
                    2. temporal que almacena la primera canción que tenía la lista.
                */
                var cancion = new NodoV(valor)
                var primeracancion = tempcabeza.abajo

                if (primeracancion){
                    /*cambios
                    1. insertar nueva canción abajo del artista
                    2. insertar canción que antes era la primera, siguiente a la nueva
                    */
                    tempcabeza.abajo = cancion
                    cancion.siguiente = primeracancion
                    primeracancion.anterior = cancion 

                    break
                }else{
                    tempcabeza.abajo = cancion
                }
                
                
            }else{
               console.log("no agregado artista")
            }

            tempcabeza= tempcabeza.siguiente
        }
        if(tempcabeza == null){
            //html-no hay artistas
        }

    }


    generarDotArtistas(){
        console.log(this.cabeza.abajo)
        var dot = 'digraph Matriz{\n node[margin="0.3,0.3", fontname="IMPACT", shape = box fillcolor="#FFEDBB" color=white style=filled, border = white]';
        dot += ' fontname="IMPACT"\n subgraph cluster_p{';
        dot += 'label = "Artistas" fontsize="20pt" bgcolor = white \n';
        
        var temp = this.cabeza
        var conexiones ="";
        var nodos ="";
        var i= 0;

        var rank = "";
        var nodosv = "";
        var conexionesv = "";
        var c = 0;
        var tempC = null


        //cabeceras
        while(temp){

            tempC = temp.abajo

            //creo el artista
            nodos += "N" + i + "[label = \"" + temp.valor.name + "\nEdad: " + temp.valor.age + "\nPaís: " + temp.valor.country + "\"];\n"
            //rank += "N" + i 
            if (temp.siguiente != null){
                var auxi = i+1
                conexiones += "N" + i + " -> N" + auxi + ";\n"
                conexiones += "N" + auxi + " -> N" + i + ";\n"
                //rank += ", "
            }

            while(tempC){
                nodosv += "N" + c + "[label = \"" + tempC.valor.name + "\nDuración: " + tempC.valor.duration + "\"];\n"
                rank+= "N" + c
                if(tempC.siguiente != null){
                    var auxic = c+1
                    conexionesv += "N" + c + " -> N" + auxic + ";\n"
                    conexionesv += "N" + auxic + " -> N" + c + ";\n"
                    rank+= ", "
                }

                tempC = tempC.siguiente
            }
            temp = temp.siguiente
            i++
        }

        dot+= nodos+"\n\n"+conexiones+"\n\n }} "
        dot+= nodosv+"\n\n"+conexionesv+"\n\n"
            dot+= "{rank = same;" + rank + "}\n }}"

        return dot
    }

    /*
    generarDotCanciones(){
        
        var dot = 'digraph Matriz{\n node[margin="0.3,0.3", fontname="IMPACT", shape = box fillcolor="#FFEDBB" color=white style=filled, border = white]';
        dot += ' fontname="IMPACT"\n subgraph cluster_p{';
        dot += 'label = "Artistas" fontsize="20pt" bgcolor = white \n';
        
        var temp = this.cabeza
        var conexiones ="";
        var nodos ="";
        var rank = "";
        var i= 0;

        var rankv = "";
        var nodosv = "";
        var conexionesv = "";
        var tempC = null
        var c = this.size

        while(temp){

            nodos += "N" + i + "[label = \"" + temp.valor.name + "\nEdad: " + temp.valor.age + "\nPaís: " + temp.valor.country + "\"];\n"
            rank += "N" + i
            tempC = temp.abajo
            dot+= "N" + i + "-> " + "N" + c + "\n"
            dot+= "N" + c + "-> " + "N" + i + "\n"
            while(tempC){
                nodosv += "N" + c + "[label = \"" + tempC.valor.name + "\nDuración: " + tempC.valor.duration + "\"];\n"
                rankv+= "N" + c
                if(tempC.siguiente != null){
                    var auxic = c+1
                    conexionesv += "N" + c + " -> N" + auxic + ";\n"
                    conexionesv += "N" + auxic + " -> N" + c + ";\n"
                    rankv+= ", "
                }

                nodos+=nodosv
                conexiones += conexionesv
                nodosv = ""
                conexionesv = ""
                
                tempC = tempC.siguiente
                
                c++
            }

            dot+= "{rank = same; N" + i + "," +rankv + "}\n"
            rankv= ""
            

            if (temp.siguiente != null){
                var auxi = i+1
                conexiones += "N" + i + " -> N" + auxi + ";\n"
                conexiones += "N" + auxi + " -> N" + i + ";\n"
                rank += ", "
            }


            temp = temp.siguiente
            i++
        }

        dot+= nodos+"\n\n"+conexiones+"\n\n"
        dot+= "}\n}"

        return dot

    }

    */

    generarDotCanciones(){
        
        var dot = 'digraph Matriz{\n node[fontsize="10pt", margin="0.1,0.1", fontname="IMPACT", shape = box fillcolor="#FFEDBB" color=white style=filled, border = white]';
        dot += ' fontname="IMPACT" \n subgraph cluster_p{';
        dot += 'label = "Artistas" fontsize="20pt" bgcolor = white \n';
        
        var temp = this.cabeza
        var conexiones ="";
        var nodos ="";
        var rank = "";
        var i= 0;

        var rankv = "";
        var nodosv = "";
        var conexionesv = "";
        var tempC = null
        var c = this.size

        while(temp){

            nodos += "N" + i + "[label = \"" + temp.valor.name + "\nEdad: " + temp.valor.age + "\nPaís: " + temp.valor.country + "\"];\n"
            rank += "N" + i

            tempC = temp.abajo

            if(tempC!=null){
                conexiones+= "N" + i + "-> " + "N" + c + "\n"
                conexiones+= "N" + c + "-> " + "N" + i + "\n"
            }


            
            while(tempC){
                nodosv += "N" + c + "[label = \"" + tempC.valor.name + "\nDuración: " + tempC.valor.duration + "\"];\n"
                rankv+= "N" + c
                if(tempC.siguiente != null){
                    var auxic = c+1
                    conexionesv += "N" + c + " -> N" + auxic + ";\n"
                    conexionesv += "N" + auxic + " -> N" + c + ";\n"
                    rankv+= ", "
                }

                nodos+=nodosv
                conexiones += conexionesv
                nodosv = ""
                conexionesv = ""
                
                tempC = tempC.siguiente
                
                c++
            }
            

            if (temp.siguiente != null){
                var auxi = i+1
                conexiones += "N" + i + " -> N" + auxi + ";\n"
                conexiones += "N" + auxi + " -> N" + i + ";\n"
                rank += ", "
            }


            temp = temp.siguiente
            i++
        }

        dot+= nodos+"\n\n"+conexiones+"\n\n"
        dot+= "{rank= same; "+rank+"}\n}}"

        return dot

    }


    mostrarCabeceras(){
        var temporal = this.head
        console.log("*********** Cabeceras *********")
        while (temporal != null){
            console.log(temporal.value)
            temporal = temporal.next
        }
    }

    //artistas
    

    //canciones-artista
    
    showValues(value){
        var temp = this.cabeza
        while (temp != null){
            if(temp.value == value){
                console.log("*********** Cabecera "+value+" *********")        
                var tempcanciones = temp.abajo
                while(tempcanciones != null){
                    console.log(tempcanciones.value)
                    tempcanciones = tempcanciones.siguiente
                }
                return
            }
            temp = temp.siguiente
        }
        if(temp == null){
            console.log("No se pudo encontrar el cabeza solicitado "+value)
        }
    }
    
}