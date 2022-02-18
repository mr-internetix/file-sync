// imports 
const multer = require('multer');

const router = require('express').Router();

const path = require('path');

const userfiles = require('../models/userfiles')




var storage = multer.diskStorage({   
    destination: function(req, file, cb) { 
       cb(null, './useruploads');    
    }, 
    filename: function (req, file, cb) { 
       cb(null , `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`);   
    }

 });

 
 
 const upload = multer({storage: storage,limits: { fileSize: 100000 * 1000 }}).array("files", 4);
 
 router.post('/userfiles/:uid',function(req,res){
   upload(req,res, async (err)=> {
     
     const uid = await userfiles.findOne({uid:req.params.uid})
     if(uid){
       console.log("uid exists")
       console.log(req.files[0].originalname)
      var file_name = [];
      var file_path = [];
      var file_size = [];
      var original_name = []
      console.log(original_name);


      for(let i =0;i < req.files.length;i++){
        file_name.push(req.files[i].filename);
        file_path.push(req.files[i].path);
        file_size.push(req.files[i].size);
        original_name.push(req.files[i].originalname);
      }

       await userfiles.findOneAndUpdate({uid:req.params.uid},{$push:{filename:file_name,path:file_path,size:file_size,original_name:original_name}});

       res.end("File is uploaded");
     }
     else{

      var file_name = [];
      var file_path = [];
      var file_size = [];
      var original_name = [];
      

      for(let i =0;i < req.files.length;i++){
        file_name.push(req.files[i].filename);
        file_path.push(req.files[i].path);
        file_size.push(req.files[i].size);
        original_name.push(req.files[i].originalname);
      }

  

      const files = new userfiles({
          
        uid:req.params.uid,
        filename:file_name,
        path:file_path,
        size:file_size,
        original_name:original_name,


    })

    const response = await files.save();
    res.end("File is uploaded");
    
  }

      if(err) {
          return res.end("Error uploading file.");
      }
     
  });
});

 








module.exports = router;