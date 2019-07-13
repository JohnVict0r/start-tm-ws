'use strict';

const slugs = {
  adm: 'adm',
  gst: 'gst',
  club: 'club',
  fed: 'fed'
};

module.exports = {
  adm: { name: 'Administrator', slug: slugs.adm },
  gst: { name: 'Guest', slug: slugs.gst },
  club: { name: 'Club President', slug: slugs.club },
  fed: {
    name: 'Federation President',
    slug: slugs.fed
  },
  slugs
};
