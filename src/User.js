const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    }
})

module.exports = mongoose.model('Collection1', userSchema);