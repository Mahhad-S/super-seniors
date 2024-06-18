const mongoose = require('mongoose');

const LogInSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

// Create a model based on the schema
const collection= mongoose.model("Collection1",LogInSchema)

// Export the collection model
module.exports=collection