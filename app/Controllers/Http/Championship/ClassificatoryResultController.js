'use strict';

const GetClassificatoryPhaseResultService = use(
  'App/Services/GetClassificatoryPhaseResultService'
);

const { GroupAthlete } = use('App/Models');

class ClassificatoryResultController {
  async show({ params }) {
    const athleteClass = await GetClassificatoryPhaseResultService.run({
      group_id: params.groups_id
    });

    return athleteClass;
  }

  async update({ params }) {
    const athleteClass = await GetClassificatoryPhaseResultService.run({
      group_id: params.groups_id
    });

    const promisses = athleteClass.map(async (athlClass, index) => {
      const groupAthlete = await GroupAthlete.findByOrFail({
        group_id: params.groups_id,
        athlete_id: athlClass.athlete_id
      });


      groupAthlete.merge({ classification: index + 1 });

      await groupAthlete.save();

      return groupAthlete;
    });

    const result = await Promise.all(promisses);

    return result;
  }
}

module.exports = ClassificatoryResultController;
