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
    
    mostrar() {
      var temp = this.cabeza
      document.getElementById("log").innerHTML+="[ "    
      while(temp) {
        document.getElementById("log").innerHTML+=temp.valor+" ";
        temp = temp.siguiente
      }
      document.getElementById("log").innerHTML+="]"
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

    generarDot(){
      var dot = 'digraph Matriz{\n node[fontname="IMPACT", shape = box fillcolor="#FFEDBB" color=white style=filled, border = white]';
      dot += ' fontname="IMPACT"\n subgraph cluster_p{';
      dot += 'label = "Usuarios" fontsize="30pt" bgcolor = white \n';

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
      var tempPila = user.friends.top
      var temp = this.cabeza
      var i = 0
      console.log(user.friends.size)
      if(user.friends.size > 0){
        while(temp && tempPila){
          if(temp.valor.username == tempPila.valor.username){
            console.log("agrego a " + temp.valor.username + " a amigos")
            document.getElementById("blockUsers").innerHTML+= '<div class="block" style="display: inline-block;">\n<img src="assets/images/bg.png" id="myPicture"><input type="checkbox" class="checkboxFriend" id="check'+ i +'" />\n<h3 class = "friend">' + temp.valor.username +'</h3>'
            i++
            tempPila = tempPila.next
          }else if (temp.valor.username == user.valor.username){
            console.log("el usuario es " + user.valor.username)
          }else{
            console.log("agrego a " + temp.valor.username + " a otros usuarios")  
            document.getElementById("addUsers").innerHTML+= '<div class="user" style="display: inline-block;">\n<img src="assets/images/bg.png" id="myPicture"><input type="checkbox" class="checkboxUser" id="check'+ i +'" />\n<h3 class = "username">' + temp.valor.username +'</h3>'
            i++
          }
          
          temp = temp.siguiente
        }
      }else{
        console.log(user.valor.username + "no tiene amigos :(")
        while(temp){
        
        if(temp.valor.username != user.valor.username){
          document.getElementById("addUsers").innerHTML+= '<div class="user" style="display: inline-block;">\n<img src="assets/images/bg.png" id="myPicture"><input type="checkbox" class="checkboxUser" id="check'+ i +'" />\n<h3 class = "username">' + temp.valor.username +'</h3>'
          i++
        }
        temp = temp.siguiente
        }
        document.getElementById("blockUsers").innerHTML = '<h2>Parece que no hay nada por aquí...</h2>'
      }
        
      }
    }

