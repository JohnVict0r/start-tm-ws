const Antl = use('Antl');

class ClubStore {
  get rules() {
    return {
      federation_id: 'required|integer',
      name: 'required',
      // 'address.street': 'required',
      'address.number': 'integer',
      // 'address.neighborhood': 'required',
      'address.cep': 'required',
      'address.city': 'required',
      'address.uf': 'required'
    };
  }

  get validateAll() {
    return true;
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = ClubStore;
