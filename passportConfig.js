const GoogleStrategy = require("passport-google-oauth2").Strategy;

const User = require("./schema/userSchema");

module.exports = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        try {
          let existingUser = await User.findOne({ "googleId" : profile.id });
          if (existingUser) {
            request.session.user = existingUser;
            return done(null, existingUser);
          }

          console.log("Creating a new user...");

          const newUser = new User({
              googleId: profile.id,
              username: profile.displayName,
              email: profile.emails[0].value,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
            
          });

          await newUser.save();
          request.session.user = newUser;
          return done(null, newUser);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};
