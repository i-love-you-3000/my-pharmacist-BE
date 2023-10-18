import express from "express";
import { json, urlencoded } from "express";
import methodOverride from "method-override";
import logger from "morgan";
import routes from "./config/route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import moment from "moment-timezone";
import session from "express-session";
import MySQLStoreFactory from "express-mysql-session";
const MySQLStore = MySQLStoreFactory(session);

dotenv.config();

const port = process.env.SERVER_PORT || 5000;

const option = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_DATABASE,
    clearExpired: true,
    checkExpirationInterval: 10000,
    expiration: 10000,
};

const sessionStore = new MySQLStore(option);

class App {
    constructor() {
        this.app = express();
        this.setMiddleWare();
        this.getRouting();
        this.listen();
        const today = new Date();
        console.log(moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss"));
        console.log(process.env.TZ);
        console.log("PORT", port);
        console.log(today);
    }

    setMiddleWare() {
        this.app.use(logger("dev"));
        this.app.use(json());
        this.app.use(urlencoded({ extended: false }));
        this.app.use(methodOverride());
        this.app.use(cookieParser());
        this.app.use(
            session({
                secret: process.env.SESSION_KEY,
                resave: false,
                saveUninitialized: true,
                store: sessionStore,
            })
        );
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
