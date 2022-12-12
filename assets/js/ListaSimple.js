import Pila from './Pila.js';
import Cola from './Cola.js';

class Nodo {
    constructor(valor) {
      this.friends = new Pila()
      this.blocked = new Cola()
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
      var vAcesso = false
      while(temp){
          if(temp.valor.username == username && temp.valor.password == password ){
            vAcesso = true
            break
          }else{
            temp = temp.siguiente 
          } 
      }
      console.log(temp)
      return temp
    }
  }