const router = require('express').Router();
const mongoose = require('mongoose');
let User = require("../models/userModel")
let Location = require("../models/locationModel")
//Search All User
//Use for Admin page User Table
//http://localhost:8080/searchAllUser
router.get("/searchAllUser",(req,res)=>{
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

//Search All locations
//http://localhost:8080/searchAllLocation
router.get("/searchAllLocation",(req,res)=>{
    Location.find()
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
//search One location
//input: query 
//http://localhost:8080/searchOneLocation?location=xxxxx
router.get("/searchOneLocation",(req,res)=>{
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