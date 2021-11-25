var express = require('express');
var asyncHandler = require('express-async-handler')
var router = express.Router();
var testController = require("./../controller/testController")


router.get('/configs', asyncHandler(async function (req, res) {
    var result = await testController.getClientConfig(req, res)
    return res.status(200).send(result)
}))


module.exports = router