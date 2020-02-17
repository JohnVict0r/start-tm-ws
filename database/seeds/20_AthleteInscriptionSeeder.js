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
const {
  Athlete, Entry, TTEvent, AthleteInscription
} = use('App/Models');
const CreateAthleteInscripionService = use('App/Services/CreateAthleteInscriptionService');


class AthleteInscriptionSeeder {
  async run() {
    const athletes_id = await Athlete.ids();
    const tt_events_id = await TTEvent.ids();
    const entries_id = await Entry.query().where({ tt_event_id: tt_events_id[0] }).pluck('id');


    const promisses = athletes_id.map(async (athlete_id) => {
      const i = Math.floor(Math.random() * entries_id.length);

      const entry_id = entries_id[i];

      const inscArray = await CreateAthleteInscripionService.run({
        tt_event_id: tt_events_id[0],
        athlete_id,
        entry_id
      });

      if (inscArray.some(insc => insc.championship_id === null)) return athlete_id;

      await AthleteInscription.createMany(inscArray);

      return athlete_id;
    });

    await Promise.all(promisses);
  }
}

module.exports = AthleteInscriptionSeeder;
