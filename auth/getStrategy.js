import { Strategy as StrategyGoogle } from 'passport-google-oauth20';
import { Strategy as StrategyFacebook } from 'passport-facebook';
import { Strategy as StrategyGithub } from 'passport-github2';

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
    (_accessToken, _refreshToken, profile, cb) => cb(null, profile)
  );

export default getStrategy;
