import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

import modules from './modules';
import { port, db } from './config';

// Promisify all methods of mongoose
mongoose.promise = global.Promise;

mongoose.connect(
  db.uri,
  db.options,
);
mongoose.set('debug', db.debug);

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// connect modules (routes, controllers, modules)
modules.forEach(connectModule => connectModule(app));

// render frontend application
app.use('/', express.static(`${__dirname}/../dist`));

// catch 404 and forward to error handler
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => res.sendStatus(404));

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err);

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
