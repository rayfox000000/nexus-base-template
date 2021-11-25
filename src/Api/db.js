var config = require('./config');
const {
    MongoClient,
} = require("mongodb");

var Database = function () {}

module.exports = Database

Database.instance = function () {
    return Database.db
}

Database.init = async function () {
    var client = await MongoClient.connect(config.mongoDb.uri, {
        useNewUrlParser: true
    })
    var database = client.db(config.mongoDb.database)

    Database.db = database
    Database.client = client

    console.log("Connected to " + config.mongoDb.uri)
}

Database.manualInit = async function () {
    if (Database.isConnected()) {
        throw Error("mongodb already connected")
    }
    await Database.init()
}

Database.isConnected = function () {
    if (typeof Database.client === "undefined") {
        return false
    } else {
        return Database.client.isConnected()
    }
}