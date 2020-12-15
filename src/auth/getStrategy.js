import { Strategy as StrategyFacebook } from 'passport-facebook';
import { Strategy as StrategyGithub } from 'passport-github2';
import { Strategy as StrategyGoogle } from 'passport-google-oauth20';
import { User } from '../db/models/User.js';
import https from 'https';

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
      ...(name === 'facebook'
        ? { profileFields: ['id', 'emails', 'displayName'] }
        : {}),
    },
    async (accessToken, refreshToken, profile, done) => {
      const currentUser = await User.findOne({
        [name]: profile.id,
      });

      if (!currentUser) {
        let email = profile._json?.email;
        if (!email) {
          name === 'github' && (email = await getGithubEmail(accessToken));
          name === 'facebook' && (email = profile.emails[0].value);
        }
        const newUser = await new User({
          name: profile.displayName || profile.username,
          [name]: profile.id,
          email,
          credentials: {
            accessToken,
            refreshToken,
          },
        }).save();

        if (newUser) {
          return done(null, newUser);
        }
      } else {
        await currentUser.updateOne({
          credentials: {
            accessToken,
            refreshToken,
          },
        });
      }
      done(null, currentUser);
    }
  );

export default getStrategy;

const getGithubEmail = async (accessToken) => {
  let email = null;
  return new Promise((resolve, reject) => {
    https.get(
      {
        host: 'api.github.com',
        method: 'GET',
        path: '/user/emails',
        encoding: 'utf8',
        followRedirect: true,
        headers: {
          Authorization: `token ${accessToken}`,
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0',
        },
        muteHttpExceptions: true,
      },
      (res) => {
        let str = '';
        res.on('data', function (chunk) {
          str += chunk;
        });

        res.on('end', function () {
          const emails = JSON.parse(str);
          email = emails.find((item) => item.primary).email;
          resolve(email);
        });
        res.on('error', (err) => {
          resolve(email);
        });
      }
    );
  });
};
