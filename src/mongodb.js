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

const CharacterArticleSchema = new mongoose.Schema({
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

const ItemsArticleSchema = new mongoose.Schema({
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

LocationsArticleSchema = new mongoose.Schema({
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

OrganizationsArticleSchema = new mongoose.Schema({
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
const CharacterArticleCollection = mongoose.model("CharacterArticles", CharacterArticleSchema);
const ItemsArticleCollection = mongoose.model("ItemsArticles", ItemsArticleSchema);
const LocationsArticleCollection = mongoose.model("LocationsArticles", LocationsArticleSchema);
const OrganizationsArticleCollection = mongoose.model("OrganizationsArticles", OrganizationsArticleSchema);

module.exports = {
    GeneralArticleCollection,
    CharacterArticleCollection,
    ItemsArticleCollection,
    LocationsArticleCollection,
    OrganizationsArticleCollection,
};
