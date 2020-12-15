import passport from 'passport';

const authorizationRouter = (router) => {
  const { WEBSITE_URL } = process.env;

  router.get('/auth', (req, res) => {
    res.json(
      req.user
        ? {
            success: true,
            message: 'user has successfully authenticated',
            user: req.user.userData,
            credentials: req.user.credentials,
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
    passport.authenticate('google', {
      scope: [
        'profile',
        'email',
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events',
      ],
    })
  );

  router.get(
    '/auth/facebook',
    passport.authenticate('facebook', { scope: ['email'] })
  );

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
