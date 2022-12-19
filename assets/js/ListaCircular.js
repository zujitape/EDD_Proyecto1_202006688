class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.siguiente = null;
        this.anterior = null;
    }
}

export default class ListaCircular {
    constructor() {
        this.cabeza = null;
        this.size = 0;
    }

    insertar(objeto) {
        if (this.cabeza == null) {
            this.cabeza = new Nodo(objeto);
            this.cabeza.siguiente = this.cabeza
            this.cabeza.anterior = this.cabeza
            this.size+= 1
        } else {
            var actual = this.cabeza
            if (this.size == 1) {
                var tempo = new Nodo(objeto)
                actual.siguiente = tempo
                tempo.anterior = actual
                tempo.siguiente = this.cabeza
                this.cabeza.anterior = tempo
                this.size = this.size + 1
            } else {
                var i = 0
                var actual = this.cabeza
                while (i < (this.size)) {
                    actual = actual.siguiente
                    i += 1
                }
                actual = actual.anterior
                var tempo = new Nodo(objeto)
                actual.siguiente = tempo
                tempo.anterior = actual
                tempo.siguiente = this.cabeza
                this.cabeza.anterior = tempo
                this.size += 1
            }
        }
    }

    showDiv() {
        var temp = this.cabeza;
        for (let i = 0; i <this.size; i++) {
            document.getElementById("playlistSongs").innerHTML+= '<div class="song" style="display: inline-block;">\n<img src="assets/images/bg.png" id="mySong">\n<div class="song_info" style="display: flex;">\n<button class="nothing" id="'+ i+'">+</button>\n <h3 class = "songname">' + temp.valor.name  + '</h3> </div>\n<h5 class = "autor">' + temp.valor.artist + '</h5></div>'
            temp = temp.siguiente;
        }
    }

    generarDot() {
        var dot = 'digraph Matriz{\n node[margin="0.3,0.3", fontname="IMPACT", shape = box fillcolor="#FFEDBB" color=white style=filled, border = white]';
        dot += ' fontname="IMPACT"\n subgraph cluster_p{';
        dot += 'label = "Playlist" fontsize="20pt" bgcolor = white \n';

        var temp = this.cabeza
        var conexiones = "";
        var nodos = "";
        var i = 0;
        for (let index = 0; index < this.size; index++) {
            nodos += "N" + i + "[label=\"" + temp.valor.name + "\n" +temp.valor.artist+"\"" + "];\n"
            if (temp.siguiente != this.cabeza) {
                var auxi = i + 1
                conexiones += "N" + i + " -> N" + auxi + "[dir=both];\n"
            } else {
                var auxi = i + 1
                conexiones += "N" + i + " -> N" + 0 + "[dir=both];\n"
            }
            temp = temp.siguiente
            i++;
        }
        dot += nodos + "\n"
        dot += "{rank=same;\n" + conexiones + "}\n\n}}"
        console.log(dot)
        
        return dot
    }
}