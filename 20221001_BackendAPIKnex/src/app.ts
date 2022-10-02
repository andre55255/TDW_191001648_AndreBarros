import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swaggerDocs from "./swagger.json";

// Routes
import accountRouter from "./routes/accountRouter";

export class App {
    public server: express.Application;

    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        this.docs();
    }

    private middlewares() {
        dotenv.config();
        this.server.use(
            cors({
                origin: ["http://localhost:3000"],
            })
        );
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: true }));
    }

    private routes() {
        this.server.use("/Account", accountRouter)
    }

    private docs() {
        this.server.use(
            "/swagger",
            swaggerUI.serve,
            swaggerUI.setup(swaggerDocs)
        );
    }
}
