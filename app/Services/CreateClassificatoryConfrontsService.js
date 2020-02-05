'use strict';

const { Group, Championship, Confront } = use('App/Models');
const RoundRobin = use('RoundRobin');

class CreateClassificatoryConfrontsService {
  async run({ championship_id }) {
    const groupsQuery = await Group.query()
      .with('athletes')
      .where({ championship_id })
      .fetch();
    const { tt_event_id } = await Championship.query()
      .select('tt_event_id')
      .where({ id: championship_id })
      .first();
    const championships_id = await Championship.query()
      .where({ tt_event_id })
      .pluck('id');
    let [{ totalConfrontsEvent }] = await Confront.query()
      .whereIn('championship_id', championships_id)
      .count('* as totalConfrontsEvent');

    const groups = groupsQuery.toJSON();

    const groupsConfronts = groups.map((gp) => {
      const athletes = gp.athletes.map((athl) => athl.id);

      const result = RoundRobin.run({
        number: athletes.length,
        array: gp.athletes
      });

      const confrontArray = [].concat.apply([], Object.values(result));

      const confronts = confrontArray.map((conf) => {
        totalConfrontsEvent += 1;

        return {
          player_one: conf[0].id,
          player_two: conf[1].id,
          group_id: gp.id,
          number: totalConfrontsEvent,
          championship_id
        };
      });

      return confronts;
    });

    const totalConfronts = [].concat.apply([], Object.values(groupsConfronts));

    return totalConfronts;
  }
}

module.exports = new CreateClassificatoryConfrontsService();
