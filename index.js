const express = require('express');
const cors = require('cors')
const app = express();

const connection = require('./database/connection')
connection()

const port= 3970;

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