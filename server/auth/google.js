const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth20').Strategy
const {User} = require('../db/models')
module.exports = router
const keys = require('./keys.json')

if (!keys.GOOGLE_CLIENT_ID || !keys.GOOGLE_CLIENT_SECRET) {
  console.log('Google client ID / secret not found. Skipping Google OAuth.')
} else {
  const googleConfig = {
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: keys.GOOGLE_CALLBACK
  }

  const strategy = new GoogleStrategy(
    googleConfig,
    (token, refreshToken, profile, done) => {
      console.log(profile)
      const googleId = profile.id
      const email = profile.emails[0].value
      const imageURL = profile.photos[0].value
      const firstName = profile.name.givenName
      const lastName = profile.name.familyName
      const fullName = profile.displayName

      User.findOrCreate({
        where: {googleId},
        defaults: {email, imageURL, firstName, lastName, fullName}
      })
        .then(([user]) => done(null, user))
        .catch(done)
    }
  )

  passport.use(strategy)

  router.get(
    '/',
    passport.authenticate('google', {scope: ['email', 'profile']})
  )

  router.get(
    '/callback',
    passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login'
    })
  )
}
