'use strict';

const { Federation } = use('App/Models');

class FederationController {
  async index({ request }) {
    const { page, ...data } = request.all();
    return Federation.query()
      .filter(data)
      .paginate(page || 1, 10);
  }

  async store({ request }) {
    const data = request.only(Federation.columns());
    const federation = await Federation.create(data);

    return federation;
  }

  async show({ params }) {
    return Federation.findOrFail(params.id);
  }

  async update({ params, request }) {
    const data = request.only(Federation.columns());
    const federation = await Federation.findOrFail(params.id);

    federation.merge(data);
    await federation.save();

    return federation;
  }

  async destroy({ params }) {
    const federation = await Federation.findOrFail(params.id);
    return federation.delete();
  }
}

module.exports = FederationController;
