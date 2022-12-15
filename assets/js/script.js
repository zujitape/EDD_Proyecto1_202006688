import Usuario from './Usuario.js';
import ListaSimple from './ListaSimple.js';
import { showFriends, showBlocked } from './activeUser.js';

var user = new Usuario(2340, "karla", "user", sha256("1"), 234, true);
var user2 = new Usuario(234, "yohann", "toby", sha256("2"), 923483, false);
var user3 = new Usuario(234, "loka", "china", sha256("2"), 923483, false);
var user4 = new Usuario(234, "loka", "zuji", sha256("2"), 923483, true);

var lstUsuarios = new ListaSimple();
lstUsuarios.agregar(user);
lstUsuarios.agregar(user2);
lstUsuarios.agregar(user3);
lstUsuarios.agregar(user4);


document.getElementById("btn_register").addEventListener("click", registerForm);
document.getElementById("btn_login").addEventListener("click", loginForm);
document.getElementById("login").addEventListener("click", login);
document.getElementById("register").addEventListener("click", register);
document.getElementById("backHome").addEventListener("click", showIndex);
document.getElementById("backHome2").addEventListener("click", showIndex);
document.getElementById("backHome3").addEventListener("click", showIndex);

document.getElementById("bloqueados").addEventListener("click", showBlocked);
document.getElementById("amigos").addEventListener("click", showFriends);

var activeUser = null

var container = document.querySelector(".front_div")
var login_form = document.querySelector(".login_form")
var register_form = document.querySelector(".register_form")
var login_back = document.querySelector(".login_back_div")
var register_back = document.querySelector(".register_back_div")


var adminPage = document.querySelector(".admin")
var indexPage = document.querySelector(".index")
var friendsPage = document.querySelector(".friends_user")
var blockedPage = document.querySelector(".blocked_user")

function loginForm(){
    register_form.style.display = "none";
    container.style.left = "40px";
    login_form.style.display = "block";
    register_back.style.opacity = "1";
    login_back.style.opacity = "0";
}

function registerForm(){
    register_form.style.display = "block";
    container.style.left = "480px";
    login_form.style.display = "none";
    register_back.style.opacity = "0";
    login_back.style.opacity = "1";
}

function clearRegisterForm(){
    document.querySelector("#txtUser").value = "";
    document.querySelector('#txtNombre').value = "";
    document.querySelector('#txtDpi').value = "";
    document.querySelector('#txtTel').value = "";
    document.querySelector('#txtPass').value = "";
}

function clearLoginForm(){
    document.querySelector("#txtUser_").value = "";
    document.querySelector('#txtPass_').value = "";
}

function register(){
    var username = document.querySelector("#txtUser").value;
    var name = document.querySelector('#txtNombre').value;
    var dpi = document.querySelector('#txtDpi').value
    var cell = document.querySelector('#txtTel').value
    var pass = sha256(document.querySelector('#txtPass').value)
    var newUser = new Usuario(dpi, name, username, pass, cell, false)
    lstUsuarios.agregar(newUser)
    alert("Usuario agregado correctamente!")
    clearRegisterForm()
    loginForm()
}

function login(){
    var username = document.querySelector('#txtUser_').value
    var pass = sha256(document.querySelector('#txtPass_').value)
    activeUser = lstUsuarios.existe(username, pass)
    console.log("Contraseña " + document.querySelector('#txtPass_').value)
    console.log("Encriptada: " + pass)
    if(activeUser){
        if (activeUser.valor.admin){
            alert("Bienvenido "+ activeUser.valor.username +"!")
            clearLoginForm()
            showAdmin()
        }else if(!activeUser.valor.admin){
            if(activeUser.valor.username == "toby"){
                activeUser.friends.push(user)
                activeUser.friends.push(user3)
            }
            showFriends()
            alert("Bienvenido "+ activeUser.valor.username +"!")
            clearLoginForm()
            console.log(activeUser.friends)
        }
    }else{
        alert("Asegúrate de ingresar las credenciales correctamente")
    }
    
    /*
    vUser.friends.push(user)
    console.log(lstUsuarios)
    console.log(vUser.valor.admin)  
    */
    
}

function showAdmin(){
    adminPage.style.display = "block";
    friendsPage.style.display = "none";
    indexPage.style.display = "none";
    blockedPage.style.display = "none";
}


function showIndex(){
    adminPage.style.display = "none";
    friendsPage.style.display = "none";
    blockedPage.style.display = "none";
    indexPage.style.display = "block";

    document.getElementById('blockUsers').innerHTML = ''
    document.getElementById('addUsers').innerHTML = ''
    document.getElementById('graphRender').innerHTML = ''
    document.getElementById('graphContainer').innerHTML = ''
    document.getElementById('graphContainer2').innerHTML = ''
}


export {lstUsuarios, activeUser};
