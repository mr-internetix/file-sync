// imports 

// const path = require('path');
// require('dotenv').config({path: path.join(__dirname, '../.env')});
const router = require('express').Router();
const users = require('../models/users');
const admin = require("firebase-admin");



router.get('/:uid',async(req,res)=>{

    const sessionCookie = req.cookies.session || "";
    admin
    .auth()
    .verifySessionCookie(sessionCookie,true)
    .then(async()=>{

          
    try{
        const id = await users.findOne({uid:req.params.uid});
    

        return res.render('user',{
            name: id.displayName,
            photoUrl: id.photoUrl,
            email: id.email,
           csrfToken: req.csrfToken()
        });

    }catch(err){
        console.log('something went wrong')
    }

       
    })
    .catch((error)=>{
        res.redirect("/login")
    });
  
})



module.exports = router;