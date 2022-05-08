const router = require('express').Router();
const mongoose = require('mongoose');
let User = require("../models/userModel")
let Location = require("../models/locationModel")
//List All user for admin main page
//search for user
router.get("/search",(req,res)=>{
    User.find()
    .sort({username: 1})
    .exec(function(err, result){
        if (err){
            console.log(err)
            return res.status(400).json({msg:"Sth goes wrong"})
        }else{
            return res.status(200).json(result)
        }
    })
})
//search location
//input: query 
//http://localhost:8080/searchLocation?location=xxxxx
router.get("/searchLocation",(req,res)=>{
    Location.find({ locationName: { $regex: req.query.location, $options: "i" } })
    .sort({locationName: 1})
    .exec(function(err, result){
        if (err){
            console.log(err)
            return res.status(400).json({msg:"Sth goes wrong"})
        }else{
            return res.status(200).json(result)
        }
    })
})
module.exports = router;