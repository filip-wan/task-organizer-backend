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
      .then((user) => {
        done(null, user);
      })
      .catch((e) => {
        done(new Error('Failed to deserialize an user'));
      })
  );
};

export default initializeAuthorization;
