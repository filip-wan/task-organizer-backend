import authorizationRouter from './authorizationRouter.js';
import categoriesRouter from './categoriesRouter.js';
import express from 'express';
import notesRouter from './notesRouter.js';
import notificationRouter from './notificationRouter.js';
import timeTablesRouter from './timeTablesRouter.js';
import todosRouter from './todosRouter.js';
import userRouter from './userRouter.js';

const router = express.Router();

router.get('/', (req, res, next) => {
  const { user } = req;
  const { calendarid } = req.headers;
  res.status(200).send({
    sessionID: req.sessionID,
    user: user?.userData,
    headers: req.headers,
    calendarid,
    query: req.query,
  });
});

[
  authorizationRouter,
  notesRouter,
  timeTablesRouter,
  notificationRouter,
  todosRouter,
  categoriesRouter,
  userRouter,
].forEach((r) => r(router));

export default router;
