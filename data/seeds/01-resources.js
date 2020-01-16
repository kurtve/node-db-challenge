// initial resources

exports.seed = async knex => {
  await knex('resources').insert([
    { id: 1, name: 'Google', description: 'General-purpose search engine' },
    { id: 2, name: 'Trello', description: 'A project-planning board app' },
    { id: 3, name: 'Figma', description: 'A collaberative design tool' },
  ]);
};
