'use strict';

const axios = require('axios').default;

class StateController {
  async index() {
    const response = await axios.get(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
    );

    const states = response.data.map((item) => {
      const { regiao, ...estado } = item;
      return estado;
    });

    return states;
  }

  async show({ request }) {
    const { id } = request.params; // id: UF do estado

    const states = await axios.get(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
    );

    const stateId = states.data
      .filter((i) => i.sigla === id)
      .map((i) => i.id)[0];

    const response = await axios.get(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateId}/municipios`
    );

    const cities = response.data.map((item) => {
      const { microrregiao, ...city } = item;
      return city;
    });

    return cities;
  }
}

module.exports = StateController;
