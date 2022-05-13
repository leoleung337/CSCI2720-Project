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
const bcrypt = require("bcryptjs")
let User = require('../models/userModel');
let Comment = require('../models/commentModel');
let Weather = require('../models/weatherModel');
let Location = require("../models/locationModel");
const fetch = require("node-fetch");

router.get("/admin", (req, res) => {
    res.send({msg:'Hello World. This is admin routes'})
})
//old username + password req.params.username
//new username + passwrod
//changeUsername changePassword

//update username or password
/* router.post("/admin/update/:username", async(req, res) => {
    if (req.body.changeUsername == "" && req.body.changePassword == ""){
        return res.status(400).send({msg: "Please fill in the blanks if you want to update profile."})
    }
    else {
        User.findOne({ username: req.body.changeUsername }, (err, user) => {
            if (user){
                return res.status(401).send({msg: "Username existed. Please choose another username."})
            }else{
                User.findOne({ username: req.params.username, }, async (err, user) => {
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
}) */

//update username or password
router.post("/admin/update/:username", async(req, res) => {
  if (req.body.changeUsername == "" && req.body.changePassword == ""){
      return res.status(400).send({msg: "Please fill in the blanks if you want to update User."})
  }
  else {
      User.findOne({ username: req.body.changeUsername }, (err, user) => {
          if (user){
              return res.status(401).send({msg: "Username existed. Please choose another username."})
          }else{
              User.findOne({ username: req.params.username, }, async (err, user) => {
                  if(!user){
                      return res.status(401).send({msg: "We cannot find this user to update."})
                  }
                  else {
                      //username update
                      if (req.body.changeUsername != ""){
                          user.username = req.body.changeUsername
                        }
                       //password update
                      if (req.body.changePassword != ""){
                          const hashedPassword = await bcrypt.hash(req.body.changePassword, 10)
                          user.password = hashedPassword
                      }
                      user.save(() => {
                          if (err){
                              return res.status(500).send({msg: err.message});
                          }
                          else{
                              return res.status(201).send({msg: "User has been update"});
          
                          }
                      })
                  }
              })
          }  
      })
  }
})


//delete user, delete user comment
router.post("/admin/user/delete/:username", async (req, res) => {
    //Delete all Comment
    await Comment.deleteMany({author: req.params.username}).then(function(){
        console.log("---Comment deleted---")
    }).catch(function(err){
        console.log(err)
        return res.status(400).json({msg:"Fail to delete Comment"})
    })

    //delete the user
    await User.findOneAndDelete({username: req.params.username}).then(function(user){
        console.log("USER DELETED")
        return res.status(200).json({msg:"User deleted!"})
    }).catch(function(err){
        console.log(err)
        return res.status(400).json({msg:"Fail to delete user"})
    })

})

//delete location, weather, comment
router.post("/admin/location/delete/:location", async (req, res) => {
    Location.findOneAndDelete({ locationName: req.params.location }, (err, results) => {
        if (err) {
            res.status(500).send({ msg: err.message });
          } else if (!results) {
            res.status(500).send({ msg: "This location not existed in database" });
          } else {
              Comment.deleteMany({ _id: { $in: results.comments } }, (err) =>{
                  if (err){
                    res.status(500).send({ msg: err.message });
                  }
              })
              Weather.findOneAndDelete({ location: results._id }, (err) =>{
                if (err){
                    res.status(500).send({ msg: err.message });
                  }
              })
              res.send({ msg: results.locationName + " has been deleted" });
          }
    })
})

//create location, related weather
router.post("/admin/location/create/:location", (req, res) => {
    Location.findOne({locationName: req.params.location}, (err, results) => {
        if (err) {
            res.status(500).send({ msg: "Location create error." + err.message });
          } else if (results) {
            res.status(500).send({ msg: "Location existed" });
          } else {
            let location = req.params["location"];
            fetch(
              "http://api.weatherapi.com/v1/current.json?key=b6aad25f604944e0987142747221004&q=" +
                location
            )
              .then((res) => res.json())
              .then((data) => {
                Location.create(
                  {
                    locationName: data.location.name,
                    latitude: data.location.lat,
                    longitude: data.location.lon,
                  },
                  (err, results) => {
                    if (err) {
                      res.status(500).send({ msg: "Location create error." });
                    } else {
                        Weather.create(
                            {
                              location: results._id,
                              time: data.current.last_updated,
                              temp_c: data.current.temp_c,
                              wind_kph: data.current.wind_kph,
                              wind_dir: data.current.wind_dir,
                              humidity: data.current.humidity,
                              precip_mm: data.current.precip_mm,
                              vis_km: data.current.vis_km,
                            },
                            (err, weatherRseults) => {
                              if (err) {
                                res.status(500).send({ msg: "Weather create error." + err.message });
                              } else {
                                res.status(200).send({ msg: results.locationName + "  has been created." });
                              }
                            }
                          );
                    }
                  }
                );
              });
          }
    })
    
  });

module.exports = router;
