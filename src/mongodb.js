// Import mongoose module
const mongoose=require("mongoose")

// Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/SuperSeniors")
.then(()=>{
    console.log("MongoDB Connected")
})
.catch((error)=>{
    console.log("Failed to Connect",error)
})

// Define the schema for login credentials
const LogInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

// Create a model based on the schema
const collection=new mongoose.model("Collection1",LogInSchema)

// Export the collection model
module.exports=collection