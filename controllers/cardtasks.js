const CardTasks = require("../models/cardtask");

const prueba = async (req, res) => {
  return res.status(200).send({
    status: "success",
    message: "Prueba desde controlador task",
  });
};

const save = async (req, res) => {
  let params = req.body;

  try {
    if (!params.title) {
      throw new Error("El titulo es obligatorio");
    }
  } catch (error) {
    return res.status(400).send({
      status: "error",
      message: error.message,
    });
  }

  // Crea el objeto
  const cardTasksToSave = new CardTasks(params);

  // Guardar en la base de datos
  try {
    const cardTasksStored = await cardTasksToSave.save();
    return res.status(200).send({
      status: "success",
      cardtasks: cardTasksStored,
    });
  } catch (error) {
    return res.status(500).send({
      status: "error",
      message: "Error al guardar la cardtasks",
    });
  }
};

const update = async (req,res) => {
    // Recoger el id de la url
    let cardTasksId = req.params.id;

    // Recoger los datos del body
    let params = req.body;

    console.log(params)

    // Validar los datos
    try {
        if (!params.title) {
            throw new Error('El titulo es obligatorio');
        }
    } catch (error) {
        return res.status(400).send({
            status: 'error',
            message: error.message
        });
    }

    // Actualizar el cardTasks en la base de datos
    try {
        const cardTasksUpdated = await CardTasks.findByIdAndUpdate(cardTasksId, params, {new: true});
        if (!cardTasksUpdated) {
            return res.status(404).send({
                status: 'error',
                message: 'El cardTasks no existe'
            });
        }
        return res.status(200).send({
            status: 'success',
            cardTasks: cardTasksUpdated
        });
    } catch (error) {
        return res.status(500).send({
            status: 'error',
            message: 'Error al actualizar el cardTasks'
        });
    }
}

module.exports = {
  prueba,
  save,
  update
};
