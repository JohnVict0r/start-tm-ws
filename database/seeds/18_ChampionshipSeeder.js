'use strict';

/*
|--------------------------------------------------------------------------
| ChampionshipSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const { championshipPath } = use('App/Utils/ModelsPath');
const { TTEvent } = use('App/Models');

class ChampionshipSeeder {
  async run() {
    const ttevents_id = await TTEvent.ids();
    const championship = await Factory.model(championshipPath).create({
      tt_event_id: ttevents_id[0]
    });
  }
}

module.exports = ChampionshipSeeder;
