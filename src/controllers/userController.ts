import { Request, Response } from "express";
import passport from "passport";

export const signIn = passport.authenticate('google', { scope: ['profile', 'email'] });

export const callBack = passport.authenticate('google', (req: Request, res: Response) => {
    res.redirect("/")
})
