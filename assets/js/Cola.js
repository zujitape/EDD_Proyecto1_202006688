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
        if (this.top == null){
            this.top = newNodo
            this.size++
        }else{
            newNodo.next = this.bottom;
            this.size++
        }
        this.bottom = newNodo
    }

    dequeue(){
        var temp = this.bottom
        var delete_ = this.top
        if(temp != null){
            if (temp == this.top){
                this.top = null
                this.bottom = null
            }else{
                temp.next = null
                this.top = temp 
                
            }
            return delete_
        }  
    }

    generarDot(){
        var dot = 'digraph Matriz{\n node[margin="0.3,0.3", fontname="IMPACT", shape = box fillcolor="#FFEDBB" color=white style=filled, border = white]';
        dot += ' fontname="IMPACT"\n subgraph cluster_p{edge[style="invisible" dir="none"]';
        dot += 'label = "Bloqueados" fontsize="10pt" bgcolor = white \n';
  
        var temp = this.bottom
        console.log(temp)
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
        
        dot+= "{rank = same;" + rank + "}\n}\n}"
        return dot
      }

      showBlocked(){
        var temp = this.bottom

        while(temp){
            if (this.size >0){
            document.getElementById("blockedUsers_").innerHTML+= '<div class="block" style="display: inline-block;">\n<img src="assets/images/bg.png" id="myPicture"><input type="checkbox" class="checkboxFriend" id="check" />\n<h3 class = "bloqueado" id="bloqueado">' + temp.valor.username +'</h3>'
            temp = temp.next
            }else{
                console.log("?")
            document.getElementById("blockedUsers_").innerHTML = '<h2>Parece que no hay nada por aquí...</h2>'
            }
        }

      }

      existe(username){
        var temp = this.bottom
        var found

        while(temp){
            if(temp.valor.username == username){
                found = temp
                break
              }else{
                temp = temp.next 
              }
        }
        
        return found
    }
}