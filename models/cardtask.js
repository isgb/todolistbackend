const {Schema, model} = require('mongoose')

const CardTasksSchema = Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    }
})

module.exports = model("CardTasks", CardTasksSchema, 'cardtasks')