const router = require('express').Router();
const mongoose = require('mongoose');

router.get("/register", (req, res) => {
    res.send({msg:'Hello World. This is register routes'})
})

module.exports = router;