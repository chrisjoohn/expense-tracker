const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const UserModel = require("../models/user");

passport.use(
  new LocalStrategy({ usernameField: "email", password: "password" }, function (
    username,
    password,
    done
  ) {
    UserModel.findOne({ email: username }, function (err, user) {
      if (err) return done(err, false);
      if (!user) return done(null, false);

      user.comparePassword(password, function (err, isMatch) {
        if (err) return done(err, false);
        if (!isMatch) return done(null, false);
        return done(null, user);
      });
    });
  })
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "TOKEN_SECRET_KEY",
    },
    function (tokenPayload, done) {
      const { id } = tokenPayload;
      UserModel.findById(id, function (err, user) {
        console.log(err);
        if (err) return done(err, false);
        if (!user) return done(null, false);
        return done(null, user);
      });
    }
  )
);


module.exports = passport;

