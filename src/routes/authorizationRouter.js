import passport from 'passport';
import { secured } from './secured.js';

const authorizationRouter = (router) => {
  router.get('/auth', secured, (req, res) => {
    console.log(req);
    res.json({
      success: true,
      message: 'user has successfully authenticated',
      user: req.user,
      cookies: req.cookies,
    });
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
    '/auth/google/redirect',
    passport.authenticate('google', { failureRedirect: '/' }),
    (_req, res) => {
      res.redirect('http://localhost:3000/');
    }
  );

  router.get(
    '/auth/facebook/redirect',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (_req, res) => {
      res.redirect('http://localhost:3000/');
    }
  );
  router.get(
    '/auth/github/redirect',
    passport.authenticate('github', { failureRedirect: '/' }),
    (_req, res) => {
      res.redirect('http://localhost:3000/');
    }
  );

  router.get('/logout', (req, res) => {
    req.logout();
    res.status(204).send();
  });
};

export default authorizationRouter;
