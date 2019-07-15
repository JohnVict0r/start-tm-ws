'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Subscription extends Model {
  static boot() {
    super.boot();
  }

  static columns() {
    return ['username', 'email', 'password', 'redirect_url'];
  }
}

module.exports = Subscription;
