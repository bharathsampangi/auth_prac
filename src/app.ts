import express, { Request, Response } from "express";
import passport from "passport";
import { mongoURI, cookieKey } from './util/secret';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";

const GoogleStrategy = require('passport-google-oauth20').Strategy;

import "./services/passport";
import User from "./models/User";
import { Strategy } from "passport-google-oauth20";
import { clientID, clientSecret } from "./util/secret";

import * as userController from "./controllers/userController";

const mongooseURI = mongoURI;
mongoose.connect(mongooseURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err: any) => {
    if (err)
        console.log(err.message);
    else
        console.log("Successfully Connected");
});

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieSession({
    maxAge: 1 * 24 * 60 * 60 * 1000,
    keys: [cookieKey]
}))
app.use(passport.initialize());
app.use(passport.session());

app.set("port", process.env.PORT || 5000);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world");
});

app.get("/auth/google", userController.signIn
);

app.get("/auth/google/callback", userController.callBack);

const server = app.listen(app.get("port"), () => {
    console.log("Express is running on: %d", app.get("port"));
});