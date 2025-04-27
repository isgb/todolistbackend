const {Schema, model} = require('mongoose')

const CardTasksSchema = Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required: true
    }
})

module.exports = model("CardTasks", CardTasksSchema, 'cardtasks')