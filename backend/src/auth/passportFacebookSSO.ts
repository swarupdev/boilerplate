import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";

import { User } from "../entities/User";

console.log(
  "using",
  process.env.FACEBOOK_OAUTH_CLIENT_ID,
  process.env.FACEBOOK_OAUTH_SECRET,
  process.env.FACEBOOK_CALLBACK_URL
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_OAUTH_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_OAUTH_SECRET as string,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL as string,
      passReqToCallback: true,
      profileFields: ["id", "displayName", "photos", "email"],
    },
    async (
      _req: any,
      _accessToken: string,
      _refreshToken: string,
      profile: any,
      cb: any
    ) => {
      const defaultUser = {
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
        facebookId: profile.id,
      };

      const user = await User.findOne({
        where: { facebookId: profile.id },
      });

      if (!user) {
        const newUser = await User.create(defaultUser).save();
        return cb(null, newUser);
      }

      return cb(null, user);
    }
  )
);

passport.serializeUser((user: any, cb: any) => {
  console.log("Serializing user:", user);
  cb(null, user.id);
});

passport.deserializeUser(async (id: number, cb: any) => {
  const user = await User.findOne({ where: { id } }).catch((err: any) => {
    console.log("Error deserializing", err);
    cb(err, null);
  });

  console.log("DeSerialized user", user);

  if (user) cb(null, user);
});
