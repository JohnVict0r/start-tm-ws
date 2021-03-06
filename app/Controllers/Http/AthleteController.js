const { Athlete, Person } = use('App/Models');
const Database = use('Database');

class AthleteController {
  async index({ request }) {
    const { page, ...data } = request.all();
    return Athlete.query()
      .filter(data)
      .with('person')
      .paginate(page || 1, 10);
  }

  async show({ params }) {
    const athlete = await Athlete.findOrFail(params.id);

    await athlete.loadMany(['person', 'club', 'athleteInscriptions']);

    return athlete;
  }

  async store({ request }) {
    const data = request.only(Athlete.columns());
    const person = request.input('person');

    const trx = await Database.beginTransaction();

    const { id: person_id } = await Person.create(person, trx);
    data.person_id = person_id;

    const athlete = await Athlete.create(data, trx);

    await trx.commit();

    return athlete;
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
