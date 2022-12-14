
/*function saludo(){
    console.log("hola desde active user!")
    console.log(activeUser) 
}
*/
import { lstUsuarios, activeUser } from "./script.js";

//Users
var chkUsers = document.getElementsByClassName("checkboxUser");
var users = document.getElementsByClassName("username");
document.getElementById("btn_add").addEventListener("click", addFriend);

//Amigos
try{
    var chkFriends = document.getElementsByClassName("checkboxFriend");
    var friends = document.getElementsByClassName("friend");
    document.getElementById("btn_delete").addEventListener("click", deleteFriend);
}catch(error){
    console.log("nohay")
}

function showFriends(adminPage, indexPage, friendsPage){
    adminPage.style.display = "none";
    friendsPage.style.display = "block";
    indexPage.style.display = "none";
    lstUsuarios.showDiv(activeUser)
}

function addFriend(){
    for (var i = 0; i< chkUsers.length; i++){
        if(chkUsers[i].checked){
            console.log(users[i].innerText)
        }
    }
}

function deleteFriend(){
    for (var i = 0; i< chkFriends.length; i++){
        if(chkFriends[i].checked){
            console.log(friends[i].innerText)
        }
    }
}

export {showFriends}
