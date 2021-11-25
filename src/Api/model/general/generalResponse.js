const StatusMessages = require("./statusMessages");

class GeneralResponse {
    constructor({
        statusCode
    }) {
        this.statusCode = statusCode;
        this.statusMessage = parseStatusMessage(statusCode);
    }
}

function parseStatusMessage(statusCode) {
    return StatusMessages[statusCode];
}
module.exports = GeneralResponse;