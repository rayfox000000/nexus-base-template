const env = process.env;

module.exports = {
    port: parseInt(env.PORT, 10) || 8080,
    mongoDb: {
        uri: env.MONGODB_URL || "",
        database: env.DATABASE || ""
    },
    logging: {
        uri: env.LOGGING_URL || "",
        collection: env.LOGGING_COLLECTION || "",
    },
    setting: {
        limit: parseInt(env.LIMIT, 10) || 10,
        decimal: parseInt(env.DECIMAL, 10) || 2,
    }
}