// user files model 

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userfilesSchema = new Schema({
   uid:{type:String,required:true},
   filename:{type:Array,required:true},
   path:{type:Array,required:true},
   size:{type:Array,required:true},
   original_name:{type:Array,required:true}


},{timestamps:true});


module.exports = mongoose.model('userfiles',userfilesSchema);