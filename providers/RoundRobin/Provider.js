const { ServiceProvider } = require('@adonisjs/fold');

class QueueProvider extends ServiceProvider {
  register() {
    this.app.singleton('RoundRobin', () => {
      const Config = this.app.use('Adonis/Src/Config');
      return new (require('.'))(Config);
    });
  }
}

module.exports = QueueProvider;
