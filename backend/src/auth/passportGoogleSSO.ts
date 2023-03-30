import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import { User } from "../entities/User";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET as string,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
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
        googleId: profile.id,
      };

      const user = await User.findOne({
        where: { googleId: profile.id },
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
