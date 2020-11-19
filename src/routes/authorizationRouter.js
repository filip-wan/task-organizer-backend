import passport from 'passport';
import { secured } from './secured.js';

const authorizationRouter = (router) => {
  const { WEBSITE_URL } = process.env;

  router.get('/auth', (req, res) => {
    res.json(
      req.user
        ? {
            success: true,
            message: 'user has successfully authenticated',
            user: req.user,
            cookies: req.cookies,
          }
        : {
            success: false,
            message: 'user is not authenticated',
          }
    );
  });

  router.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile'] })
  );

  router.get('/auth/facebook', passport.authenticate('facebook'));

  router.get(
    '/auth/github',
    passport.authenticate('github', {
      scope: ['user:email'],
    })
  );

  router.get(
    '/auth/:type/redirect',
    (req, ...res) =>
      passport.authenticate(req.params.type, { failureRedirect: '/' })(
        req,
        ...res
      ),
    (_req, res) => {
      res.redirect(WEBSITE_URL || '/');
    }
  );

  router.get('/logout', (req, res) => {
    req.logout();
    res.status(204).send();
  });
};

export default authorizationRouter;
