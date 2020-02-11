'use strict';

const ModelFilter = use('ModelFilter');
const Database = use('Database');
class AthleteInscriptionFilter extends ModelFilter {
  event(tt_event_id) {
    const champSubquery = Database.from('championships')
      .select('id')
      .where({ tt_event_id });
    const athlInsSubquery = Database.from('athlete_inscriptions')
      .select('id')
      .whereIn('championship_id', champSubquery);

    return this.whereIn('id', athlInsSubquery);
  }
}

module.exports = AthleteInscriptionFilter;
