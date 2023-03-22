"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const web_push_1 = __importDefault(require("web-push"));
const sendNotification = async (subscription, message) => {
    const payload = message;
    const options = {
        gcmAPIKey: process.env.GCM_API_KEY,
        TTL: 60,
    };
    web_push_1.default.setVapidDetails('mailto:' + process.env.VAPID_MAIL_TO, process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
    return web_push_1.default.sendNotification(subscription, payload, options);
};
exports.sendNotification = sendNotification;
//# sourceMappingURL=sendNotification.js.map