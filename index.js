import {} from 'dotenv/config.js';
import passport from 'passport';
import express from 'express';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import http from 'http';
import https from 'https';

import routes from './src/routes/index.js';
import initializeAuthorization from './src/auth/index.js';
import initializeDatabase from './src/db/index.js';

const {
  SESSION_SECRET,
  PORT,
  NODE_ENV,
  SSL,
  WEBSITE_URL,
  WEBSITE_URL_ORIGIN,
} = process.env;

const app = express();
const port = PORT ?? 3000;

initializeAuthorization();
initializeDatabase();

app.use(
  expressSession({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie:
      SSL == true
        ? {
            secure: true,
            sameSite: 'none',
          }
        : { httpOnly: true },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.enable('trust proxy');
app.use(
  cors({
    origin: WEBSITE_URL_ORIGIN || WEBSITE_URL, // allow to server to accept request from different origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow session cookie from browser to pass through
  })
);

app.use('/', routes);

NODE_ENV === 'production'
  ? app.listen(port)
  : SSL
  ? https
      .createServer(
        {
          key: fs.readFileSync('server.key'),
          cert: fs.readFileSync('server.cert'),
        },
        app
      )
      .listen(port)
  : http.createServer(app).listen(port);
