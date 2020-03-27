const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const  opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      User.findById(jwt_payload.id, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              return done(null, user);
          } else {
              return done(null, false);
              // or you could create a new account
          }
      });
  }));
}
