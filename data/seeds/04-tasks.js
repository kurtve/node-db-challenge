// initial set of tasks for our initial projects

exports.seed = async knex => {
  await knex('tasks').insert([
    {
      id: 1,
      project_id: 1,
      description: 'Acheive something',
      notes: '',
      completed: false,
    },
    {
      id: 2,
      project_id: 1,
      description: 'Write it in the resume',
      notes: '',
      completed: false,
    },
    {
      id: 3,
      project_id: 1,
      description: 'Repeat',
      notes: '',
      completed: false,
    },
    {
      id: 4,
      project_id: 2,
      description: 'Create a To-Do list',
      notes: '',
      completed: true,
    },
    {
      id: 5,
      project_id: 2,
      description: 'Profit!',
      notes: '',
      completed: true,
    },
  ]);
};
