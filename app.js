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

const app = express();

const today = new Date();
        console.log(moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss"));
        console.log(process.env.TZ);
        console.log("PORT", port);
console.log(today);
       
app.use(logger("dev"));
       app.use(json());
       app.use(urlencoded({ extended: false }));
    app.use(methodOverride());
app.use(cookieParser());
app.use(
            session({
                secret: process.env.SESSION_KEY,
                resave: false,
                saveUninitialized: true,
                store: sessionStore,
            })
);
        
const whitelist = ["http://localhost:8080", "http://localhost:8081", "http://localhost:19000"];

const corsOptions = {
  origin: function (origin, callback) { 
    if (whitelist.indexOf(origin) !== -1) { // 만일 whitelist 배열에 origin인자가 있을 경우
      callback(null, true); // cors 허용
    } else {
      callback(new Error("Not Allowed Origin!")); // cors 비허용
    }
  },
};
        app.use(cors(corsOptions));

app.use("/", routes);
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
