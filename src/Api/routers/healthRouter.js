var express = require('express');
var router = express.Router();
var db = require("../db")

router.get('/health', async function (req, res) {

    var status = 200

    var message = { service: "ok" }

    if (db.isConnected()) {
        message.db = 'ok'
    }
    else {
        status = 400
        message.db = 'bad'
    }

    return res.status(status).send(message)
})


module.exports = router