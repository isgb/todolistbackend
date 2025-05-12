require('dotenv').config();
const mongoose = require('mongoose');

const connection = async () => {

  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Conexión a la base de datos')
  } catch (error) {
     throw new Error("Error al conectarse a la base de datos: " + error)
  }

} 

module.exports = connection;