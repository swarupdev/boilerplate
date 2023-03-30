import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/callback/test", (req, res) => {
  // @ts-ignore
  res.send(req.session.userId);
});

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL,
    failureRedirect: process.env.FRONTEND_URL + "/loginwithgooglefailed",
  }),
  (req, res) => {
    console.log(req.user);
    // @ts-ignore
    req.session.userId = (req.user as any).id;
    res.redirect(process.env.FRONTEND_URL as string);
  }
);

export default router;
