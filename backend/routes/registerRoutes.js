const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const crypto = require('crypto');
let User = require('../models/userModel');

router.post("/register", async(req, res) => {
    //check existed username or email 
    const userExisted = await User.findOne({username: req.body.username})
    if (userExisted != null) return res.status(400).json({msg: "username existed."})

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    User.create({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: hashedPassword
    }, (err, results) => {
        if (err) {
            res.status(500).send({msg: "User create error."})
        } else{
            res.status(201).send({msg: "User has been created."})
        }
    })
})

module.exports = router;