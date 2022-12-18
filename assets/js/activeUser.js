
/*function saludo(){
    console.log("hola desde active user!")
    console.log(activeUser) 
}
*/


import { lstUsuarios, activeUser } from "./script.js";
import { lstMusica } from "./dataManager.js"; //acá se almacenan los artistas + sus canciones
import Song from "./Song.js";
import Artista from "./Artista.js";

var adminPage = document.querySelector(".admin")
var indexPage = document.querySelector(".index")
var friendsPage = document.querySelector(".friends_user")
var blockedPage = document.querySelector(".blocked_user")
var musicPage = document.querySelector(".music_user")


//Users
var chkUsers = document.getElementsByClassName("checkboxUser");
var users = document.getElementsByClassName("username");
var divUser = document.getElementsByClassName("user")
document.getElementById("btn_add").addEventListener("click", addFriend);
document.getElementById("btn_block").addEventListener("click", blockUser);
document.getElementById("btn_unblock").addEventListener("click", unblockUser);
document.getElementById("btn_publish").addEventListener("click", addSong);

//Amigos
try{
    var chkFriends = document.getElementsByClassName("checkboxFriend");
    var friends = document.getElementsByClassName("friend");
    var divDelete = document.getElementsByClassName("block");
    var bloqueados = document.getElementsByClassName("bloqueado")
    document.getElementById("btn_delete").addEventListener("click", deleteFriend);
}catch(error){
    console.log("nohay")
}

//READJUST USERS-------------
function cargarUsers(){
    lstUsuarios.showDiv(activeUser)
    activeUser.friends.showFriends()

    for (var i = 0; i< users.length; i++){
        var amigo = activeUser.friends.existe(users[i].innerText)
        var bloqueado = activeUser.blocked.existe(users[i].innerText)
        if(amigo || bloqueado){
            divUser[i].remove()
        }
    }
}


//WINDOW SHOWING-------------------------
function showFriends(){
    document.getElementById('blockUsers').innerHTML = ''
    document.getElementById('addUsers').innerHTML = ''
    document.getElementById('graphContainer').innerHTML = ''
    document.getElementById('graphContainer2').innerHTML = ''

    adminPage.style.display = "none";
    friendsPage.style.display = "block";
    indexPage.style.display = "none";
    blockedPage.style.display = "none";
    musicPage.style.display = "none";
    cargarUsers()
    graphviz()
}

function showBlocked(){
    document.getElementById('blockedUsers_').innerHTML = ''

    adminPage.style.display = "none";
    friendsPage.style.display = "none";
    indexPage.style.display = "none";
    blockedPage.style.display = "block";
    musicPage.style.display = "none";
    
    activeUser.blocked.showBlocked()
    graphvizBlocked()
}

function showMusic(){
    document.getElementById('songs').innerHTML = ''

    adminPage.style.display = "none";
    friendsPage.style.display = "none";
    indexPage.style.display = "none";
    blockedPage.style.display = "none";
    musicPage.style.display = "block";

    lstMusica.showValueDivs()
}


//GRAPHS USER --------------------------
function graphviz(){
    var data = activeUser.friends.generarDot()
    console.log(data)
    var image = Viz(data, "svg");
    var main = document.getElementById('graphContainer');
    main.innerHTML = image;	
}

function graphvizBlocked(){
    var data = activeUser.blocked.generarDot()
    console.log(data)
    var image = Viz(data, "svg");
    var main = document.getElementById('graphContainer2');
    main.innerHTML = image;	
}


//USER FUNCTIONS--------------------------------------------------

function addFriend(){
    for (var i = 0; i< chkUsers.length; i++){
        if(chkUsers[i].checked){
            var user = users[i].innerText;
            var current = lstUsuarios.getUser(user);
            activeUser.friends.push(current)
            alert("Usuario " + user + " agregado correctamente")
            divUser[i].remove()
            document.getElementById('blockUsers').innerHTML = ''
            document.getElementById('addUsers').innerHTML = ''
            cargarUsers()
            graphviz()
        }
    }
}               

function deleteFriend(){
    activeUser.friends.pop()
    alert("Usuario " + friends[0].innerText + " eliminado correctamente")
    divDelete[0].remove()
    document.getElementById('blockUsers').innerHTML = ''
    document.getElementById('addUsers').innerHTML = ''
    cargarUsers()
    console.log(activeUser.friends.size)
    graphviz()
}

function blockUser(){
    for (var i = 0; i< chkUsers.length; i++){
        if(chkUsers[i].checked){
            var user = users[i].innerText;
            var current = lstUsuarios.getUser(user);
            activeUser.blocked.enqueue(current)
            alert("Usuario " + user + " bloqueado correctamente")
            divUser[i].remove()
        }
    }
}

function unblockUser(){
    var unblocked = activeUser.blocked.dequeue()
    document.getElementById('blockedUsers_').innerHTML = ''
    activeUser.blocked.showBlocked()
    graphvizBlocked()
    
}

function addSong(){
    var name = document.querySelector("#txtNombreS").value;
    var duration = document.querySelector('#txtDurationS').value;
    var gender = document.querySelector('#txtGender').value;
    var date = document.querySelector("#dateS").value;
    var today = dateS()

    if (date == today){
        console.log("hoy sí  owo")
        var newArtista = new Artista(activeUser.valor.username, 20, "guess")
        var newSong = new Song(activeUser.valor.username, name, duration, gender)

        lstMusica.addHeader(newArtista)
        lstMusica.addValue(activeUser.valor.username, newSong)
        
    }else{
       console.log("programar   ")
    }
  
    alert("Canción " + name + " agregada correctamente! c:")

    document.getElementById('songs').innerHTML = ''
    clearSongForm()
    lstMusica.showValueDivs()
}

function dateS(){
    var today = new Date();
    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();
    return `${year}-${month}-${day}`;
}

function clearSongForm(){
    document.querySelector("#txtNombreS").value = "";
    document.querySelector('#txtDurationS').value = "";
    document.querySelector('#txtGender').value = "";
}
export {showFriends, showBlocked, showMusic}
