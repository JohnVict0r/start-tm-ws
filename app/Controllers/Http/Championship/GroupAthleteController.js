'use strict';

const { GroupAthlete } = use('App/Models');

class GroupAthleteController {
  async update({ request }) {
    const { athlete_id, group_id, ...data } = request.only(
      GroupAthlete.columns()
    );

    const groupAthlete = await GroupAthlete.findByOrFail({
      group_id,
      athlete_id
    });

    groupAthlete.merge(data);

    await groupAthlete.save();

    return groupAthlete;
  }
}

module.exports = GroupAthleteController;
