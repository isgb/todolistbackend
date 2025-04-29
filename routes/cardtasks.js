// Importar dependencias
const express = require('express')

// Importar el router
const router = express.Router();
const CardTasks = require('../controllers/cardtasks');

router.get('/prueba', CardTasks.prueba);
router.post('/save', CardTasks.save)
router.put('/update/:id', CardTasks.update)
router.get('/list', CardTasks.list)
router.delete('/remove/:id', CardTasks.remove)


module.exports = router
