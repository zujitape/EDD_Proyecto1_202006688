import {lstUsuarios} from "./script.js";
import ListaListas from './ListaListas.js';
import Arbol from "./Arbol.js";
import Usuario from './Usuario.js';
import Artista from "./Artista.js";
import Song from "./Song.js";
import ProgrammedMusic from "./ProgrammedMusic.js";
import Podcast from "./Podcast.js"

var sample = 'digraph G {subgraph cluster_0 {  style=filled;  color=lightgrey;  node [style=filled,color=white];  a0 -> a1 -> a2 -> a3;  label = "process #1";}subgraph cluster_1 {  node [style=filled];  b0 -> b1 -> b2 -> b3;label = "process #2";  color=blue}start -> a0;start -> b0;a1 -> b3;b2 -> a3;a3 -> a0;a3 -> end;b3 -> end;start [shape=Mdiamond];end [shape=Msquare];}';
var lstMusica = new ListaListas();
var abbPodcast = new Arbol();

function onChange(event) {
    try{
        var reader = new FileReader();
        switch(this.id){
            case 'usersFile':
                console.log("?")
                reader.onload = getUsers;
                alert('Archivo cargado correctamente')
                console.log(lstUsuarios)
                break
            case 'artistFile':
                reader.onload = getArtists;
                console.log(lstMusica)
                break
            case 'musicFile':
                reader.onload = getSongs;
                break
            case 'programmedFile':
                reader.onload = getProgrammed;
                break
            case 'podcastFile':
                reader.onload = getPodcasts;
                console.log(abbPodcast)
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
    var data = JSON.parse(event.target.result);
    var size = Object.keys(data).length
    for(var i = 0; i <size;i++){
        var newArtist = new Artista(data[i].name, data[i].age, data[i].country)
        lstMusica.addHeader(newArtist)

    }
}

function getSongs(event){
    var data = JSON.parse(event.target.result);
    var size = Object.keys(data).length
    for(var i = 0; i <size;i++){
        var newSong = new Song(data[i].artist, data[i].name, data[i].duration, data[i].gender)
        lstMusica.addValue(data[i].artist, newSong)
    }
}

function getPodcasts(event){
    var data = JSON.parse(event.target.result);
    var size = Object.keys(data).length
    for(var i = 0; i <size;i++){
        var newPodcast = new Podcast(data[i].name, data[i].topic, data[i].guests, data[i].duration)
        abbPodcast.agregar(newPodcast)

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

function graphArtist(){
    var data = lstMusica.generarDotArtistas()
    console.log(data)
    var image = Viz(data, "svg");
    var main = document.getElementById('graphRender');
    main.innerHTML = image;	
}

function graphSongs(){
    var data = lstMusica.generarDotCanciones()
    console.log(data)
    var image = Viz(data, "svg");
    var main = document.getElementById('graphRender');
    main.innerHTML = image;	
}

function saveDiv() {
    document.getElementsByTagName("svg")[0].style = 'width : 100%; height : 100%;';
    html2canvas(document.getElementById("graphRender")).then(function(canvas) {

       const image = canvas.toDataURL("image/png", 1.0);
       const link = document.createElement("a");

       link.download = "my-image.png";
       link.href = image;
       link.click();
 });
 document.getElementsByTagName("svg")[0].style = 'object-fit: fill; ';
}


//dataCharging
document.getElementById('usersFile').addEventListener('change', onChange)
document.getElementById('artistFile').addEventListener('change', onChange)
document.getElementById('musicFile').addEventListener('change', onChange)
document.getElementById('programmedFile').addEventListener('change', onChange)
document.getElementById('podcastFile').addEventListener('change', onChange)

//graphRender
document.getElementById('btn_userGraph').addEventListener("click", graphviz)
document.getElementById('btn_artistGraph').addEventListener("click", graphArtist)
document.getElementById('btn_songGraph').addEventListener("click", graphSongs)

document.getElementById('btn_download').addEventListener("click", saveDiv)


export {lstMusica}
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
