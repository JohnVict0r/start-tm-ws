'use strict';

const { Club, Address } = use('App/Models');
const Database = use('Database');

class ClubController {
  async index({ request }) {
    const { page, ...data } = request.all();
    return Club.query()
      .with('address')
      .filter(data)
      .paginate(page || 1, 10);
  }

  async store({ request }) {
    const { address, ...data } = request.only(Club.columns());

    const trx = await Database.beginTransaction();

    const { id: address_id } = await Address.create(address, trx);
    data.address_id = address_id;

    const club = await Club.create(data, trx);

    await trx.commit();

    return club;
  }

  async show({ params }) {
    const club = await Club.findOrFail(params.id);

    await club.loadMany(['address', 'federation']);

    return club;
  }

  async update({ params, request }) {
    const { address, ...data } = request.only(Club.columns());
    const club = await Club.findOrFail(params.id);

    club.merge(data);
    await club.save();

    return club;
  }

  async destroy({ params }) {
    const club = await Club.findOrFail(params.id);
    const address = await club.address().fetch();

    const resp = await club.delete();
    await address.delete();

    return resp;
  }
}

module.exports = ClubController;
