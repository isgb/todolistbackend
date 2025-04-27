

const prueba = async (req, res) => {
    return res.status(200).send({
        status: "success",
        message: "Prueba desde controlador task"
    });
};

module.exports = {
    prueba
};