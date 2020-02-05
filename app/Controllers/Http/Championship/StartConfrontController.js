'use strict';

const { Confront, Table } = use('App/Models');

class StartConfrontController {
  async update({ request, params }) {
    const { table_id, arbiter_name } = request.only(Confront.columns());

    const table = await Table.findByOrFail({ id: table_id, status: 'FREE' });
    const confront = await Confront.findOrFail(params.confront_id);

    confront.merge({ table_id, arbiter_name });
    table.merge({ status: 'BUSY' });

    await confront.save();
    await table.save();

    return confront;
  }
}

module.exports = StartConfrontController;
