import mongoose from "mongoose";
const libroSchema = new mongoose.Schema({
  titulo: String,
  autor: String,
  paginas: Number,
});
const Libro = mongoose.model("Libro", libroSchema);
export default Libro;
