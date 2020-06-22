const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const api = require('./api');
const PORT = 5000;

app.use(cors());

const server = http.createServer(app);

app.use('/api', api);

server.listen(PORT, () => {
  console.log('server start');
});