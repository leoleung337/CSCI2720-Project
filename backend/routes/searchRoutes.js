const router = require('express').Router();
const mongoose = require('mongoose');

router.get("/search", (req, res) => {
    res.send({msg:'Hello World. This is search routes'})
})
module.exports = router;