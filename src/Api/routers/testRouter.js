var express = require('express');
var asyncHandler = require('express-async-handler')
var router = express.Router();
var testController = require("./../controller/testController")

router.post('/configs/:data', validator.validate("post", "/configs/{data}"),
    asyncHandler(async function (req, res) {
        return res.status(200).send({})
    })

)

module.exports = router