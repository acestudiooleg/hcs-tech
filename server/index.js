import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';

import modules from './modules';
import { port, db } from './config';

mongoose.promise = global.Promise;

mongoose.connect(
  db.uri,
  db.options,
);
mongoose.set('debug', true);

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'passport-tutorial',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false,
}));

modules.forEach(connectModule => connectModule(app));

app.use('/', express.static(`${__dirname}/../dist`));

// Error handlers & middlewares
app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: err,
    },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
