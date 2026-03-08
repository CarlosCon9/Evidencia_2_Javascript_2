import {
  crearLibro,
  obtenerLibros,
  actualizarLibro,
  eliminarLibro,
  buscarLibroPorTitulo,
} from "./api.js";

// Obtener referencia al formulario del DOM
const form = document.getElementById("form-libro");
const listaLibros = document.getElementById("lista-libros");

const formActualizar = document.getElementById("form-actualizar");
const idActualizar = document.getElementById("id-actualizar");
const nuevoTitulo = document.getElementById("nuevo-titulo");
const nuevoAutor = document.getElementById("nuevo-autor");
const nuevoPaginas = document.getElementById("nuevo-paginas");
const resultadoActualizar = document.getElementById("resultado-actualizar");
const formBuscar = document.getElementById("form-buscar");
const tituloBuscar = document.getElementById("titulo-buscar");
const resultadoBuscar = document.getElementById("resultado-buscar");

// Crear un nuevo libro al enviar el formulario
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // Evitar que el formulario se envíe de forma tradicional
  // Obtener los valores de los campos del formulario
  const titulo = document.getElementById("titulo").value;
  const autor = document.getElementById("autor").value;
  const paginas = parseInt(document.getElementById("paginas").value);

  await crearLibro(titulo, autor, paginas); // Llamar a la función para crear un nuevo libro
  form.reset(); // Limpiar el formulario después de enviar
  cargarLibros(); // Opcional: recargar la lista de libros después de agregar uno nuevo
});

//Carga los libros al cargar la página
async function cargarLibros() {
  const libros = await obtenerLibros(); // Obtener la lista de libros desde la API
  listaLibros.innerHTML = ""; // Limpiar la lista antes de agregar los libros

  if (libros.length === 0) {
    listaLibros.innerHTML = "<li>No hay libros disponibles</li>";
    return;
  }

  libros.forEach((libro) => {
    const li = document.createElement("li");
    li.innerHTML = `
  <span><strong>${libro.titulo}</strong> - ${libro.autor} - ${libro.paginas} - ${libro._id} </span>


  <button data-id="${libro._id}">Eliminar</button>`;
    li.querySelector("button").addEventListener("click", async () => {
      if (
        confirm(
          `¿Estás seguro de que deseas eliminar el libro "${libro.titulo}"?`,
        )
      ) {
        await eliminarLibro(libro._id); // Llamar a la función para eliminar el libro
        cargarLibros(); // Recargar la lista de libros después de eliminar uno
      }
    });

    listaLibros.appendChild(li);
  });
}

// Actualizar libro
formActualizar.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const libroActualizado = await actualizarLibro(
      idActualizar.value,
      nuevoTitulo.value,
      nuevoAutor.value,
      nuevoPaginas.value,
    );
    resultadoActualizar.innerHTML = `
      <p style="color:green;">Libro actualizado: ${libroActualizado.titulo} - ${libroActualizado.autor}</p>
    `;
    formActualizar.reset();
    cargarLibros();
  } catch (err) {
    resultadoActualizar.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
});

//Buscar libro por nombr
formBuscar.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    const libroEncontrado = await buscarLibroPorTitulo(tituloBuscar.value);
    resultadoBuscar.innerHTML = `
      <p style="color:green;">Libro encontrado: ${libroEncontrado.titulo} - ${libroEncontrado.autor} - ${libroEncontrado.paginas} páginas</p>
    `;
    formBuscar.reset();
  } catch (err) {
    resultadoBuscar.innerHTML = `<p style="color:red;">${err.message}</p>`;
  }
});

document.addEventListener("DOMContentLoaded", cargarLibros); // Cargar los libros al cargar la página
