const { User, Subscription } = use('App/Models');
const Hash = use('Hash');

class UserController {
  async index({ request }) {
    const { page, ...data } = request.all();
    return User.query()
      .filter(data)
      .paginate(page || 1, 10);
  }

  async show({ params }) {
    const user = await User.findOrFail(params.id);

    await user.loadMany(['person', 'athlete', 'roles']);

    return user;
  }

  async store({ request }) {
    const subscriptionToken = request.input('subscription_token');

    const subscription = await Subscription.findByOrFail('token', subscriptionToken);

    const { password, email } = subscription;

    const hashPass = await Hash.make(password);

    const user = await User.create({
      email,
      password: hashPass
    });

    await subscription.delete();

    return user;
  }
}

module.exports = UserController;
