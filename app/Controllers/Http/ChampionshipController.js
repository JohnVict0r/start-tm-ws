const { Championship } = use('App/Models');

class ChampionshipController {
  async index() {
    const championships = await Championship.all();
    return championships;
  }

  async store({ request }) {
    const data = request.only(Championship.columns());

    const championship = await Championship.create(data);

    return championship;
  }

  async show({ params }) {
    const championship = await Championship.findOrFail(params.id);

    await championship.loadMany(['athleteInscriptions']);

    return championship;
  }

  async update({ request, params }) {
    const { tt_event_id, ...data } = request.only(Championship.columns());

    const championship = await Championship.findOrFail(params.id);

    championship.merge(data);

    await championship.save();

    return championship;
  }

  async destroy({ params }) {
    const championship = await Championship.findOrFail(params.id);

    await championship.athleteInscriptions().delete();

    return championship.delete();
  }
}

module.exports = ChampionshipController;
