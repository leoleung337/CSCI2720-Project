const router = require("express").Router();
const mongoose = require("mongoose");
let Weather = require("../models/weatherModel");
let Location = require("../models/locationModel");
const fetch = require("node-fetch");

router.get("/weather/:location", (req, res) => {
  let location = req.params["location"];
  fetch(
    "http://api.weatherapi.com/v1/current.json?key=b6aad25f604944e0987142747221004&q=" +
      location
  )
    .then((res) => res.json())
    .then((data) => {
      Location.findOne({ locationName: data.location.name }, (err, result) => {
        if (err) {
          return res.status(500).send({ msg: err.message });
        } else {
          Weather.create(
            {
              location: result._id,
              time: data.current.last_updated,
              temp_c: data.current.temp_c,
              wind_kph: data.current.wind_kph,
              wind_dir: data.current.wind_dir,
              humidity: data.current.humidity,
              precip_mm: data.current.precip_mm,
              vis_km: data.current.vis_km,
            },
            (err, results) => {
              if (err) {
                res
                  .status(500)
                  .send({ msg: "Weather create error." + err.message });
              } else {
                res.status(200).send({ msg: "Weather has been created." });
              }
            }
          );
        }
      });
    });
});

module.exports = router;
