const Task = require("../models/task");

const prueba = async (req, res) => {
    return res.status(200).send({
        status: "success",
        message: "Prueba desde controlador task",
    });
};

const save = async (req, res) => {
    let params = req.body;

    try {
        if (!params.description) {
            throw new Error("El titulo es obligatorio");
        }
    } catch (error) {
        return res.status(400).send({
            status: "error",
            message: error.message,
        });
    }

    // Crea el objeto
    const taskToSave = new Task(params);

    // Guardar en la base de datos
    try {
        const taskStored = await taskToSave.save();
        return res.status(200).send({
            status: "success",
            task: taskStored,
        });
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al guardar la task",
        });
    }
};

const update = async (req, res) => {
    // Recoger el id de la url
    let taskId = req.params.id;

    // Recoger los datos del body
    let params = req.body;

    console.log(params)

    // Validar los datos
    try {
        if (!params.description) {
            throw new Error('La descripción es obligatorio');
        }
    } catch (error) {
        return res.status(400).send({
            status: 'error',
            message: error.message
        });
    }

    // Actualizar el task en la base de datos
    try {
        const taskUpdated = await Task.findByIdAndUpdate(taskId, params, { new: true });
        if (!taskUpdated) {
            return res.status(404).send({
                status: 'error',
                message: 'El task no existe'
            });
        }
        return res.status(200).send({
            status: 'success',
            task: taskUpdated
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: 'Error al actualizar el task'
        });
    }
}

const list = async (req, res) => {
    try {
        const tasksList = await Task.find();

        if (!tasksList) {
            return res.status(404).send({
                status: 500,
                message: 'No hay tasks por obtener'
            })
        }

        return res.status(200).send({
            status: 200,
            tasks: tasksList
        });

    } catch (error) {
        return res.status(500).send({
            status: 500,
            message: 'Error al obtener la lista de task',
            error
        })
    }
}

const remove = async (req, res) => {

    const taskId = req.params.id

    console.log(taskId)

    if (!taskId) {
        return res.status(404).send({
            status: 'error',
            message: 'La task no existe'
        });
    }

    try {

        const tasks = await Task.findByIdAndDelete(taskId)

        if (!tasks) {
            return res.status(200).send({
                status: 'error',
                message: 'Error al eliminar la task'
            });
        }

        return res.status(200).send({
            status: 'success',
            message: 'La task ha sido eliminada'
        });

    } catch (error) {
        return res.status(500).send({
            status: 'error',
            error,
            message: 'Error al eliminar la task'
        });
    }

}

module.exports = {
    prueba,
    save,
    update,
    list,
    remove
};
