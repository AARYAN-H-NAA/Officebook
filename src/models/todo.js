const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var TaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        index: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true,
        
    },
},
{timestamps:true});

// Export the model
const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;