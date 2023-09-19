console.log("Entro archivo index.js");

let peliculas = JSON.parse(localStorage.getItem("peliculas")) || [];

let inputTitulo = document.getElementById("inputTitulo");
let inputEstreno = document.getElementById("inputEstreno");
let inputGenero = document.getElementById("inputGenero");
let inputImagen = document.getElementById("inputImagen");
let inputSinopsis = document.getElementById("inputSinopsis");
let btnAgregar = document.getElementById("btnAgregar");
let btnBorrarTodo = document.getElementById("btnBorrarTodo");
let divPeliculas = document.getElementById("divPeliculas");
let alertSinPeliculas = document.getElementById("alertSinPeliculas");
let indexEditar = null;
class Pelicula {
    constructor(titulo, estreno, genero, imagen, sinopsis) {
        this.titulo = titulo;
        this.estreno = estreno;
        this.genero = genero;
        this.imagen = imagen;
        this.sinopsis = sinopsis;
    }
}

function guardarPelicula() {
    let titulo = inputTitulo.value;
    let estreno = inputEstreno.value;
    let genero = inputGenero.value;
    let imagen = inputImagen.value;
    let sinopsis = inputSinopsis.value;
    let pelicula = new Pelicula(titulo, estreno, genero, imagen, sinopsis);
    if (indexEditar === null) {
        console.log("Agregando pelicula");
        peliculas.push(pelicula);
    } else {
        console.log("Editando pelicula");
        peliculas[indexEditar] = pelicula;
        indexEditar = null;
    }
    localStorage.setItem("peliculas", JSON.stringify(peliculas));
    mostrarPeliculas();
    limpiarFormulario();
    alert("Pelicula guardada");
}

function eliminarPelicula(index) {
    console.log(index);
    peliculas.splice(index, 1);
    localStorage.setItem("peliculas", JSON.stringify(peliculas));
    mostrarPeliculas();
    alert("Pelicula eliminada");
}

function editarPelicula(index) {
    indexEditar = index;
    let peliculaAEditar = peliculas[index];
    inputTitulo.value = peliculaAEditar.titulo;
    inputEstreno.value = peliculaAEditar.estreno;
    inputGenero.value = peliculaAEditar.genero;
    inputImagen.value = peliculaAEditar.imagen;
    inputSinopsis.value = peliculaAEditar.sinopsis;
}

function mostrarPeliculas() {
    if (peliculas.length === 0) {
        divPeliculas.innerHTML = `
        <div class="alert alert-info" role="alert" id="alertSinPeliculas">
            No hay peliculas agregadas
        </div>`;
    } else {
        divPeliculas.innerHTML = "";
        peliculas.forEach((pelicula, index) => {
            divPeliculas.innerHTML += `
                <div class="card mb-3">
                   <div class="row g-0">
                      <div class="col-md-4">
                         <img src="${pelicula.imagen}" class="img-fluid rounded-start" alt="pelicula">
                      </div>
                      <div class="col-md-8">
                         <div class="card-body">
                            <h5 class="card-title">${pelicula.titulo}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary">${pelicula.estreno} - ${pelicula.genero}</h6>
                            <p class="card-text">${pelicula.sinopsis}</p>
                            <div class="row mb-2">
                               <div class="col">
                                  <button class="btn btn-warning w-100 mt-2" type="button" id="editar-${index}" onclick="editarPelicula(${index})">Editar</button>
                               </div>
                               <div class="col">
                                  <button class="btn btn-danger w-100 mt-2" type="button" id="eliminar-${index}" onclick="eliminarPelicula(${index})">Eliminar</button>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
            `;
        });
    }
}

function borrarTodo() {
    localStorage.clear();
    peliculas = [];
    mostrarPeliculas();
    alert("Peliculas borradas");
}

function limpiarFormulario() {
    inputTitulo.value = "";
    inputEstreno.value = "";
    inputGenero.value = "";
    inputImagen.value = "";
    inputSinopsis.value = "";
}

btnAgregar.addEventListener("click", guardarPelicula);
btnBorrarTodo.addEventListener("click", borrarTodo);

mostrarPeliculas();
