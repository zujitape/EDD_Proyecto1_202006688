function onChange(event) {
    var reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event){
    console.log(event.target.result);
    var obj = JSON.parse(event.target.result);
    var size = Object.keys(obj).length
    for(var i = 0; i <size;i++){
        console.log(obj[i].name + "" + obj[i].family)
        //insertar en la lista de usuarios
    }
}
document.getElementById('fileUser').addEventListener('change', onChange)

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