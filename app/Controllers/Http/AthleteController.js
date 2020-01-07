const { Athlete } = use('App/Models');
const Database = use('Database');

class AthleteController {
  async index({ request }) {
    const { page, ...data } = request.all();
    return Athlete.query()
      .filter(data)
      .paginate(page || 1, 10);
  }

  async show({ params }) {
    const athlete = await Athlete.findOrFail(params.id);

    await athlete.loadMany(['person', 'club', 'championshipInscriptions']);

    return athlete;
  }

  async store({ request }) {
    const data = request.only(Athlete.columns());
    return Athlete.create(data);
  }

  async update({ params, request }) {
    const { person_id, ...data } = request.only(Athlete.columns());

    const athlete = await Athlete.findOrFail(params.id);

    athlete.merge(data);

    await athlete.save();

    return athlete;
  }

  async destroy({ params }) {
    const athlete = await Athlete.findOrFail(params.id);

    return athlete.delete();
  }
}

module.exports = AthleteController;
