'use strict';

const { Set } = use('App/Models');
class SetController {
  async index({ params }) {
    return Set.query()
      .where({ confront_id: params.confronts_id })
      .fetch();
  }

  async store({ request, params }) {
    const { order, ...data } = request.only(Set.columns());

    const setsAmount = await Set.query()
      .where({
        confront_id: params.confronts_id
      })
      .getCount();

    data.confront_id = params.confronts_id;
    data.order = setsAmount + 1;

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
