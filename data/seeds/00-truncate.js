// delete all records from initial set of tables
// delete in reverse order of how tables are populated

exports.seed = async knex => {
  await knex('tasks').truncate();
  await knex('projects_resources').truncate();
  await knex('projects').truncate();
  await knex('resources').truncate();
};
