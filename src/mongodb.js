// Import mongoose module
const mongoose=require("mongoose")

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

const GeneralArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    sttb: String,
    sptb: String,
    spbb: String,
    sbtb: String
});

const GeneralArticleCollection = mongoose.model("GeneralArticles", GeneralArticleSchema);

module.exports = {
    GeneralArticleCollection
};
