const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/SuperSeniors")
.then(()=>{
    console.log("MongoDB Connected")
})
.catch((error)=>{
    console.log("Failed to Connect",error)
})

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


const collection=new mongoose.model("Collection1",LogInSchema)

module.exports=collection