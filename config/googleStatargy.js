import {Strategy as GoogleStrategy} from 'passport-google-oauth20'

const GoogleStrategyConfig = (passport) => {

    // console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
    //  console.log('GOOGLE_SECRET:', process.env.GOOGLE_SECRECT);



  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRECT, // ensure this is your correct secret variable
      callbackURL: 'https://passport-js-auth.onrender.com/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      // Instead of storing to a database, simply pass the profile to the callback.
      //console.log('Google profile:', profile);
      return done(null, profile);
    }
  ));

  // Serialize the whole user object into the session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // Deserialize the user object out of the session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};

export default GoogleStrategyConfig
