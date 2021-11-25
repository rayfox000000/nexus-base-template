module.exports = function () {
    return function (e, req, res, next) {

        if (e.message)
            return res.status(400).send({
                message: e.message
            })

        return res.status(500).send({
            message: "Internal Server Error"
        });
    }
}