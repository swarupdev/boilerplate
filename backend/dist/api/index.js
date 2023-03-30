"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginWithGoogle_1 = __importDefault(require("./loginWithGoogle"));
const loginWithFacebook_1 = __importDefault(require("./loginWithFacebook"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send("Hello from api");
});
router.use(loginWithFacebook_1.default);
router.use(loginWithGoogle_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map