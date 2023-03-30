import express from "express";
import loginWithGoogle from "./loginWithGoogle";
import loginWithFacebook from "./loginWithFacebook";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send("Hello from api");
});

router.use(loginWithFacebook);
router.use(loginWithGoogle);

export default router;
