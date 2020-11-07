import passport from 'passport';
import getStrategy from './getStrategy.js';

const initializeAuthorization = () => {
  passport.use(getStrategy('google'));
  passport.use(getStrategy('facebook'));
  passport.use(getStrategy('github'));

  passport.serializeUser((user, cb) => cb(null, user));
  passport.deserializeUser((obj, cb) => cb(null, obj));
};

export default initializeAuthorization;
