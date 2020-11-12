import express from 'express';
import authorizationRouter from './authorizationRouter.js';
import notesRouter from './notesRouter.js';

const router = express.Router();

router.get('/', (req, res, next) => {
  const { user } = req;
  res.status(200).send({ sessionID: req.sessionID, user });
});

authorizationRouter(router);
notesRouter(router);

export default router;
