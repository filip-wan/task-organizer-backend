import passport from 'passport';
import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
  const { user } = req;
  res.status(200).send({ body: req.sessionID, user });
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

router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get(
  '/auth/google/redirect',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res, next) => {
    res.redirect('/');
  }
);
router.get(
  '/auth/facebook/redirect',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res, next) => {
    res.redirect('/');
  }
);
router.get(
  '/auth/github/redirect',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res, next) => {
    res.redirect('/');
  }
);

export default router;
