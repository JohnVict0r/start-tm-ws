'use strict';

const { TTEvent, Address } = use('App/Models');
const Database = use('Database');

class TTEventController {
  async index({ request }) {
    const { page, ...data } = request.all();
    return TTEvent.query()
      .filter(data)
      .paginate(page || 1, 10);
  }

  async store({ request }) {
    const {
      address, entries, championships, tables, ...data
    } = request.only(TTEvent.columns());

    const trx = await Database.beginTransaction();

    const { id: address_id } = await Address.create(address, trx);
    data.address_id = address_id;

    const ttevent = await TTEvent.create(data, trx);
    await ttevent.entries().createMany(entries, trx);
    await ttevent.championships().createMany(championships, trx);
    await ttevent.tables().createMany(tables, trx);

    await trx.commit();

    return ttevent;
  }

  async show({ params }) {
    const ttevent = await TTEvent.findOrFail(params.id);
    await ttevent.loadMany(['owner', 'address', 'entries', 'championships', 'tables']);
    return ttevent;
  }

  async update({ params, request }) {
    const {
      address, entries, championships, tables, ...data
    } = request.only(TTEvent.columns());

    const ttevent = await TTEvent.findOrFail(params.id);

    ttevent.merge(data);

    await ttevent.save();
    return ttevent;
  }

  async destroy({ params }) {
    const ttevent = await TTEvent.findOrFail(params.id);
    const address = await TTEvent.address().fetch();

    await ttevent.entries().delete();
    await ttevent.championships().delete();
    await ttevent.tables().delete();
    await address.delete();

    return ttevent.delete();
  }
}

module.exports = TTEventController;
