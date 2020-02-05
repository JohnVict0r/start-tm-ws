'use strict';

const roundRobin = require('roundrobin');

class RoundRobin {
  constructor(Config) {
    this.Config = Config;
  }

  run({ number, array }) {
    return roundRobin(number, array);
  }
}

module.exports = RoundRobin;
