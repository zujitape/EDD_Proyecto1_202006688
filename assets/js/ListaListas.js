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
        this.cola = null
        this.size = 0
    }
    
    //insertar artistas
    addHeader(valor){
        var temp = new NodoC(valor);
        temp.siguiente = this.cabeza
        if(this.cabeza != null){
            this.cabeza.anterior = temp
            this.size++
        }
        if(this.cabeza == null){
            this.cola = temp 
            this.size++
        }
        this.cabeza = temp 
    }

    //insertar canciones
    addValue(artist, valor){
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
               console.log("-")
            }

            tempcabeza= tempcabeza.siguiente
        }
        if(tempcabeza == null){
            //html-no hay artistas
        }

    }

    generarDotArtistas(){
        var dot = 'digraph Matriz{\n node[margin="0.3,0.3", fontname="IMPACT", shape = box fillcolor="#FFEDBB" color=white style=filled, border = white]';
        dot += ' fontname="IMPACT"\n subgraph cluster_p{';
        dot += 'label = "Artistas" fontsize="20pt" bgcolor = white \n';
        
        var temp = this.cabeza
        var conexiones ="";
        var nodos ="";
        var i= 0;

        //cabeceras
        while(temp){

            //creo el artista
            nodos += "N" + i + "[label = \"" + temp.valor.name + "\nEdad: " + temp.valor.age + "\nPaís: " + temp.valor.country + "\"];\n"
            //rank += "N" + i 
            if (temp.siguiente != null){
                var auxi = i+1
                conexiones += "N" + i + " -> N" + auxi + ";\n"
                conexiones += "N" + auxi + " -> N" + i + ";\n"
                //rank += ", "
            }
            temp = temp.siguiente
            i++
        }

        dot+= nodos+"\n\n"+conexiones+"\n\n }} "

        return dot
    }

    /* 
    generarDotCanciones(){ //vertical
        
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

    generarDotCanciones(){ //horizontal
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

    showValueDivs(){
        var temp = this.cabeza
        var i = 0
        while (temp){
            var tempC = temp.abajo
            while(tempC){
                document.getElementById("songs").innerHTML += '<div class="song" style="display: inline-block;">\n<img src="assets/images/bg.png" id="mySong">\n<div class="song_info" style="display: flex;">\n<button class="addSong" id="'+ i+'">+</button>\n <h3 class = "songname">' + tempC.valor.name  + '</h3> </div>\n<h5 class = "autor">' + tempC.valor.artist + '</h5></div>'
                tempC = tempC.siguiente 
                i++
            }
            temp = temp.siguiente
        }
    }

    show_HV_Divs(i){
        var temp = this.cabeza
        while (temp){
            document.getElementById("artist_section").innerHTML += '<div id="new_artist"> <div id="artist_card"><div id="each"><h3 id = "artist_name">' +temp.valor.name + '</h3><img src="assets/images/bg.png" id="artist_picture"></div></div><div id ="artist_songs'+i+'" class="artist_songs">'
        
            var tempC = temp.abajo
            var coso = "artist_songs" + i

            while(tempC){
                console.log("cancion de" + tempC.valor.artist)
                document.getElementById(coso).innerHTML += '<div class="artist_song" style="display: inline-block;"><img src="assets/images/bg.png" id="album"><div class="song_info" style="display: flex;">  <button class="nothing" id="btn">+</button><h3 class = "songname">'+ tempC.valor.name + '<br> </h3></div><h5 class ="autor_song">' + tempC.valor.duration+'</h5></div>'      
                tempC = tempC.siguiente  
            }

            document.getElementById(coso).innerHTML+= "</div>"  
            document.getElementById("new_artist").innerHTML+= "</div>"
            temp = temp.siguiente
            i++  
            
        }
        document.getElementById("artist_section").innerHTML += "</div><br>"
        
    }

    getSong(autor, song){
        var temp = this.cabeza
        while(temp){
            var tempC = temp.abajo
            while(tempC){
                if (temp.valor.name == autor && tempC.valor.name == song){
                    
                    return tempC
                }
                tempC = tempC.siguiente
            }
            temp = temp.siguiente
        }
    }

    //ascendente
    bubblesort(){
        for(var i = 0; i < (this.size + 1); i++){
            var actual = this.cabeza
            for(var j = 0; j < this.size; j++){
                if(actual.siguiente && actual.valor.name > actual.siguiente.valor.name){
                    var nodoi = actual.valor
                    var nodoj = actual.siguiente.valor
                    actual.valor = nodoj
                    actual.siguiente.valor = nodoi
                }
                actual = actual.siguiente
            }
        }
    }

    //descentente
    quicksort(left, right){
        console.log(right)
        if(left == null){
            return
        }

        let pivot = new NodoC(left.valor)
        let i = -1
        let j = -1
        let nodoi = left
        let nodoj = right

        let actual = this.cabeza
        while(actual){
            i+=1
            if(actual == left){
                break;
            }
            actual = actual.siguiente
        }

        actual = this.cabeza
        while(actual){
            j+=1
            if(actual == right){
                break;
            }
            actual = actual.siguiente
        }

        let izq = i
        let der = j

        while(i<j){
            while(nodoi.valor.name.localeCompare(pivot.valor.name)== 1 || nodoi.valor.name.localeCompare(pivot.valor.name)== 0 && i<j){
                //console.log('comparando ', nodei.value, ' con ', pivot.value, ' valor: ', nodei.value.localeCompare(pivot.value))
                i = i + 1;
                nodoi = nodoi.siguiente;
            }

            while(nodoj.valor.name.localeCompare(pivot.valor.name)==-1){
                j = j-1;
                nodoj = nodoj.siguiente;
            }
            if(i<j){
                let aux = new NodoC(nodoi.valor)
                nodoi.valor = nodoj.valor
                nodoj.valor = aux.valor
            }
        }

        left.valor = nodoj.valor
        nodoj.valor = pivot.valor

        if(izq < j-1){
            this.quicksort(left, nodoj.anterior)
        }
        if(j+1 < der){
            this.quicksort(nodoj.siguiente, right)
        }
    }
    
}