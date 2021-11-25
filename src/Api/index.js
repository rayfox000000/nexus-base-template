var express = require('express');
var app = express();
var path = require("path")
var router = require('./routers/router')
var bodyParser = require('body-parser');
var config = require('./config')
var swaggerUi = require('swagger-ui-express')
var spec = require('./specs/openapi.json')
var errorHandler = require("./middleware/errorHandler")

const fs = require('fs')
const jsYaml = require("js-yaml");
const {
    OpenApiValidator
} = require("express-openapi-validate");

main()

async function main() {
    app.use(express.json());
    app.use(bodyParser.json({
        limit: '50mb'
    }))
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.get('/docs', (req, res) => {
        res.send(spec);
    })
    app.use('/swagger/docs', swaggerUi.serve, swaggerUi.setup(spec));
    // Load the validator and the spec
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

    app.use(validator.match());
    app.use("/api", router);
    app.use(errorHandler())

    console.log("Cedit service API run on localhost:" + config.port || "8080")

    app.listen(config.port || 8080);
}