'use strict';

const { Confront } = use('App/Models');
const CreateClassificatoryConfrontsService = use(
  'App/Services/CreateClassificatoryConfrontsService'
);

class ConfrontController {
  async index() {
    const confronts = await Confront.all();

    return confronts;
  }

  async store({ request, params }) {
    const { championships_id: championship_id } = params;

    const result = await CreateClassificatoryConfrontsService.run({
      championship_id
    });

    return result;
  }

  async show({ params }) {
    const { id } = params;

    const confront = await Confront.findOrFail(id);

    await confront.loadMany(['playerOne', 'playerTwo', 'table']);

    return confront;
  }

  async update({ params, request }) {
    const { id } = params;
    const { championship_id, ...data } = request.only(Confront.columns());

    const confront = await Confront.findOrFail(id);

    confront.merge(data);

    await confront.save();

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
