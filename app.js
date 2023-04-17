const express = require('express');
const app = express();
const dotenv = require('dotenv');
const routes = require("./config/express");
const methodOverride = require("method-override");

class App{
    constructor(){
        this.app=express;
        dotenv.config();
        this.setMiddleWare();
        this.getRouting();
    }
    setMiddleWare(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended : false}));

        this.app.use(methodOverride());
    }
    getRouting(){
        this.app.use(routes);
    }
}

module.exports = new App().app;