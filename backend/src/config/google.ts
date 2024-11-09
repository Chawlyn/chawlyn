import { Strategy } from "passport-google-oauth2";
import passport from "passport";
import environment from "./env";
import { ErrorResponse } from "../utils/errorResponse";

if (!environment.CLIENT_ID || !environment.CLIENT_SECRET) {
  throw new ErrorResponse("Client ID or client Secret is missing", 500)
}

passport.use(new Strategy({
    clientID: environment.CLIENT_ID,
    clientSecret: environment.CLIENT_SECRET,
    callbackURL: 'http://localhost:4080/api/v1/auth/google/callback',
    passReqToCallback: true
  },
  async function (req: any, accessToken: string, refreshToken: string, profile: any, done: (err: any, profile: any) => void) {
    return done(null, profile)
  }
));

passport.serializeUser(function (user:any, done) {
  done(null, user);
});

passport.deserializeUser(function (user:any, done) {
  done(null, user);
})