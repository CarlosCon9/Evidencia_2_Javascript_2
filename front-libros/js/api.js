//Funciones desarrolladas para los procesos

const API_URL = "http://localhost:3000/libros";

export async function crearLibro(titulo, autor, paginas) {
  const res = await fetch(`${API_URL}/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ titulo, autor, paginas }),
  });
  return res.json();
}

export async function obtenerLibros() {
  const res = await fetch(API_URL);
  return res.json();
}

// Actualizar libro
export async function actualizarLibro(id, titulo, autor, paginas) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, autor, paginas }),
  });
  if (!res.ok) throw new Error("Error al actualizar el libro");
  return res.json();
}

//Eliminar libro por ID

export async function eliminarLibro(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar el libro");
  return await res.text();
}

// Buscar libro por titulo
export async function buscarLibroPorTitulo(titulo) {
  const tituloBuscado = titulo.trim();
  const res = await fetch(
    `${API_URL}/titulo/${encodeURIComponent(tituloBuscado)}`,
  );
  if (!res.ok) throw new Error("Libro no encontrado");
  return res.json();
}
