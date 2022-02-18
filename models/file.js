// file model 


const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const fileSchema = new Schema({
    filename:{type:String, required:true},
    path:{type:String,required:true},
    size:{type:Number,required:true},
    uuid:{type:String,required:true},
    sender:{type:String,required:false},
    reciever:{type:String,required:false},


},{timstamps:true});



module.exports = mongoose.model('File',fileSchema);