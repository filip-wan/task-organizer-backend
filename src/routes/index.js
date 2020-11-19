import express from 'express';
import authorizationRouter from './authorizationRouter.js';
import notesRouter from './notesRouter.js';
import todosRouter from './todosRouter.js';

const router = express.Router();

router.get('/', (req, res, next) => {
  const { user } = req;
  res.status(200).send({ sessionID: req.sessionID, user });
});

authorizationRouter(router);
notesRouter(router);
todosRouter(router);

export default router;
