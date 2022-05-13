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
let Weather = require("../models/weatherModel");
let Location = require("../models/locationModel");
const fetch = require("node-fetch");

//Create Weather data
router.get("/weather/create/:location", (req, res) => {
  fetch(
    "http://api.weatherapi.com/v1/current.json?key=b6aad25f604944e0987142747221004&q=" +
      req.params["location"]
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

//FindAll
router.get("/weather", (req, res) => {
  Weather.find()
    .populate('location')
    .exec(function (err, result) {
      if (err) {
        res.status(500).send({ msg: err.message });
      } else {
        res.send(result);
      }
    });
});

//FindOne
router.get("/weather/:location", (req, res) => {
  Weather.find()
    .populate("location")
    .exec(function (err, results) {
      if (err) {
        res.status(500).send({ msg: err.message });
      } else {
        for (let i = 0; i < results.length; i++) {
          if (results[i].location.locationName === req.params["location"]) {
            res.send(results[i]);
          }
        }
      }
    });
});

//Update Weather data
router.get("/weather/update/:location", (req, res) => {
  Weather.find()
    .populate("location")
    .exec(function (err, results) {
      if (err) {
        res.status(500).send({ msg: err.message });
      } else {
        for (let i = 0; i < results.length; i++) {
          if (results[i].location.locationName === req.params["location"]) {
            Weather.findOne({ _id: results[i]._id }, (err, result) => {
              if (err) {
                res.status(500).send({ msg: err.message });
              } else {
                fetch(
                  "http://api.weatherapi.com/v1/current.json?key=b6aad25f604944e0987142747221004&q=" +
                    req.params["location"]
                )
                  .then((res) => res.json())
                  .then((data) => {
                    result.time = data.current.last_updated;
                    result.temp_c = data.current.temp_c;
                    result.wind_kph = data.current.wind_kph;
                    result.wind_dir = data.current.wind_dir;
                    result.humidity = data.current.humidity;
                    result.precip_mm = data.current.precip_mm;
                    result.vis_km = data.current.vis_km;
                    result.save();
                    res.send({ msg: "Location has been updated" });
                  });
              }
            });
          }
        }
      }
    });
});

module.exports = router;
