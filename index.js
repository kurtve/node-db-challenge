// initialize the express server and start it up

const express = require('express');
const helmet = require('helmet');
const db = require('./data/db-config.js');

const server = express();
const port = process.env.PORT || 5000;

server.use(helmet());
server.use(express.json());

// proof of life!
server.get('/', (req, res, next) => {
  try {
    res.json({ message: `ProjectManager server is alive on port ${port}` });
  } catch (err) {
    next(err);
  }
});

// start the server
server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
