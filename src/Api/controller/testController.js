var utils = require("../utils/utils")

async function getTestClientConfig(req, res) {
    return req.httpContext.client.config
}

module.exports = {
    getTestClientConfig,
}