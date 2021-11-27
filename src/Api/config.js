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
    },
    mysql: {
        HOST: "localhost",
        USER: "root",
        PASSWORD: "123456",
        DB: "testdb",
        dialect: "mysql",
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        }
    }
}