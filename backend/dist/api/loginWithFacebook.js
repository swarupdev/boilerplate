"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
router.get("/login/facebook", passport_1.default.authenticate("facebook", {
    scope: ["profile", "email"],
}));
router.get("/auth/facebook/callback", passport_1.default.authenticate("facebook", {
    successRedirect: process.env.FRONTEND_URL,
    failureRedirect: process.env.FRONTEND_URL + "/loginwithfacebookfailed",
}), (req, res) => {
    console.log(req.user);
    req.session.userId = req.user.id;
    res.redirect(process.env.FRONTEND_URL);
});
exports.default = router;
//# sourceMappingURL=loginWithFacebook.js.map