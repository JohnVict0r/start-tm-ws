'use strict';

const { Address } = use('App/Models');

class AddressController {
  async update({ request, params }) {
    const data = request.only(Address.columns());

    const address = await Address.findOrFail(params.id);

    address.merge(data);

    await address.save();

    return address;
  }
}

module.exports = AddressController;
