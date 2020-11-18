import {} from 'dotenv/config.js';
import passport from 'passport';
import express from 'express';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';

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

app.use(bodyParser.json());
app.use(
  cors({
    origin: 'http://localhost:3000', // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use('/', routes);

app.listen(port);
