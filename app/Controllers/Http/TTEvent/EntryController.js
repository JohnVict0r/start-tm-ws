'use strict';

const { Entry } = use('App/Models');
class EntryController {
  async index({ params }) {
    return Entry.query().where({ tt_event_id: params.tt_events_id }).fetch();
  }

  async store({ request, params }) {
    const data = request.only(Entry.columns());
    data.tt_event_id = params.tt_events_id;

    const entry = await Entry.create(data);

    return entry;
  }

  async show({ params }) {
    return Entry.query().where({ id: params.id }).first();
  }

  async update({ params, request }) {
    const { tt_event_id, ...data } = request.only(Entry.columns());

    const entry = await Entry.findOrFail(params.id);

    entry.merge(data);
    await entry.save();

    return entry;
  }

  async destroy({ params }) {
    const entry = await Entry.findOrFail(params.id);

    return entry.delete();
  }
}

module.exports = EntryController;
