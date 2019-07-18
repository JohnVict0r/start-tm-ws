'use strict';

const Database = use('Database');
const ModelFilter = use('ModelFilter');

class UserFilter extends ModelFilter {
  email(email) {
    return this.where('email', 'like', `%${email}%`);
  }

  hasAthlete(hasAthlete) {
    const subquery = Database.from('athletes').select('user_id');

    if (parseInt(hasAthlete, 10)) return this.whereIn('id', subquery);

    return this.whereNotIn('id', subquery);
  }
}

module.exports = UserFilter;
