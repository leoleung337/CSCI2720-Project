//const express = require('express')
//const router = express.Router()
const router = require('express').Router();
const mongoose = require('mongoose');
const User = require('../models/userModel');

router.get("/login", (req, res) => {
/*     User.create({
        _id: new mongoose.Types.ObjectId(),
        username: 'Leo',
        password: '0000'
    }, function(err, results){
        if(err){
            res.send(err)
        }else{
            res.send({msg:'User created successfully'})
        }
    }) */
})

module.exports = router;