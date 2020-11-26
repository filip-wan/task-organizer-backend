import express from 'express';
import authorizationRouter from './authorizationRouter.js';
import notesRouter from './notesRouter.js';
import todosRouter from './todosRouter.js';
import timeTablesRouter from './timeTablesRouter.js';

const router = express.Router();

router.get('/', (req, res, next) => {
  const { user } = req;
  res.status(200).send({ sessionID: req.sessionID, user: user?.userData });
});

authorizationRouter(router);
notesRouter(router);
todosRouter(router);
timeTablesRouter(router);

export default router;
