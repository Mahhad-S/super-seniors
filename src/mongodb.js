<<<<<<< HEAD
// Import mongoose module
const mongoose=require("mongoose")

// Connect to MongoDB database
=======
const mongoose=require("mongoose")

>>>>>>> e4208be12ccf33730bb82b27dcb8048f44e8d041
mongoose.connect("mongodb://localhost:27017/SuperSeniors")
.then(()=>{
    console.log("MongoDB Connected")
})
.catch((error)=>{
    console.log("Failed to Connect",error)
})

<<<<<<< HEAD
// Define the schema for login credentials
=======
>>>>>>> e4208be12ccf33730bb82b27dcb8048f44e8d041
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

<<<<<<< HEAD
// Create a model based on the schema
const collection=new mongoose.model("Collection1",LogInSchema)

// Export the collection model
=======

const collection=new mongoose.model("Collection1",LogInSchema)

>>>>>>> e4208be12ccf33730bb82b27dcb8048f44e8d041
module.exports=collection