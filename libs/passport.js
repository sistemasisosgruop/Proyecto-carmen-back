const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const UsersService = require('../services/users.services')
require('dotenv').config()

const usersService = new UsersService()

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  secretOrKey: process.env.JWT_SECRET,
}

module.exports = (passport) =>
  passport.use(
    new JwtStrategy(options, (tokenDecoded, done) => {
      usersService
        .getUser(tokenDecoded.id)
        .then((user) => {
          if (user) {
            done(null, tokenDecoded)
          } else {
            done(null, false)
          }
        })
        .catch((err) => {
          done(err, false)
        })
    })
  )
