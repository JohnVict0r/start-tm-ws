'use strict';

const { Table } = use('App/Models');

class TableController {
  async index() {
    const tables = await Table.all();

    return tables;
  }

  async store({ request, params }) {
    const { tt_events_id } = params;

    const data = request.only(Table.columns());
    data.tt_event_id = tt_events_id;

    const table = await Table.create(data);

    return table;
  }

  async show({ params }) {
    const { id } = params;
    const table = await Table.findOrFail(id);

    await table.loadMany(['confronts']);

    return table;
  }

  async update({ params, request }) {
    const data = request.only(Table.columns());
    const { id } = params;

    const table = await Table.findOrFail(id);

    table.merge(data);
    await table.save();

    return table;
  }

  async destroy({ params }) {
    const { id } = params;

    const table = await Table.findOrFail(id);
    const resp = await table.delete();

    return resp;
  }
}

module.exports = TableController;
