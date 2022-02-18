const router = require("express").Router();
const admin = require("firebase-admin");
const userfiles = require("../models/userfiles");


router.post('/:value',async(req,res)=>{


    const sessionCookie = req.cookies.session || "";
    admin
    .auth()
    .verifySessionCookie(sessionCookie,true)
    .then(async()=>{
        try{
        let user = await userfiles.findOne({uid:req.body.uid})
        let file_index = user.original_name.indexOf(req.params.value);
        let path = user.path[file_index]
        
        const filePath = `${__dirname}/../${path}`;

            console.log(filePath)
        

        
            res.download(filePath);
            

        
        
        
    }catch(err){
        res.end('something went wrong')
    }
        
        
        
    }).catch((err)=>{res.redirect("/login")});
    


})




module.exports = router;
