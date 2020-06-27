import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

import { SECRET } from './config';

import routes from './routes';

const app = express();

app.set('trust proxy', 1);
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/static', express.static(path.resolve(__dirname, '../public')));
app.use(routes);

export default app;
