var express = require('express');
var app = express();
var path = require("path")
var router = require('./routers/router')
var bodyParser = require('body-parser');
var config = require('./config')
var swaggerUi = require('swagger-ui-express')
var spec = require('./specs/openapi.json')
var errorHandler = require("./middleware/errorHandler")
var mysqlDb = require('./mySqlDB');
const cors = require("cors");


main()

async function main() {
    var corsOptions = {
        origin: "http://localhost:8081"
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(bodyParser.json({
        limit: '50mb'
    }))
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    mysqlDb.sequelize.sync();
    app.get('/docs', (req, res) => {
        res.send(spec);
    })
    app.use('/swagger/docs', swaggerUi.serve, swaggerUi.setup(spec));

    app.use("/api", router);
    app.use(errorHandler())

    console.log("Simple Base Template run on localhost:" + config.port || "8080")

    app.listen(config.port || 8080);
}