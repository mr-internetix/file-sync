// user model 

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    displayName:{type:String,required:true},
    email:{type:String,required:true},
    photoUrl:{type:String,required:false},
    uid:{type:String,required:true},

},{timestamps:true});

module.exports = mongoose.model('users',userSchema);