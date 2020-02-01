'use strict';

/*
|--------------------------------------------------------------------------
| AthleteInscriptionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const { base } = use('App/Utils/ModelsPath');
const { Athlete, Championship } = use('App/Models');

class AthleteInscriptionSeeder {
  async run() {
    const athletes_id = await Athlete.ids();
    const championships_id = await Championship.ids();
    const inscriptions = await Factory.model(
      `${base}/Championship/AthleteInscription`
    ).makeMany(athletes_id.length, { championships_id });
    const result = inscriptions.map(async (ins, index) => {
      ins.athlete_id = athletes_id[index];
      await ins.save();
      return ins;
    });
    await Promise.all(result);
  }
}

module.exports = AthleteInscriptionSeeder;
