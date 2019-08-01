const data = {
  users: ['view_users', 'create_users', 'update_users', 'delete_users'],
  people: ['view_people', 'create_people', 'update_people', 'delete_people'],
  athletes: [
    'view_athletes',
    'create_athletes',
    'update_athletes',
    'delete_athletes'
  ],
  clubs: ['view_clubs', 'create_clubs', 'update_clubs', 'delete_clubs'],

  federations: [
    'view_federations',
    'create_federations',
    'update_federations',
    'delete_federations'
  ],
  championships: [
    'view_championships',
    'create_championships',
    'update_championships',
    'delete_championships'
  ]
};

const slugs = [].concat.apply([], Object.values(data));

module.exports = { ...data, slugs };
