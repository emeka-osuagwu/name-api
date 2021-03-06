'use strict'

/*
|--------------------------------------------------------------------------
| NameSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class NameSeeder {
    async run () {
        const user = await Factory.model('App/Models/Name').createMany(5)
    }
}

module.exports = NameSeeder
