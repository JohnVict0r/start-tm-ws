const { Athlete } = use('App/Models');

class AthleteController {
  async index({ request }) {
    return Athlete.query().paginate(request.input('page', 1), request.input('perPage', 10));
  }

  async show({ params }) {
    const athlete = await Athlete.findOrFail(params.id);

    await athlete.loadMany(['user', 'club', 'championshipInscriptions']);

    return athlete;
  }

  async store({ request }) {
    const data = request.only(Athlete.columns());
    return Athlete.create(data);
  }

  async update({ params, request }) {
    const { user_id, ...data } = request.only(Athlete.columns());

    const athlete = await Athlete.findOrFail(params.id);

    athlete.merge(data);

    await athlete.save();

    return athlete;
  }

  async destroy({ params }) {
    const athlete = await Athlete.findOrFail(params.id);

    // TODO quando o atleta for deletado para um usuário
    // o usuário deve perder o "role" de "[Athlete]"

    return athlete.delete();
  }
}

module.exports = AthleteController;
