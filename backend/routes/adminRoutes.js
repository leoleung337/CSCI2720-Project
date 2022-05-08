const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
let User = require('../models/userModel');

router.get("/admin", (req, res) => {
    res.send({msg:'Hello World. This is admin routes'})
})

//update username or password
router.post("/admin/:username/update", async(req, res) => {
    if (req.body.changeUsername == "" && req.body.changePassword == ""){
        return res.status(400).send({msg: "Please fill in the blanks if you want to update profile."})
    }
    else {
        User.findOne({ username: req.body.changeUsername }, (err, user) => {
            if (user){
                return res.status(401).send({msg: "Username existed. Please choose another username."})
            }else{
                User.findOne({ userId: req.params.userId, }, async (err, user) => {
                    if(!user){
                        return res.status(401).send({msg: "We cannot find this user to update."})
                    }
                    else {
                        //username update
                        if (req.body.changeUsername == ""){
                            user.username = req.body.username
                        } else {user.username = req.body.changeUsername}
                         //password update
                        if (req.body.changePassword == ""){
                            user.password = req.body.password
                        } 
                        else {
                            const hashedPassword = await bcrypt.hash(req.body.changePassword, 10)
                            user.password = hashedPassword
                        }
                        user.save(() => {
                            if (err){
                                return res.status(500).send({msg: err.message});
                            }
                            else{
                                return res.status(201).send({msg: "Profile has been update"});
            
                            }
                        })
                    }
                })
            }  
        })



    }
})

module.exports = router;