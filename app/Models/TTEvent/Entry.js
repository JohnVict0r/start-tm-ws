/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

const { tteventPath } = use('App/Utils/ModelsPath');

class Entry extends Model {
  static boot() {
    super.boot();
  }

  static columns() {
    return ['tt_event_id', 'price', 'type'];
  }

  ttevent() {
    return this.belongsTo(tteventPath);
  }
}

module.exports = Entry;
