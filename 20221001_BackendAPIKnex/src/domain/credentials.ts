import dotenv from "dotenv";
dotenv.config();

export const credentials = {
    database: String(process.env.DB_DATABASE),
    user: String(process.env.DB_USER),
    password: String(process.env.DB_PASS),
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
};
