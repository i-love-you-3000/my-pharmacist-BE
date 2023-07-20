import express, { json, urlencoded } from "express";
import methodOverride from "method-override";
import logger from "morgan";
import routes from "./config/route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import moment from "moment-timezone";
dotenv.config();
const port = process.env.SERVER_PORT || 5000;

class App {
    constructor() {
        this.app = express();

        this.setMiddleWare();

        this.getRouting();

        this.listen();
        var today = new Date();
        console.log(moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss"));
        console.log(process.env.TZ);
        console.log(today);
    }
    setMiddleWare() {
        this.app.use(logger("dev"));

        this.app.use(json());
        this.app.use(urlencoded({ extended: false }));

        this.app.use(methodOverride());
        this.app.use(cookieParser());
        this.app.use(cors());
    }
    getRouting() {
        this.app.use("/", routes);
    }
    listen() {
        this.app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        });
    }
}
export default new App().app;
