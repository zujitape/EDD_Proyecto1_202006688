import Pila from './Pila.js';
import Cola from './Cola.js';

class Nodo {
    constructor(valor) {
      this.friends = new Pila()
      this.blocked = new Cola()
      //playlist = doblementeenlazada
      this.valor = valor
      this.siguiente = null
    }
  }

export default class Lista{
    constructor() {
      this.cabeza = null
      this.size = 0
    }
    
    agregar(valor) {
      var temp = new Nodo(valor)
      temp.siguiente = this.cabeza
      this.cabeza = temp
      this.size++
    }

    existe(username, password){
      var temp = this.cabeza
      var found
      while(temp){
          if(temp.valor.username == username && temp.valor.password == password ){
            found = temp
            break
          }else{
            temp = temp.siguiente 
          } 
      }
      return found
    }

    getUser(user){
      var temp = this.cabeza
      var found
      while(temp){
          if(temp.valor.username == user){
            found = temp
            break
          }else{
            temp = temp.siguiente 
          } 
      }
      return found.valor
    }

    generarDot(){
      var dot = 'digraph Matriz{\n node[margin="0.3,0.3", fontname="IMPACT", shape = box fillcolor="#FFEDBB" color=white style=filled, border = white]';
      dot += ' fontname="IMPACT"\n subgraph cluster_p{';
      dot += 'label = "Usuarios" fontsize="20pt" bgcolor = white \n';

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
          rank+= ", "
        }

        temp = temp.siguiente
        i++
      }

      dot+= nodos+"\n \n"+conexiones+"\n\n"
      
      dot+= "{rank = same;" + rank + "}\n}\n}"
      return dot
    }

    showDiv(user){
      var temp = this.cabeza
      var i = 0
      while(temp){
        if(this.size > 0){
          if (temp.valor.admin == true || temp.valor.username == user.valor.username){
            temp = temp.siguiente
          }else{
            //agregar usuarios
          document.getElementById("addUsers").innerHTML+= '<div class="user" style="display: inline-block;">\n<img src="assets/images/bg.png" id="myPicture"><input type="checkbox" class="checkboxUser" id="check'+ i +'" />\n<h3 class = "username">' + temp.valor.username +'</h3>'
          i++
          temp = temp.siguiente
          }
          
        }else{
          //no hay nada aquí
          document.getElementById("addUsers").innerHTML = '<h2>Parece que no hay nada por aquí...</h2>'
        }
        
      }
    }
    }

