'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class NamesSchema extends Schema {
  up () {
    this.create('names', (table) => {
      table.increments()
      table.timestamps()
      table.string('name').notNullable().unique()
    })
  }

  down () {
    this.drop('names')
  }
}

module.exports = NamesSchema
