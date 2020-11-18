const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
    {
        description: {
            type: String,
            required: true
        },
        isComplete: {
            type: Boolean,
            required: true
        }
    }
);

const Task = mongoose.model('task', TaskSchema);

module.exports = Task;