/*
Hui Cheuk Hin 1155124935
Law Wan Chun Jeffrey 1155125137
Lee Kam Chung Gordon 1155142809
Leung Tsz Hin Leo 1155127195
Wong Kai Lok Peter 1155125720
Wong Yuen Ying Angel 1155125283
*/
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
            return res.status(200).send({msg:'User successfully logged in.', username: user.username});
        }
    })

})

module.exports = router;
