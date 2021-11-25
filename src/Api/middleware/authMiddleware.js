var asyncMiddleware = require('middleware-async').asyncMiddleware
var clientRepository = require("../repository/clientRepository")

module.exports = asyncMiddleware(async function (req, res, next) {

    if (req.path === '/api/health') {
        return next()
    }

    var isBasicAuth = ((req.headers.authorization || '').split(' ')[0] || '') === 'Basic'

    if (isBasicAuth) {
        var base64String = (req.headers.authorization || '').split(' ')[1] || ''
        var [clientId, clientSecret] = Buffer.from(base64String, 'base64').toString().split(':')

        if (clientId && clientSecret) {
            try {
                var client = await clientRepository.getClient(clientId, clientSecret)

                req.httpContext = {
                    ...req.httpContext || {},
                    client: client,
                };

                req.headers.client = client.id

                return next()
            } catch (e) {
                return res.status(401).send({
                    message: 'Invalid client'
                })
            }


        }
    }

    res.status(401).send({
        message: 'Authentication required'
    })
})