'use scrict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

const { confrontPath } = use('App/Utils/ModelsPath');

class Table extends Model {
  static boot() {
    super.boot();
  }

  static columns() {
    return ['status', 'number'];
  }

  confronts() {
    return this.hasMany(confrontPath);
  }
}

module.exports = Table;
