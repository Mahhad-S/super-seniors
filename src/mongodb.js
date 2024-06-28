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
    sbtb: String,
    ch_hair: String,
    ch_skin: String,
    ch_eyes: String,
    ch_height: String,
    ch_weight: String,
    ch_sex: String,
    ch_gender: String,
    ch_race: String,
    ch_eth: String,
    ch_nationality:String,
    ch_age: String
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
