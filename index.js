import {} from 'dotenv/config.js';
import passport from 'passport';
import express from 'express';
import expressSession from 'express-session';

import routes from './src/routes/index.js';
import initializeAuthorization from './src/auth/index.js';
import initializeDatabase from './src/db/index.js';

const { SESSION_SECRET, PORT } = process.env;

const app = express();
const port = PORT ?? 3000;

initializeAuthorization();
initializeDatabase();

app.use(
  expressSession({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);

app.listen(port);
