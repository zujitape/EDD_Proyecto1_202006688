
/*function saludo(){
    console.log("hola desde active user!")
    console.log(activeUser) 
}
*/


import { lstUsuarios, activeUser } from "./script.js";
import { lstMusica } from "./dataManager.js"; //acá se almacenan los artistas + sus canciones
import Song from "./Song.js";
import Artista from "./Artista.js";
import ListaListas from "./ListaListas.js";

var copiaAsc = new ListaListas()
var copiaDesc = new ListaListas()

copiaAsc = lstMusica
copiaDesc = lstMusica

var adminPage = document.querySelector(".admin")
var indexPage = document.querySelector(".index")
var friendsPage = document.querySelector(".friends_user")
var blockedPage = document.querySelector(".blocked_user")
var musicPage = document.querySelector(".music_user")
var artistPage = document.querySelector(".artist_user")
var playlistPage = document.querySelector(".playlist_user")

//Users
var chkUsers = document.getElementsByClassName("checkboxUser");
var users = document.getElementsByClassName("username");
var divUser = document.getElementsByClassName("user")
document.getElementById("btn_add").addEventListener("click", addFriend);
document.getElementById("btn_block").addEventListener("click", blockUser);
document.getElementById("btn_unblock").addEventListener("click", unblockUser);
document.getElementById("btn_publish").addEventListener("click", addSong);
document.getElementById("btn_asc").addEventListener("click", ascSort);
document.getElementById("btn_desc").addEventListener("click", descSort);


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

var divSong = document.getElementsByClassName("song")
var names = document.getElementsByClassName("songname")
var autors = document.getElementsByClassName("autor")
var addBtn = document.getElementsByClassName("addSong")

const addSongP = e => {
    console.log("?")
    var i = e.target.id
    var songname = names[i].innerText
    var songautor = autors[i].innerText
    var current = lstMusica.getSong(songautor, songname)
    alert("Canción " + songname + " agregada correctamente a la playlist")
    activeUser.playlist.insertar(current.valor)
  }


  function addButtons(){
    for (let button of addBtn) {
        button.addEventListener("click", addSongP);
    }
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
    artistPage.style.display = "none";
    playlistPage.style.display = "none";

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
    artistPage.style.display = "none";
    playlistPage.style.display = "none";

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
    artistPage.style.display = "none";
    playlistPage.style.display = "none";

    lstMusica.showValueDivs()
    addButtons()
    graphvizArtistas()
        
}

function showArtist(){
    document.getElementById('artist_section').innerHTML = ''

    adminPage.style.display = "none";
    friendsPage.style.display = "none";
    indexPage.style.display = "none";
    blockedPage.style.display = "none";
    musicPage.style.display = "none";
    artistPage.style.display = "block";
    playlistPage.style.display = "none";

    lstMusica.show_HV_Divs()
        
}

function showPlaylist(){
    document.getElementById('graphContainer4').innerHTML = ''

    adminPage.style.display = "none";
    friendsPage.style.display = "none";
    indexPage.style.display = "none";
    blockedPage.style.display = "none";
    musicPage.style.display = "none";
    artistPage.style.display = "none";
    playlistPage.style.display = "block";

    activeUser.playlist.showDiv()
    graphvizPlaylist()
}




function ascSort(){
    document.getElementById('artist_section').innerHTML = ''
    var i = 0
    lstMusica.bubblesort()
    console.log("Sorteada")
    console.log(lstMusica)
    lstMusica.show_HV_Divs(i)
    graphvizArtistasAsc()

}

function descSort(){
    document.getElementById('artist_section').innerHTML = ''
    var i = 0
    console.log(lstMusica)
    lstMusica.quicksort(lstMusica.cabeza, lstMusica.cola)
    console.log("Sorteada")
    console.log(lstMusica)
    lstMusica.show_HV_Divs(i)
    document.getElementById('graphContainer3').innerHTML = ''
    lstMusica.generarDotCanciones()
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

function graphvizArtistas(){
    var data = lstMusica.generarDotCanciones()
    console.log(data)
    var image = Viz(data, "svg");
    var main = document.getElementById('graphContainer3');
    main.innerHTML = image;	
}

function graphvizArtistasAsc(){
    var data = lstMusica.generarDotCanciones()
    console.log(data)
    var image = Viz(data, "svg");
    var main = document.getElementById('graphContainer3');
    main.innerHTML = image;	
}

function graphvizPlaylist(){
    var data = activeUser.playlist.generarDot()
    console.log(data)
    var image = Viz(data, "svg");
    var main = document.getElementById('graphContainer4');
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

//other

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
        addButtons()
    }else{
       console.log("programar")
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
export {showFriends, showBlocked, showMusic, showArtist, showPlaylist}
