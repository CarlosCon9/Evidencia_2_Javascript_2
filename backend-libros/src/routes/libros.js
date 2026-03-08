import express from "express";
import Libro from "../models/Libro.js";

const router = express.Router();

//Crear un nuevo libro
router.post("/new", async (req, res) => {
  const libro = new Libro({
    titulo: req.body.titulo,
    autor: req.body.autor,
    paginas: req.body.paginas,
  });
  try {
    await libro.save();
    res.json(libro);
  } catch (error) {
    res.status(500).send("Error al guardar el libro");
  }
});

//Consultar un libro por su id
router.get("/:id", async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id);
    if (libro) {
      res.json(libro);
    } else {
      res.status(404).send("Libro no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al consultar el libro");
  }
});

//Consultar el listado de todos los libros

router.get("/", async (req, res) => {
  try {
    const libros = await Libro.find();
    res.json(libros);
  } catch (error) {
    res.status(500).send("Error al consultar los libros");
  }
});

//Actualizar un libro

router.put("/:id", async (req, res) => {
  try {
    const libro = await Libro.findByIdAndUpdate(
      req.params.id,
      {
        titulo: req.body.titulo,
        autor: req.body.autor,
        paginas: req.body.paginas,
      },
      { new: true },
    );
    if (libro) {
      res.json(libro);
    } else {
      res.status(404).send("Libro no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al actualizar el libro");
  }
});

//Eliminar un libro

router.delete("/:id", async (req, res) => {
  try {
    const libro = await Libro.findByIdAndDelete(req.params.id);
    if (libro) {
      res.status(200).send("Libro eliminado correctamente");
    } else {
      res.status(404).send("Libro no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al eliminar el libro");
  }
});

//Consultar un libro por su titulo

router.get("/titulo/:titulo", async (req, res) => {
  try {
    const libro = await Libro.findOne({ titulo: req.params.titulo });
    if (libro) {
      res.json(libro);
    } else {
      res.status(404).send("Libro no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al consultar el libro");
  }
});

export default router;
