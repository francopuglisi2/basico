// import
import generos from '../datos/generos.js';
import tendencias from '../datos/tendenciahoy.js';
import peliculas from '../datos/peliculas.js'

//elementos
const menuSupEl             = document.querySelector("#menuSup");
const tendenciasEl          = document.querySelector("#tendencias");
const menuLatEl             = document.querySelector("#menuLat");
const muestraPeliculasEl    = document.querySelector("#muestraPeliculas");
const tituloEl              = document.querySelector("#titulo");
const textBuscarEl          = document.querySelector("#textBuscar");
const detalleModalEl        = document.querySelector("#detalleModal");
//globales

//cargador
addEventListener("DOMContentLoaded",()=>{
    cargarMenuSup();
    cargarTendencias();
    cargarMenuLat();
    const peliculasFiltradas=peliculas.filter(genero=>genero.genre_ids.includes(28));// se usa includes porque genre_ids en un arreglo
    
    mostrarPeliculas(peliculasFiltradas,"Acción");
})
//funciones
// menu superior
function cargarMenuSup(){
    let valor="";
    generos.forEach(element => {
        valor+=
            `
                <li><a class="dropdown-item" href="#" id="${element.id}" name="${element.name}">${element.name}</a></li>
            `
    });
    menuSupEl.innerHTML=valor;
}
menuSupEl.addEventListener("click",(e)=>{
    let id=parseInt(e.target.id)
    const peliculasFiltradas=peliculas.filter(genero=>genero.genre_ids.includes(id))
    mostrarPeliculas(peliculasFiltradas,e.target.name);
})

// tendencias
function cargarTendencias(){
    let valor="";
    tendencias.forEach(element => {
        valor+=
            `
                <img src="img/peliculas/${element.poster_path}" alt="" id="${element.id}" data-bs-toggle="modal" data-bs-target="#detalle">
            `
    });
    tendenciasEl.innerHTML=valor;
}
tendenciasEl.addEventListener("click",(e)=>{
    verDetalle(e.target.id)  
})

//menu lateral
function cargarMenuLat(){
    let valor="";
    generos.forEach(element => {
        valor+=
            `
                <a href="#" class="btn btn-primary d-grid mt-2" id="${element.id}" name="${element.name}">${element.name}</a>
            `
    });
    menuLatEl.innerHTML=valor;
}
menuLatEl.addEventListener("click",(e)=>{
    let id=parseInt(e.target.id)
    const peliculasFiltradas=peliculas.filter(genero=>genero.genre_ids.includes(id))
    mostrarPeliculas(peliculasFiltradas,e.target.name);
})

// muestra las peliculas
function mostrarPeliculas(peliculasFiltradas,genero){
    let total=peliculasFiltradas.length;
    tituloEl.innerHTML=`${total} Peliculas del Genero ${genero}`
    let valor="";
    peliculasFiltradas.forEach(element => {
        valor+=
        `
        <div class="col-md-4 col-lg-3 col-xl-2 mb-2">
        <div class="card h-100" >
          <img src="img/peliculas/${element.poster_path}" class="card-img-top" alt="...">
          <div class="card-body text-center">
            <p class="card-title">${element.title}</p>
          </div>
          <div class="card-footer text-center">
            <a href="#" class="btn btn-success btn-sm d-grid" data-bs-toggle="modal" data-bs-target="#detalle" id="${element.id}">Detalle</a>
   
          </div>
        </div>
      </div>
        `
    });
    muestraPeliculasEl.innerHTML=valor
}
muestraPeliculasEl.addEventListener("click",(e)=>{
    if(e.target.id && e.target.tagName=="A"){
        verDetalle(e.target.id)  
    } 
})

// muestra el detalle de las peliculas
function verDetalle(id){
    id=parseInt(id);
    const pelicula=peliculas.find(pel=>pel.id==id)
     let valor=
      `
          <div class="col-6">
              <img src="img/peliculas/${pelicula.poster_path}" alt="" class="img-fluid img-thumbnail">
          </div>
          <div class="col-6">
              <h4><b>Titulo:</b> ${pelicula.title}</h4>
              <h5><b>Average:</b> ${pelicula.vote_average}
              <br><b>Popularidad:</b> ${pelicula.popularity}
              <br><b>Fecha de Lanzamiento:</b> ${pelicula.release_date}</h5>
              <h5><b>Sinopsis: </b>${pelicula.overview}</h5>
          </div>
      `
      detalleModalEl.innerHTML=valor;
}

// permite hacer las busquedas por cada letra ingresada
textBuscarEl.addEventListener("keyup",()=>{
    const text = textBuscarEl.value
    const peliculasFiltradas=peliculas.filter(titulo=>titulo.title.toLowerCase().includes(text))
    let titulo=`BUSCAR : ${text}`
    mostrarPeliculas(peliculasFiltradas,titulo);
  
})




