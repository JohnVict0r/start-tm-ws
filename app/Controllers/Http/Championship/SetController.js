'use strict';

const { Set } = use('App/Models');
class SetController {
  async index({ params }) {
    return Set.query()
      .where({ confront_id: params.confronts_id })
      .fetch();
  }

  async store({ request, params }) {
    const data = request.only(Set.columns());
    data.confront_id = params.confronts_id;

    return Set.create(data);
  }

  async show({ params }) {
    return Set.findOrFail(params.id);
  }

  async update({ params, request }) {
    const set = await Set.findOrFail(params.id);
    const { confront_id, order, ...data } = request.only(Set.columns());

    set.merge(data);

    await set.save();

    return set;
  }

  async destroy({ params }) {
    const set = await Set.findOrFail(params.id);
    await set.delete();
    return set;
  }
}

module.exports = SetController;
