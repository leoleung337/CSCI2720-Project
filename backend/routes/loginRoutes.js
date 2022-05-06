//const express = require('express')
//const router = express.Router()
const router = require('express').Router();
const mongoose = require('mongoose');
let User = require('../models/userModel');
const bcrypt = require('bcryptjs')

router.post("/login", (req, res) => {
    if (req.body.username == "admin" && req.body.password == "admin") {
        return res.status(201).send({msg:'Admin successfully logged in.'});
    }
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err){
            return res.status(500).send({msg: err.message});
        } else if (!user){
            return res.status(401).send({ msg:'The Username ' + req.body.username + ' is not registered'});
        } else if (!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(401).send({msg:'Wrong Password!'});
        }  else{
            return res.status(200).send({msg:'User successfully logged in.'});
        }
    })

})

module.exports = router;