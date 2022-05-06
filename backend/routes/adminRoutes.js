const router = require('express').Router();
const mongoose = require('mongoose');

router.get("/admin", (req, res) => {
    res.send({msg:'Hello World. This is admin routes'})
})

module.exports = router;