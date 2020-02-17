'use strict';

const { AthleteInscription } = use('App/Models');
const CreateAthleteInscriptionService = use(
  'App/Services/CreateAthleteInscriptionService'
);
class AthleteInscriptionController {
  async index({ request }) {
    const { page, ...data } = request.all();
    return AthleteInscription.query()
      .filter(data)
      .paginate(page || 1, 10);
  }

  async store({ request, params }) {
    const data = request.only(AthleteInscription.columns());
    const athlInscriptionsArray = await CreateAthleteInscriptionService.run({
      athlete_id: data.athlete_id,
      entry_id: data.entry_id,
      tt_event_id: params.tt_events_id
    });

    const athlInscription = await AthleteInscription.createMany(athlInscriptionsArray);

    return athlInscription;
  }

  async show({ params }) {
    const athleteInscription = await AthleteInscription.findOrFail(params.id);

    await athleteInscription.loadMany(['championship', 'athlete', 'entry']);

    return athleteInscription;
  }

  async update({ params, request }) {
    const {
      championship_id,
      approved,
      athlete_id,
      entry_id,
      ...data
    } = request.only(AthleteInscription.columns());

    const athleteInscription = await AthleteInscription.findOrFail(params.id);

    athleteInscription.merge(data);

    await athleteInscription.save();

    return athleteInscription;
  }

  async destroy({ params }) {
    const athleteInscription = await AthleteInscription.findOrFail(params.id);

    const resp = await athleteInscription.delete();

    return resp;
  }
}

module.exports = AthleteInscriptionController;
