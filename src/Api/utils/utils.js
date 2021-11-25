const GeneralResponse = require('./../model/general/generalResponse');
var fs = require("fs")
var path = require("path")
var handlebars = require("handlebars")
var _ = require("lodash")
const config = require("../config");

function generateGeneralStatusList(response, statusCode) {
    return response.GeneralResponse({
        "statusCode": statusCode
    })
}

async function connectDb() {
    const client = await MongoClient.connect(config.mongoDb.uri, {
            useNewUrlParser: true
        }),
        database = client.db(config.mongoDb.database);

    return [client, database]
}

function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath)
    if (fs.existsSync(dirname))
        return true
    ensureDirectoryExistence(dirname)
    fs.mkdirSync(dirname)
}

function decodeJwt(token) {
    if (_.isEmpty(token)) return

    var base64String = token.split('.')[1]
    var decodedValue = JSON.parse(Buffer.from(base64String, 'base64').toString('ascii'))
    return decodedValue
}

function clone(object) {
    return JSON.parse(JSON.stringify(object))
}

// remove properties with null/undefined values
function clean(object) {
    for (var propName in object) {
        if (object[propName] === null || object[propName] === undefined) {
            delete object[propName]
        }
    }
    return object
}

// remove properties that has non-matching keys
function retain(object, keys) {
    for (var propName in object) {
        if (!keys.includes(propName)) {
            delete object[propName]
        }
    }
    return object
}

function isValidNumber(object) {
    return object !== null && object !== undefined && typeof object == "number"
}

module.exports = {
    generateGeneralStatusList,
    connectDb,
    ensureDirectoryExistence,
    decodeJwt,
    clone,
    isValidNumber,
}