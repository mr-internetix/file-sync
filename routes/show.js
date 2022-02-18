const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')});
const router = require('express').Router();
const File = require('../models/file');



router.get('/:uuid',async (req,res)=>{
try{
    const file = await File.findOne({uuid: req.params.uuid});

     if(!file){
        return res.render('download',{error:'Link has been expired'});

     }

     return res.render('download',{
         uuid : file.uuid,
         fileName: file.filename,
         fileSize: file.size,
         downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`
     });


} catch(err){
    return res.render('download',{error:'something went wrong '});
    }


});     


module.exports = router;
