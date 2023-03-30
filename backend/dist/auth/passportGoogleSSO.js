"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const User_1 = require("../entities/User");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
}, async (_req, _accessToken, _refreshToken, profile, cb) => {
    const defaultUser = {
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        googleId: profile.id,
    };
    const user = await User_1.User.findOne({
        where: { googleId: profile.id },
    });
    if (!user) {
        const newUser = await User_1.User.create(defaultUser).save();
        return cb(null, newUser);
    }
    return cb(null, user);
}));
passport_1.default.serializeUser((user, cb) => {
    console.log("Serializing user:", user);
    cb(null, user.id);
});
passport_1.default.deserializeUser(async (id, cb) => {
    const user = await User_1.User.findOne({ where: { id } }).catch((err) => {
        console.log("Error deserializing", err);
        cb(err, null);
    });
    console.log("DeSerialized user", user);
    if (user)
        cb(null, user);
});
//# sourceMappingURL=passportGoogleSSO.js.map