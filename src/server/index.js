import express from 'express';
import config from './config';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/hello', (req, res) => {
  res.send('Hello World API!');
});


app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}!`);
});
