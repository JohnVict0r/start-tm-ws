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
const { base } = use('App/Utils/ModelsPath');
const { Athlete, Championship, Federation, TTEvent } = use('App/Models');

class ChampionshipSeeder {
  async run() {
    const ttevents_id = await TTEvent.ids();
    const championship = await Factory.model(`${base}/Championship`).create({
      tt_event_id: ttevents_id[0]
    });
  }
}

module.exports = ChampionshipSeeder;
