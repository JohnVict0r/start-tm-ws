'use strict';

/*
|--------------------------------------------------------------------------
| TableSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const { TTEvent } = use('App/Models');
const { tteventPath, tablePath } = use('App/Utils/ModelsPath');

class TableSeeder {
  async run() {
    const ttevents_id = await TTEvent.ids();
    const tables = Factory.model(tablePath).createMany(15, {
      tt_event_id: ttevents_id[0]
    });
  }
}

module.exports = TableSeeder;
