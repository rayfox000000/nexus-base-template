var express = require('express');
var asyncHandler = require('express-async-handler')
var router = express.Router();
var testController = require("./../controller/testController")
const fs = require('fs')
const jsYaml = require("js-yaml");
const {
    OpenApiValidator
} = require("express-openapi-validate");

const openApiDocument = jsYaml.load(
    fs.readFileSync("./specs/openapi.yaml", "utf-8")
);

// Construct the validator with some basic options
const validator = new OpenApiValidator(openApiDocument, {
    ajvOptions: {
        allErrors: true,
        removeAdditional: "all",
    }
});

router.post('/configs/:data', validator.validate("post", "/configs/{data}"),
    asyncHandler(async function (req, res) {
        return res.status(200).send({})
    })

)

module.exports = router