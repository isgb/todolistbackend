// Importar dependencias
const express = require('express')

// Importar el router
const router = express.Router();
const CardTasks = require('../controllers/cardtasks');

router.get('/prueba', CardTasks.prueba);
router.post('/save', CardTasks.save)
router.put('/update/:id', CardTasks.update)

module.exports = router
