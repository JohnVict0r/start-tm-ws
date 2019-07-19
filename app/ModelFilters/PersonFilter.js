'use strict';

const ModelFilter = use('ModelFilter');

class PersonFilter extends ModelFilter {
  name(name) {
    return this.where('name', 'like', `%${name}%`);
  }

  sex(sex) {
    return this.where({ sex });
  }

  birth(birth) {
    return this.where({ birth });
  }

  cpf(cpf) {
    return this.where({ cpf });
  }

  rg(rg) {
    return this.where({ rg });
  }

  user(user_id) {
    return this.where({ user_id });
  }
}

module.exports = PersonFilter;
