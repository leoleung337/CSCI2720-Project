//const express = require('express')
//const router = express.Router()
const router = require('express').Router();
const mongoose = require('mongoose');

router.get("/test", (req, res) => {
    res.send({msg:'Hello World. This is server testing2'})
})

module.exports = router;