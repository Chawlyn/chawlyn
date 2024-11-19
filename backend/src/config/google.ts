// src/config/passport.ts
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { comparePassword } from '../utils/hash';
import User from '../models/user';
import environment from './env';

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email:string, password:string, done:any) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'Invalid credentials' });
    }

    const isMatch = await comparePassword(password, user.password!);
    if (!isMatch) {
      return done(null, false, { message: 'Invalid credentials' });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.use(new GoogleStrategy({
  clientID: environment.CLIENT_ID!,
  clientSecret: environment.CLIENT_SECRET!,
  callbackURL: 'http://localhost:4080/api/v1/auth/google/callback',
},
async (token: string, tokenSecret: string, profile: any, done: any) => {
  try {
    console.log('Google profile:', profile); // Logging to check profile data

    let user = await User.findOne({ googleId: profile.id });

    if (user) {
      return done(null, user);
    } else {
      user = new User({
        googleId: profile.id,
        email: profile.emails?.[0].value,
        username: profile.displayName || "Anonymous",
        emailVerifies: profile.emailVerified
      });

      await user.save();
      return done(null, user);
    }
  } catch (error) {
    console.error('Error during Google authentication:', error);
    return done(error); // Pass error to Passport's done callback
  }
}));

export default passport;