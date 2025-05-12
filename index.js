const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config();

const connection = require('./database/connection')
connection()

const port = process.env.PORT || 3000; // Vercel asigna el puerto mediante process.env.PORT

// Habilitando cabeceras de envo
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const CardTasksRoutes = require('./routes/cardtasks');
const TaskRoutes = require('./routes/task');

app.use("/api/cardtasks", CardTasksRoutes);
app.use("/api/tasks", TaskRoutes)

app.listen(port, () => {
    console.log("Servidor escuchando en el puerto: ", port)
})