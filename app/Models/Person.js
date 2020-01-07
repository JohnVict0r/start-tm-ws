'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

const { base } = use('App/Utils/ModelsPath');
const PersonFilter = use('App/ModelFilters/PersonFilter');

class Person extends Model {
  static boot() {
    super.boot();
    this.addTrait('@provider:Filterable', PersonFilter);
  }

  static columns() {
    return ['name', 'sex', 'birth', 'cpf', 'rg', 'address'];
  }

  address() {
    return this.belongsTo(`${base}/Address`);
  }
}

module.exports = Person;
