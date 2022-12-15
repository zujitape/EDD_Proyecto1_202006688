
/*function saludo(){
    console.log("hola desde active user!")
    console.log(activeUser) 
}
*/


import { lstUsuarios, activeUser } from "./script.js";

var adminPage = document.querySelector(".admin")
var indexPage = document.querySelector(".index")
var friendsPage = document.querySelector(".friends_user")
var blockedPage = document.querySelector(".blocked_user")


//Users
var chkUsers = document.getElementsByClassName("checkboxUser");
var users = document.getElementsByClassName("username");
var divUser = document.getElementsByClassName("user")
document.getElementById("btn_add").addEventListener("click", addFriend);
document.getElementById("btn_block").addEventListener("click", blockUser);
document.getElementById("btn_unblock").addEventListener("click", unblockUser);

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


function showFriends(){
    document.getElementById('blockUsers').innerHTML = ''
    document.getElementById('addUsers').innerHTML = ''
    document.getElementById('graphContainer').innerHTML = ''
    document.getElementById('graphContainer2').innerHTML = ''

    adminPage.style.display = "none";
    friendsPage.style.display = "block";
    indexPage.style.display = "none";
    blockedPage.style.display = "none";
    cargarUsers()
    graphviz()
}

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

function showBlocked(){
    document.getElementById('blockedUsers_').innerHTML = ''

    adminPage.style.display = "none";
    friendsPage.style.display = "none";
    indexPage.style.display = "none";
    blockedPage.style.display = "block";
    
        activeUser.blocked.showBlocked()
    graphvizBlocked()
}

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

export {showFriends, showBlocked}
