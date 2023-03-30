"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_facebook_1 = require("passport-facebook");
const User_1 = require("../entities/User");
console.log("using", process.env.FACEBOOK_OAUTH_CLIENT_ID, process.env.FACEBOOK_OAUTH_SECRET, process.env.FACEBOOK_CALLBACK_URL);
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: process.env.FACEBOOK_OAUTH_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_OAUTH_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    passReqToCallback: true,
    profileFields: ["id", "displayName", "photos", "email"],
}, async (_req, _accessToken, _refreshToken, profile, cb) => {
    const defaultUser = {
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        facebookId: profile.id,
    };
    const user = await User_1.User.findOne({
        where: { facebookId: profile.id },
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
//# sourceMappingURL=passportFacebookSSO.js.map