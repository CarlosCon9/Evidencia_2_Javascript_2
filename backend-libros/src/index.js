import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import librosRoutes from "./routes/libros.js";

//Configuracion de variables de entorno
dotenv.config();

//Configuracion de instacia de express
const app = express();

//Agregar un middleware para recibir JSON
app.use(express.json());
//Agregar un middleware para permitir CORS
app.use(cors());

//Conexion a MONGO DB
connectDB();

//Rutas
app.get("/", (req, res) => {
  res.send("Bienvenidos a mi API de libros");
});

// Ruta donde hago uso de las rutas de libros
app.use("/libros", librosRoutes);

app.listen(3000, () => {
  console.log("Servidor ejecutandose en http://localhost:3000/");
});
