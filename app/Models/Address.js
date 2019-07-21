'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Address extends Model {
  static boot() {
    super.boot();
  }

  static columns() {
    return ['street', 'number', 'neighborhood', 'cep', 'complement', 'city', 'uf'];
  }
}

module.exports = Address;
