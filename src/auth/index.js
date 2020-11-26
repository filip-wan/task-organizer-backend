import passport from 'passport';
import getStrategy from './getStrategy.js';
import { User } from '../db/models/User.js';

const initializeAuthorization = () => {
  passport.use(getStrategy('google'));
  passport.use(getStrategy('facebook'));
  passport.use(getStrategy('github'));

  passport.serializeUser((user, done) => done(null, user._id));

  passport.deserializeUser((id, done) =>
    User.findById(id)
      .then((user) => user.toObject())
      .then(({ credentials, ...userData }) => {
        done(null, { credentials, userData, id: userData._id });
      })
      .catch((e) => {
        done(new Error('Failed to deserialize an user'));
      })
  );
};

export default initializeAuthorization;
