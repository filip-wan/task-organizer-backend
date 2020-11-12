import passport from 'passport';

const authorizationRouter = (router) => {
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
      res.redirect('/');
    }
  );

  router.get(
    '/auth/facebook/redirect',
    passport.authenticate('facebook', { failureRedirect: '/' }),
    (_req, res) => {
      res.redirect('/');
    }
  );
  router.get(
    '/auth/github/redirect',
    passport.authenticate('github', { failureRedirect: '/' }),
    (_req, res) => {
      res.redirect('/');
    }
  );

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};

export default authorizationRouter;
