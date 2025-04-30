const { Schema, model } = require('mongoose');

const TaskSchema = Schema({
    cardTasksId:{
        type: Schema.ObjectId,
        ref: 'CardTasks',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = model("Task", TaskSchema, 'task');
