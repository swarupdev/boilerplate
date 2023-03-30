"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.get("/login/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
}));
router.get("/callback/test", (req, res) => {
    res.send(req.session.userId);
});
router.get("/auth/google/callback", passport_1.default.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL,
    failureRedirect: process.env.FRONTEND_URL + "/loginwithgooglefailed",
}), (req, res) => {
    console.log(req.user);
    req.session.userId = req.user.id;
    res.redirect(process.env.FRONTEND_URL);
});
exports.default = router;
//# sourceMappingURL=loginWithGoogle.js.map