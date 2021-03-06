const Antl = use('Antl');

class TTEventStore {
  get rules() {
    return {
      federation_id: 'required',
      type: 'required|in:school,state,intrastate,national,club',
      name: 'required',
      start: 'required|date',
      end: 'required|date',
      'address.street': 'required',
      'address.number': 'integer',
      'address.neighborhood': 'required',
      'address.cep': 'required',
      'address.city': 'required',
      'address.uf': 'required',
      'entries.*.type': 'required|in:R,K,RK,KK,RKK',
      'entries.*.price': 'required', // TODO pegar valor double ou float
      'championships.*.sex': 'required|in:M,F',
      'championships.*.type': 'required', // TODO definir types, unique
      'championships.*.upperLimit': 'required|integer',
      'championships.*.downLimit': 'required|integer'
    };
  }

  get validateAll() {
    return true;
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = TTEventStore;
