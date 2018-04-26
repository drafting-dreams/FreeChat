import express from 'express';
import path from 'path';

/* eslint-disable no-console */

const port = 3000;
const app = express();

app.use(express.static('dist'));
app.use('/static', express.static(path.join(__dirname, '../src/static')));

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../dist/index.html'));
});

app.listen(port);
