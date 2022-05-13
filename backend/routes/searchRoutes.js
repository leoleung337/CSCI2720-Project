/*
Hui Cheuk Hin 1155124935
Law Wan Chun Jeffrey 1155125137
Lee Kam Chung Gordon 1155142809
Leung Tsz Hin Leo 1155127195
Wong Kai Lok Peter 1155125720
Wong Yuen Ying Angel 1155125283
*/
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
//http://localhost:8080/searchOneLocation/xxxx
router.get("/searchOneLocation/:location",(req,res)=>{
    Location.find({ locationName: { $regex: req.body.location, $options: "i" } })
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
