'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

const { base } = use('App/Utils/ModelsPath');

class Person extends Model {
  static boot() {
    super.boot();
  }

  static columns() {
    return ['name', 'sex', 'birth', 'cpf', 'rg', 'address', 'user_id'];
  }

  user() {
    return this.belongsTo(`${base}/User`);
  }

  address() {
    return this.belongsTo(`${base}/Address`);
  }
}

module.exports = Person;
