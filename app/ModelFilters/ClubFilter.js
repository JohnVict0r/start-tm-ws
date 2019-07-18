'use strict';

const ModelFilter = use('ModelFilter');

class ClubFilter extends ModelFilter {
  name(name) {
    return this.where('name', 'like', `%${name}%`);
  }

  federation(id) {
    return this.where('federation_id', id);
  }
}

module.exports = ClubFilter;
