const mongoose = require('mongoose');

const connection = async () => {

  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/app_todolist')
    console.log('Conexión a la base de datos')
  } catch (error) {
     throw new Error("Error al conectarse a la base de datos")
  }

} 

module.exports = connection;