// Initial table structure

// Four tables needed for out Project Manager system:
// (will be created in this order)
// resources - one record per resource
// projects - one record per project
//   (projects can use multiple resources and a resource
//    can be used by more than one project)
// projects_resources - one record per project/resource pairing
// tasks - one record per task.  there can be multiple tasks
//   per project, but each task belongs to only one project

exports.up = async function(knex) {
  // resources table
  await knex.schema.createTable('resources', table => {
    table.increments('id');
    table
      .string('name')
      .notNullable()
      .unique();
    table.string('description');
  });

  // projects table
  await knex.schema.createTable('projects', table => {
    table.increments('id');
    table.string('name').notNullable();
    table.string('description');
    table
      .boolean('completed')
      .notNullable()
      .defaultTo(false);
  });

  // projects_resources table
  // links projects and resources tables in many-many relationship
  await knex.schema.createTable('projects_resources', table => {
    table
      .integer('project_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .integer('resource_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('resources')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    // create primary key - force each project_id/resource_id combo to be unique
    table.primary(['project_id', 'resource_id']);
  });

  // tasks table
  // each task is linked to exactly one project in the projects table
  await knex.schema.createTable('tasks', table => {
    table.increments('id');
    table
      .integer('project_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('projects')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.string('description').notNullable();
    table.string('notes');
    table
      .boolean('completed')
      .notNullable()
      .defaultTo(false);
  });
};

// drop tables in the reverse order of how they were created
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('tasks');
  await knex.schema.dropTableIfExists('projects_resources');
  await knex.schema.dropTableIfExists('projects');
  await knex.schema.dropTableIfExists('resources');
};
