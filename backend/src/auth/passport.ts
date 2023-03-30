import passport from "passport";
import passportJwt from "passport-jwt";
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
import { User } from "../entities/User";

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    function (jwtPayload: { id: number }, done: any) {
      return User.findOne({ where: { id: jwtPayload.id } })
        .then((user: any) => {
          return done(null, user);
        })
        .catch((err: any) => {
          return done(err);
        });
    }
  )
);
