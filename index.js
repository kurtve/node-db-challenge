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

// GET methods: get a list of all resources, projects or tasks

server.get('/api/resources', async (req, res, next) => {
  try {
    // get all resources from the database
    const resources = await db('resources');
    res.json(resources);
  } catch (err) {
    next(err);
  }
});

server.get('/api/projects', async (req, res, next) => {
  try {
    // get all projects from the database
    const projects = await db('projects');
    // convert completed from 0/1 to false/true
    const cleaned = projects.map(proj => ({
      ...proj,
      completed: !!proj.completed,
    }));
    res.json(cleaned);
  } catch (err) {
    next(err);
  }
});

// start the server
server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
