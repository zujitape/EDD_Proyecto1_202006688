import Usuario from './Usuario.js';
import Artista from './Artista.js';
import Song from './Song.js';
import Programmed from './ProgrammedMusic.js';
import Podcast from './Podcast.js';
import ListaSimple from './ListaSimple.js';


var user = new Usuario(2340, "karla", "user", "1", 234, true);
var user2 = new Usuario(234, "yohann", "nicolás", "pass", 923483, false);
var lstUsuarios = new ListaSimple();
lstUsuarios.agregar(user);
lstUsuarios.agregar(user2);


document.getElementById("btn_register").addEventListener("click", registerForm);
document.getElementById("btn_login").addEventListener("click", loginForm);
document.getElementById("btn_graphviz").addEventListener("click", graphviz);
document.getElementById("login").addEventListener("click", showFriends);
document.getElementById("register").addEventListener("click", register);
document.getElementById("btn_userGraph").addEventListener("click", showIndex);

var sample = 'digraph G {subgraph cluster_0 {  style=filled;  color=lightgrey;  node [style=filled,color=white];  a0 -> a1 -> a2 -> a3;  label = "process #1";}subgraph cluster_1 {  node [style=filled];  b0 -> b1 -> b2 -> b3;label = "process #2";  color=blue}start -> a0;start -> b0;a1 -> b3;b2 -> a3;a3 -> a0;a3 -> end;b3 -> end;start [shape=Mdiamond];end [shape=Msquare];}';
var data;
var vUser = null

var container = document.querySelector(".front_div")
var login_form = document.querySelector(".login_form")
var register_form = document.querySelector(".register_form")
var login_back = document.querySelector(".login_back_div")
var register_back = document.querySelector(".register_back_div")


var adminPage = document.querySelector(".admin")
var indexPage = document.querySelector(".index")
var friendsPage = document.querySelector(".friends_user")

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
    var username = document.querySelector("#txtUser").value = "";
    var name = document.querySelector('#txtNombre').value = "";
    var dpi = document.querySelector('#txtDpi').value = "";
    var cell = document.querySelector('#txtTel').value = "";
    var pass = document.querySelector('#txtPass').value = "";
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
    console.log(lstUsuarios)
}

function login(){
    var username = document.querySelector('#txtUser_').value
    var pass = document.querySelector('#txtPass_').value
    vUser = lstUsuarios.existe(username, pass)
    console.log(vUser.valor.admin)  
}

function graphviz(){
    var image = Viz(sample, "svg");
    var main = document.getElementById('graphRender');
    main.innerHTML = image;	
}

function showAdmin(){
    adminPage.style.display = "block";
    friendsPage.style.display = "none";
    indexPage.style.display = "none";
}

function showFriends(){
    adminPage.style.display = "none";
    friendsPage.style.display = "block";
    indexPage.style.display = "none";
}

function showIndex(){
    adminPage.style.display = "none";
    friendsPage.style.display = "none";
    indexPage.style.display = "block";
}

