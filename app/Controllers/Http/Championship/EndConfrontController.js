'use strict';

const { Confront, Table } = use('App/Models');

class EndConfrontController {
  async update({ params }) {
    const confront = await Confront.findOrFail(params.confront_id);
    const table = await Table.findOrFail(confront.table_id);

    table.merge({ status: 'FREE' });
    confront.merge({ finalized: true });

    await confront.save();
    await table.save();

    return confront;
  }
}

module.exports = EndConfrontController;
