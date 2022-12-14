import { lstUsuarios } from "./script.js";
import Usuario from './Usuario.js';
import Artista from "./Artista.js";
import Song from "./Song.js";
import ProgrammedMusic from "./ProgrammedMusic.js";
import Podcast from "./Podcast.js"

var sample = 'digraph G {subgraph cluster_0 {  style=filled;  color=lightgrey;  node [style=filled,color=white];  a0 -> a1 -> a2 -> a3;  label = "process #1";}subgraph cluster_1 {  node [style=filled];  b0 -> b1 -> b2 -> b3;label = "process #2";  color=blue}start -> a0;start -> b0;a1 -> b3;b2 -> a3;a3 -> a0;a3 -> end;b3 -> end;start [shape=Mdiamond];end [shape=Msquare];}';


function onChange(event) {
    try{
        var reader = new FileReader();
        switch(this.id){
            case 'usersFile':
                reader.onload = getUsers;
                alert('Archivo cargado correctamente')
                console.log(lstUsuarios)
                break
            case 'artistFile':
                reader.onload = getArtists;
                console.log("tuvieja2")
                break
            case 'musicFile':
                reader.onload = getSongs;
                console.log("tuvieja3")
                break
            case 'programmedFile':
                reader.onload = getProgrammed;
                console.log("tuvieja4")
                break
            case 'podcastFile':
                reader.onload = getPodcasts;
                console.log("tuvieja5")
                break
        }
        reader.readAsText(event.target.files[0]);
    }catch(error){
        alert('Asegúrate de cargar un archivo correcto.')
        console.error(error)
    }
}

function getUsers(event){
    var data = JSON.parse(event.target.result);
    var size = Object.keys(data).length
    for(var i = 0; i <size;i++){
        var newUser = new Usuario(data[i].dpi, data[i].name, data[i].username, sha256(data[i].password), data[i].phone, data[i].admin)
        lstUsuarios.agregar(newUser)
    }
}

function getArtists(event){
    var obj = JSON.parse(event.target.result);
    var size = Object.keys(obj).length
    for(var i = 0; i <size;i++){
        var newArtist = new Artista(data[i].name, data[i].age, data[i].country)

    }
}

function getSongs(event){
    var obj = JSON.parse(event.target.result);
    var size = Object.keys(obj).length
    for(var i = 0; i <size;i++){
        var newSong = new Song(data[i].name, data[i].duration, data[i].gender)

    }
}

function getPodcasts(event){
    var obj = JSON.parse(event.target.result);
    var size = Object.keys(obj).length
    for(var i = 0; i <size;i++){
        var newPodcast = new Podcast(data[i].name, data[i].topic, data[i].guests, data[i].duration)

    }
}

function getProgrammed(event){
    var obj = JSON.parse(event.target.result);
    var size = Object.keys(obj).length
    for(var i = 0; i <size;i++){
        var newProgrammed = new ProgrammedMusic(data[i].month, data[i].day, data[i].song, data[i].artist)

    }
}

function graphviz(){
    var data = lstUsuarios.generarDot()
    console.log(data)
    var image = Viz(data, "svg");
    var main = document.getElementById('graphRender');
    main.innerHTML = image;	
}


//dataCharging
document.getElementById('usersFile').addEventListener('change', onChange)
document.getElementById('artistFile').addEventListener('change', onChange)
document.getElementById('musicFile').addEventListener('change', onChange)
document.getElementById('programmedFile').addEventListener('change', onChange)
document.getElementById('podcastFile').addEventListener('change', onChange)

//graphRender
document.getElementById('btn_userGraph').addEventListener("click", graphviz)


/*import { lstUsuarios } from "./assets/js/script.js";

function onChange(event) {
    var reader = new FileReader();
    reader.onload = getUsers;
    var tuvieja = getUsers;
    reader.readAsText(event.target.files[0]);
    switch(this.id){
        case 'fileUser':
           console.log(tuvieja) 
            break
        case 'artist':
            reader.onload = onReaderLoad;
        case 'songs':
            reader.onload = onReaderLoad;
        case 'programmed':
            reader.onload = onReaderLoad;
        case 'podcast':
            reader.onload = onReaderLoad;
    }
}

function getUsers(event){
    var obj = JSON.parse(event.target.result);  
    insertUsers()
}

function onReaderLoad(){
    console.log(lstUsuarios)
}

document.getElementById('fileUser').addEventListener('change', onChange);
*/