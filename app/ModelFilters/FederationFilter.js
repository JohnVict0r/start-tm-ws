'use strict';

const ModelFilter = use('ModelFilter');

class FederationFilter extends ModelFilter {
  name(name) {
    return this.where('name', 'like', `%${name}%`);
  }

  initials(initials) {
    return this.where('initials', 'like', `%${initials}%`);
  }

  uf(uf) {
    return this.where('uf', 'like', `%${uf}%`);
  }
}

module.exports = FederationFilter;
