const router = require("express").Router();
const mongoose = require("mongoose");
let Location = require("../models/locationModel");
let User = require("../models/userModel");
let Comment = require("../models/commentModel");
const fetch = require("node-fetch");

//Create Location Data
router.get("/location/create/:location", (req, res) => {
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
            res.status(200).send({ msg: "Location has been created." });
          }
        }
      );
    });
});

//FindALL
router.get("/location", (req, res) => {
  Location.find((err, results) => {
    if (err) {
      res.status(500).send({ msg: err.message });
    } else {
      res.send(results);
    }
  });
});

//Add favorite location
router.get("/location/addFavorite/:location/:username", (req, res) => {
  User.findOne({ username: req.params["username"] }, (err, user) => {
    if (err) {
      res.status(500).send({ msg: err.message });
    } else if (!user) {
      res.status(500).send({ msg: "This user cannot find" });
    } else {
      Location.findOne(
        { locationName: req.params["location"] },
        (err, location) => {
          if (err) {
            res.status(500).send({ msg: err.message });
          } else if (!user) {
            res.status(500).send({ msg: "This location cannot find" });
          } else {
            user.favouriteLocations.push(location._id);
            let uniqueLocation = user.favouriteLocations.filter(
              (element, index) => {
                return user.favouriteLocations.indexOf(element) === index;
              }
            );
            user.favouriteLocations = [...uniqueLocation];
            user.save();
            res.send({ msg: "User favourite location has been updated" });
          }
        }
      );
    }
  });
});

//Delete
router.get("/location/delete/:location", (req, res) => {
  Location.findOne({ locationName: req.params["location"] }, (err, results) => {
    if (err) {
      res.status(500).send({ msg: err.message });
    } else if (!results) {
      res.status(500).send({ msg: "This location cannot find" });
    } else {
      res.send({ msg: "Location is deleted" });
    }
  }).remove();
});

//AddComments
router.post("/location/:location/addComment", (req, res) => {
  if (req.body.comment != ""){
    var commentObj = new Comment({
      author: req.body.user;
      content: req.body.comment;
    });
    Comment.create(commentObj, (err, comment) => {
      if (err) {
        res.status(500).send({ msg: err.message });
      }
      else{
       Location.findOne({locationName: req.params["location"]})
       .populate("comments")
       .exec((err, location) => {
         if (err) {
           res.status(500).send({ msg: err.message });
         }
         else{
           location.comments.push(comment);
           res.send({msg: "Comment submitted successfully"});
         }
       });
      }
    });
  }
});

//LoadComments
router.get("/location/:location/loadComment", (req, res) => {
  var commentList =[];
  Location.findOne({locationName: req.params["location"]})
  .populate("comments")
  .exec((err, result) => {
    if (err) {
      res.status(500).send({ msg: err.message });
    }
    else{
      for (var i = 0; i < result.comments.length; i++)
       commentList.push([result.comments[i].author, result.comments[i].content]);
      res.send(commentList);
    }
  });
});

module.exports = router;
