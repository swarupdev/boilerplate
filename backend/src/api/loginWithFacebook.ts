import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/login/facebook",
  passport.authenticate("facebook", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: process.env.FRONTEND_URL,
    failureRedirect: process.env.FRONTEND_URL + "/loginwithfacebookfailed",
  }),
  (req, res) => {
    console.log(req.user);
    // @ts-ignore
    req.session.userId = (req.user as any).id;
    res.redirect(process.env.FRONTEND_URL as string);
  }
);

export default router;
