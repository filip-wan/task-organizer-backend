import express from 'express';
import routerAuthorization from './routerAuthorization.js';

const router = express.Router();

router.get('/', (req, res, next) => {
  const { user } = req;
  res.status(200).send({ sessionID: req.sessionID, user });
});

routerAuthorization(router);

export default router;
