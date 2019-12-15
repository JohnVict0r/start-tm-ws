'use strict';

const { AthleteInscription } = use('App/Models');

class AthleteInscriptionController {
  async index() {
    const inscriptions = await AthleteInscription.all();
    return inscriptions;
  }

  async store({ request, params }) {
    const { championships_id } = params;

    const data = request.only(AthleteInscription.columns());
    data.championship_id = championships_id;
    data.approved = true;

    const inscription = await AthleteInscription.create(data);

    return inscription;
  }

  async show({ params }) {
    const athleteInscription = await AthleteInscription.findOrFail(params.id);

    await athleteInscription.loadMany(['championship', 'athlete']);

    return athleteInscription;
  }

  async update({ params, request }) {
    const {
 championship_id, approved, athlete_id, ...data 
} = request.only(
      AthleteInscription.columns()
    );

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
