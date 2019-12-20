const Antl = use('Antl');

class PersonStore {
  get rules() {
    return {
      user_id: 'required|unique:people',
      name: 'required',
      sex: 'required|in:MALE,FEMALE',
      birth: 'required', // TODO date valido
      cpf: 'required',
      rg: 'required',
      'address.street': 'required',
      'address.number': 'required|integer',
      'address.neighborhood': 'required',
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

module.exports = PersonStore;
