
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '../.env')});
const router = require('express').Router();
const users = require('../models/users');


router.post('',async (req, res) => {
    console.log(req.body.userid);
    try{
        const id = await users.findOne({uid: req.body.userid});
        if(id){
        res.send({
            "uid":id.uid
        });
        
        }
        else{
            const user = new users( {
                
                displayName: req.body.name,
                email: req.body.email,
                photoUrl: req.body.imageUrl,
                uid: req.body.userid,
            });
            const userId = await user.save();
            const id = await users.findOne({uid: req.body.userid});

            await res.send({
                "uid":id.uid
            });
    
            
            console.log("user account created")
        }

    }catch(err){
        return res.render('download',{error:'something went wrong '});
    }

});

module.exports = router;



