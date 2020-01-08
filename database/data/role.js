'use strict';

const slugs = {
  adm: 'adm',
  gst: 'gst',
  fed: 'fed'
};

module.exports = {
  adm: { name: 'Administrator', slug: slugs.adm },
  gst: { name: 'Guest', slug: slugs.gst },
  fed: {
    name: 'Federation President',
    slug: slugs.fed
  },
  slugs
};
