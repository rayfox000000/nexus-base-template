var express = require('express')
var router = express.Router()
var healthRouter = require('./healthRouter')
var testRouter = require('./testRouter')
var asyncHandler = require("express-async-handler")
var db = require("../db")

router.use((req, res, next) => {
    console.log("Called: ", req.method, req.path)
    next();
})

router.use(healthRouter)
router.use(testRouter)

router.use("*", (req, res) => {
    return res.status(404).send({ message: 'Cannot ' + req.method + ' ' + req.originalUrl })
})


module.exports = router