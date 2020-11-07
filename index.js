import {} from 'dotenv/config.js';
import passport from 'passport';
import express from 'express';
import expressSession from 'express-session';
import routes from './routes/index.js';
import initializeAuthorization from './auth/index.js';

const app = express();
const port = process.env.PORT || 3000;
const { SESSION_SECRET } = process.env;

initializeAuthorization();

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
