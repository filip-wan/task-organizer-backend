import { Strategy as StrategyGoogle } from 'passport-google-oauth20';
import { Strategy as StrategyFacebook } from 'passport-facebook';
import { Strategy as StrategyGithub } from 'passport-github2';
import { User } from '../db/models/User.js';

const strategy = {
  google: StrategyGoogle,
  facebook: StrategyFacebook,
  github: StrategyGithub,
};

const getStrategy = (name) =>
  new strategy[name](
    {
      clientID: process.env[name.toUpperCase() + '_CLIENT_ID'],
      clientSecret: process.env[name.toUpperCase() + '_CLIENT_SECRET'],
      callbackURL: `/auth/${name}/redirect`,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      const currentUser = await User.findOne({
        [name]: profile.id,
      });

      if (!currentUser) {
        const newUser = await new User({
          name: profile.displayName || profile.username,
          [name]: profile.id,
        }).save();

        if (newUser) {
          return done(null, newUser);
        }
      }
      done(null, currentUser);
    }
  );

export default getStrategy;
