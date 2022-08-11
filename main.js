const fecha=document.querySelector('#fecha');
const lista=document.querySelector('#lista');
const input=document.querySelector('#input');
const botonEnter=document.querySelector('#enterBoton');

const check= "fa-check-circle";
const uncheck="fa-circle";
const lineThrough= "line-through";
let id
let listaTodo



//creacion de fecha
const fechaActual=new Date()
setTimeout('location.reload()',60000)
fecha.innerHTML= fechaActual.toLocaleDateString('es-AR',{weekday:'long', month:'long', day:'numeric', hour:'2-digit', minute:'2-digit'});




//funcion agregar tarea
function agregarTarea(tarea, id, realizado, eliminado){
if(eliminado){return}
const rerealizado= realizado ? check : uncheck;
const reline= realizado ? lineThrough : '';



    const elemento = 
    `<li id="elemento">
    <i class="far ${rerealizado} " data="realizado" id="${id}"></i>
    <p class="text ${reline}">${tarea}</p>
    <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
    </li>
    `
    lista.insertAdjacentHTML('beforeend', elemento)
}

//funcion de tarea Realizada
function tareaRealizada(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);
    listaTodo(element.id).realizado=listaTodo(element.id).realizado? false:true

    // console.log(check)
    // console.log(uncheck)
    // console.log(element.classList)
}
//funcion de tarea eliminada
const  tareaEliminada =(element)=>{
    element.parentNode.parentNode.removeChild(element.parentNode);
    listaTodo[element.id].eliminado = true
}

//-------_--__--_----_


botonEnter.addEventListener('click', ()=>{
    const tarea=input.value
    if(tarea){
        agregarTarea(tarea,id, false, false);
        listaTodo.push({
            nombre:tarea,
            id:id,
            realizado:false,
            eliminado:false
        })
    
    localStorage.setItem('TODO', JSON.stringify(listaTodo));
    input.value='';
    id++;
    }
})
document.addEventListener('keyup', function(event){
    if(event.key==="Enter"){
        const tarea=input.value
        if(tarea){
            agregarTarea(tarea,id, false, false);
            listaTodo.push({
                nombre:tarea,
                id:id,
                realizado:false,
                eliminado:false
            })
        
        localStorage.setItem('TODO', JSON.stringify(listaTodo));
        input.value='';
        id++;
        }
    }
})
//_-___-----_-_-__--___----


lista.addEventListener('click', function(event){
const element= event.target;
const elementData= element.attributes.data.value;
if(elementData ==='realizado'){
    tareaRealizada(element);
}else if(elementData ==='eliminado'){
    tareaEliminada(element)
}
localStorage.setItem('TODO', JSON.stringify(listaTodo));
})


//local storage get item
let infodata= localStorage.getItem('TODO');
if(infodata){
    listaTodo=JSON.parse(infodata);
    id=listaTodo.length;
    cargarLista(listaTodo);
}else{
    listaTodo=[];
    id=0;
}

function cargarLista(INFO){
    INFO.forEach(ele => {
    agregarTarea(ele.nombre,ele.id,ele.realizado,ele.eliminado)
});

}

  









