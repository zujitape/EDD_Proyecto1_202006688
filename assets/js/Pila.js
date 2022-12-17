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

    generarDot(){
        var dot = 'digraph Matriz{\n node[margin="0.3,0.3", fontname="IMPACT", shape = box fillcolor="#FFEDBB" color=white style=filled, border = white]';
        dot += 'ranksep="0.02"  fontname="IMPACT"\n subgraph cluster_p{\nedge[dir="back"]';
        dot += '\nlabel = "Amigos" fontsize="10pt" bgcolor = white \n';

        var temp = this.top
        var conexiones ="";
        var nodos ="";
        var rank = "";
        var i= 0; 

        while(temp){
            nodos+= "N" + i + "[label = \"" + temp.valor.username + "\"];\n"
            rank+= "N" + i
            if(temp.next != null){
              var auxi = i+1
              conexiones += "N" + i +" -> N" + auxi + ";\n"
              rank+= ", "
            }
    
            temp = temp.next
            i++
          }

          dot+= nodos+"\n \n"+conexiones+"\n\n"
          dot += "\n}\n}"
          return dot
    }

    existe(username){
        var temp = this.top
        var found

        while(temp){
            if(temp.valor.username == username){
                found = temp
                break
              }else{
                temp = temp.next 
              }
        }

        return temp
    }

    showFriends(){
        var temp = this.top

        while(temp){
            if (this.size >0){
            document.getElementById("blockUsers").innerHTML+= '<div class="block" style="display: inline-block;">\n<img src="assets/images/bg.png" id="myPicture"><input type="checkbox" class="checkboxFriend" id="check" />\n<h3 class = "friend" id="bloqueado">' + temp.valor.username +'</h3>'
            temp = temp.next
        }else{
            document.getElementById("blockUsers").innerHTML = '<h2>Parece que no hay nada por aquí...</h2>'
        }
    }

      }
}