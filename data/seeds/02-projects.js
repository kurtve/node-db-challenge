// initial projects

exports.seed = async knex => {
  await knex('projects').insert([
    {
      id: 1,
      name: 'Online Resume',
      description: 'A web page containing my resume',
      completed: false,
    },
    {
      id: 2,
      name: 'To-Do List',
      description: 'Just like it sounds',
      completed: true,
    },
  ]);
};
