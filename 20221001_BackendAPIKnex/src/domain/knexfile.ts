import "ts-node/register";
import { credentials } from "./credentials";

const config: any = {
    client: "mysql2",
    connection: {
        database: credentials.database,
        user: credentials.user,
        password: credentials.password,
        host: credentials.host,
        port: credentials.port,
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: "knex_migrations",
        directory: "migrations",
    },
};

export default config;
