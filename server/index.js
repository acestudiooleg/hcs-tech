import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
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

modules.forEach(connectModule => connectModule(app));

app.use('/', express.static(`${__dirname}/../dist`));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.sendStatus(404);
});

// error handler
app.use((err, req, res, next) => {
  console.log(err);

  // render the error page
  res.sendStatus(err.status || 500);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
