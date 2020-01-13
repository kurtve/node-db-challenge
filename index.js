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

// GET endpoints: get a list of all resources, projects or tasks

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

server.get('/api/tasks', async (req, res, next) => {
  try {
    // get all tasks from the database
    // include the project name and description
    const tasks = await db('tasks as t')
      .leftJoin('projects as p', 't.project_id', 'p.id')
      .select(
        't.id',
        't.description',
        't.notes',
        't.completed',
        'p.name as project_name',
        'p.description as project_description'
      );
    // convert completed from 0/1 to false/true
    const cleaned = tasks.map(task => ({
      ...task,
      completed: !!task.completed,
    }));
    res.json(cleaned);
  } catch (err) {
    next(err);
  }
});

server.get('/api/projects_resources', async (req, res, next) => {
  try {
    // get all project-resource associations from the database
    // include the project name and resource name
    // (wasn't asked for, but nice to have for debugging the database)
    const projects_resources = await db('projects_resources as pr')
      .leftJoin('projects as p', 'pr.project_id', 'p.id')
      .leftJoin('resources as r', 'pr.resource_id', 'r.id')
      .select(
        'pr.project_id',
        'p.name as project_name',
        'pr.resource_id',
        'r.name as resource_name'
      );
    res.json(projects_resources);
  } catch (err) {
    next(err);
  }
});

// more GET endpoints: get a specific resource, project, or task

// POST endpoints: add a resource, project, or task

server.post('/api/resources', async (req, res, next) => {
  try {
    // create a resource
    // ignore anything in the body that doesn't fit the model
    const newResource = {
      name: req.body.name,
      description: req.body.description,
    };
    const [id] = await db('resources').insert(newResource);

    // fetch the newly created resource
    const resource = await db('resources')
      .where({ id })
      .first();

    // and return it to the caller
    res.status(201).json(resource);
  } catch (err) {
    next(err);
  }
});

server.post('/api/projects', async (req, res, next) => {
  try {
    // create a project
    // ignore anything in the body that doesn't fit the model.
    // convert 'completed' field to 0/1 values
    const newProject = {
      name: req.body.name,
      description: req.body.description,
      completed: req.body.completed === 'true' ? 1 : 0,
    };
    const [id] = await db('projects').insert(newProject);

    // fetch the newly created resource
    const project = await db('projects')
      .where({ id })
      .first();

    // and return it to the caller, with 'completed' field converted to boolean
    res.status(201).json({ ...project, completed: !!project.completed });
  } catch (err) {
    next(err);
  }
});

// DELETE endpoints: remove a resource, project, or task

// PUT endpoints: update a resource, project, or task

// start the server
server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
