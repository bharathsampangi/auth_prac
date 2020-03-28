import mongoose from "mongoose";
import passport from "passport";
import User from "../models/User";
import { Strategy } from "passport-google-oauth20";
import { clientID, clientSecret } from "../util/secret";

passport.use(new Strategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: '/auth/google/callback'
},
    async (accessToken, refreshToken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
            return done(undefined, existingUser)
        }
        const newUser = await new User({ googleId: profile.id }).save();
        done(undefined, newUser);
    }
));

