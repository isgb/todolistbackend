// Importar dependencias
const express = require('express')

// Importar el router
const router = express.Router();
const Task = require('../controllers/task');

router.get('/prueba', Task.prueba);
router.post('/save', Task.save)
router.put('/update/:id', Task.update)
router.get('/list', Task.list)
router.delete('/remove/:id', Task.remove)


module.exports = router
