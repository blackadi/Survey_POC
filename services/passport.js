const passport = require("passport"); //Give express how to handle authentication
const GoogleStrategy = require("passport-google-oauth20").Strategy; //instract password on how to authenticate our user's usign google oauth 2.0
const mongoose = require("mongoose");
const keys = require("../config/keys");

//Since we are using mongoose lib to import model from another file we will use diffrent technique otherwise mongoose will thing that we are trying to load that models more that one time for more info check video 9 'Saving Model Instances'
const User = mongoose.model("users");

//we will make use of passport tocreate a cookie from serilazie the user, this code will encode the user data
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//we will create a function to extract (deserialize) the data which we stuffed in the cookie;
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecrect,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      // console.log("accessToken: " , accessToken);
      // console.log("refreshToken: " , refreshToken);
      // console.log("profile: " , profile);
      // console.log("done: " , done);

      //Lock throughout the user collection and find the first record inside that collection with googleId matches the gooleId fetch from google oauth
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        //We already have a recod with the given googleId
        console.log("YEPPPPPPPPPPPP User exist");
        done(null, existingUser);
      } else {
        //if no record is found then create a new one
        const user = await new User({ googleId: profile.id }).save();
        done(null, user);
      }
    }
  )
);
