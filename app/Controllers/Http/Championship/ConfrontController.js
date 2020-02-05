'use strict';

const { Confront } = use('App/Models');
const CreateClassificatoryConfrontsService = use(
  'App/Services/CreateClassificatoryConfrontsService'
);

class ConfrontController {
  async index({ params }) {
    const confronts = await Confront.query()
      .where({
        championship_id: params.championships_id
      })
      .fetch();

    return confronts;
  }

  async store({ params }) {
    const { championships_id: championship_id } = params;

    const confronts = await CreateClassificatoryConfrontsService.run({
      championship_id
    });

    const result = await Confront.createMany(confronts);

    return result;
  }

  async show({ params }) {
    const { id } = params;

    const confront = await Confront.findOrFail(id);

    await confront.loadMany(['playerOne', 'playerTwo', 'table']);

    return confront;
  }

  async destroy({ params }) {
    const { id } = params;

    const confront = await Confront.findOrFail(id);

    await confront.delete();

    return confront;
  }
}

module.exports = ConfrontController;
