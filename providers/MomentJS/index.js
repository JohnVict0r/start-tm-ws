'use strict';

const moment = require('moment');


class MomentJS {
  constructor(Config) {
    this.Config = Config;
  }

  get() {
    return moment;
  }
}

module.exports = MomentJS;
