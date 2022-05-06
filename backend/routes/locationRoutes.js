const router = require("express").Router();
const mongoose = require("mongoose");
let Location = require("../models/locationModel");
const fetch = require("node-fetch");

router.get("/location/:location", (req, res) => {
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

module.exports = router;
