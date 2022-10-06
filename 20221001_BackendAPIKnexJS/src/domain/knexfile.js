const { credentials } = require("./credentials");

const config = {
    client: "mysql2",
    connection: {
        database: credentials.database,
        user: credentials.user,
        password: credentials.password,
        host: credentials.host,
        port: credentials.port,
        timezone: "+03:00"
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: "knex_migrations",
        directory: "migrations"
    }
};

module.exports = config;