const router = require('express').Router();


const userfiles = require("../models/userfiles");




router.get('/:uid',async(req,res)=>{
    try{

        console.log(req.params.uid)
       const user = await userfiles.findOne({uid:req.params.uid})
       const file_name = user.original_name
       const files_size = user.size
       
       // console.log(file_name);
       // console.log(file_path);
       res.send({file_name,files_size})
    }
    catch(err){
        console.log(err)
    
    }



})












module.exports = router;