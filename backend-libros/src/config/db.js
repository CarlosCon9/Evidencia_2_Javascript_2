import mongoose from "mongoose";

const connectDB = () => {
  const mongoUri = process.env.MONGODB_URI;
  try {
    mongoose.connect(mongoUri);
    console.log("Conexión a MongoDB establecida");
  } catch (error) {
    console.error("Error de conexion", error);
  }
};
export default connectDB;
