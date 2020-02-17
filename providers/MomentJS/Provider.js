const { ServiceProvider } = require('@adonisjs/fold');

class MomentJSProvider extends ServiceProvider {
  register() {
    this.app.singleton('MomentJS', () => {
      const Config = this.app.use('Adonis/Src/Config');
      return new (require('.'))(Config);
    });
  }
}

module.exports = MomentJSProvider;
