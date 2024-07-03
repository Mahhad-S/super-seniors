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
    cHair: String,
    cSkin: String,
    cEye: String,
    cHeight: String,
    cWeight: String,
    cSex: String,
    cGen: String,
    cRace: String,
    cEth: String,
    cNat: String,
    cAge: String
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
    sbtb: String,
    iPrice: String,
    iWeight: String,
    iSize: String,
    iCDate: String,
    iDDate: String,
    iHist: String,
    iSimb: String,
    iInWork: String
});

const LocationsArticleSchema = new mongoose.Schema({
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
    lPop: String,
    lDen: String,
    lAlt: String,
    lFDate: String,
    lDDate: String,
    lGov: String,
    lHist: String,
    lDemo: String,
    lDist: String,
    lPOIS: String
});

const OrganizationsArticleSchema = new mongoose.Schema({
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
    oSlog: String,
    oDen: String,
    oAlt: String,
    oFDate: String,
    oDDate: String,
    oStr: String,
    oAgenda: String,
    oHist: String,
    oDisb: String
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
