'use strict';

const { Person, Address } = use('App/Models');
const Database = use('Database');

class PersonController {
  async index({ request }) {
    const { page, ...data } = request.all();
    return Person.query()
      .filter(data)
      .paginate(page || 1, 10);
  }

  async store({ request }) {
    const { address, ...data } = request.only(Person.columns());

    const trx = await Database.beginTransaction();

    const { id: address_id } = await Address.create(address, trx);
    data.address_id = address_id;

    const person = await Person.create(data, trx);

    await trx.commit();

    return person;
  }

  async show({ params }) {
    const person = await Person.findOrFail(params.id);

    await person.loadMany(['address', 'user']);

    return person;
  }

  async update({ params, request }) {
    const { address, user_id, ...data } = request.only(Person.columns());

    const person = await Person.findOrFail(params.id);

    person.merge(data);

    await person.save();

    return person;
  }

  async destroy({ params }) {
    const person = await Person.findOrFail(params.id);
    const address = await person.address().fetch();

    await address.delete();
    return person.delete();
  }
}

module.exports = PersonController;
