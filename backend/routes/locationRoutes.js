/*
Hui Cheuk Hin 1155124935
Law Wan Chun Jeffrey 1155125137
Lee Kam Chung Gordon 1155142809
Leung Tsz Hin Leo 1155127195
Wong Kai Lok Peter 1155125720
Wong Yuen Ying Angel 1155125283
*/
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
/* router.get("/location", (req, res) => {
  Location.find((err, results) => {
    if (err) {
      res.status(500).send({ msg: err.message });
    } else {
      res.send(results);
    }
  });
}); */

router.get("/location",(req,res)=>{
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

//Add favorite location
router.get("/location/addFavourite/:location/:username", (req, res) => {
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
          } else if (!location) {
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

//Delete favorite location
router.get("/location/deleteFavourite/:location/:username", (req, res) => {
  User.findOne({ username: req.params.username })
  .populate("favouriteLocations")
  .exec((err, user) => {
    if (err) {
      res.status(500).send({ msg: err.message })
    } else if (!user){
      res.status(500).send({ msg: "username not existed!"})
    } else {
      Location.findOne(
        { locationName: req.params["location"] },
        (err, location) => {
          if (err) {
            res.status(500).send({ msg: err.message });
          } else if (!location) {
            res.status(500).send({ msg: "This location cannot find" });
          } else {
            user.favouriteLocations.pull(location._id);
            let uniqueLocation = user.favouriteLocations.filter(
              (element, index) => {
                return user.favouriteLocations.indexOf(element) === index;
              }
            );
            user.favouriteLocations = [...uniqueLocation];
            user.save();
            res.send({ msg: "User favourite location has been deleted" });
          }
        }
      );
    }
  })
})

//List all favorite location
router.get("/location/listAllFavourite/:username", (req, res) => {
  User.findOne({ username: req.params.username })
  .populate("favouriteLocations")
  .exec((err, user) => {
    if (err) {
      res.status(500).send({ msg: err.message })
    } else if (!user){
      res.status(500).send({ msg: "username not existed!"})
    } else{
      res.send(user.favouriteLocations)
    }
  })
})

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
/* router.post("/location/:location/addComment", (req, res) => {
  if (req.body.comment != ""){
    var commentObj = new Comment({
      author: req.body.user,
      content: req.body.comment
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
           location.save()
           res.send({msg: "Comment submitted successfully"});
         }
       });
      }
    });
  }
}); */

router.post("/location/:location/addComment", (req, res) => {
  if (req.body.comment == ""){
    res.send({ msg: "Please fill in the comment box" })
  } else {
    Comment.create({
      author: req.body.author,
      content: req.body.content
    }, (err, results) => {
      if (err) {
        res.status(500).send({msg: "Comment create error."})
    } else{
        Location.findOne({ locationName: req.params.location})
        .populate("comments")
        .exec((err, location) => {
          if (err) {
            res.status(500).send({msg: "Location Comment create error."})
        } else{
          location.comments.push(results)
          location.save()
          res.send({msg: "Comment submitted successfully"});
        }

        })
    }
    })
  }
})

//LoadComments
router.get("/location/:location/loadComment", (req, res) => {
  //var commentList =[];
  Location.findOne({locationName: req.params["location"]})
  .populate("comments")
  .exec((err, result) => {
    if (err) {
      res.status(500).send({ msg: err.message });
    }
    else{
      res.send(result.comments);
/*       for (var i = 0; i < result.comments.length; i++)
       commentList.push([result.comments[i].author, result.comments[i].content]);
       res.send(commentList); */
    }
  });
});

module.exports = router;
