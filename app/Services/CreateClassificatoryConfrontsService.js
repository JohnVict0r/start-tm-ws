'use strict';

const { Group } = use('App/Models');
const RoundRobin = use('RoundRobin');

class CreateClassificatoryConfrontsService {
  async run({ championship_id }) {
    const groupsQuery = await Group.query()
      .with('athletes')
      .where({ championship_id })
      .fetch();

    const groups = groupsQuery.toJSON();

    const groupsConfronts = groups.map((gp) => {
      const athletes = gp.athletes.map((athl) => athl.id);

      const confronts = RoundRobin.run({
        number: athletes.length,
        array: gp.athletes
      });

      return confronts;
    });

    return groupsConfronts;
  }
}

module.exports = new CreateClassificatoryConfrontsService();
