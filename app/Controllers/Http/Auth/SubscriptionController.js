'use strict';

const Hash = use('Hash');
// const Mail = use('Mail');
const { Subscription } = use('App/Models');

class SubscriptionController {
  async store({ request }) {
    const { redirect_url, ...data } = request.only(Subscription.columns());

    const token = await Hash.make(data.username + data.email + data.password);

    await Subscription.create({ ...data, token });

    // TODO implementar Queue
    //
    // await Mail.send('emails.subscription', { ...data, redirectUrl }, (message) => {
    //   message
    //     .to(data.email)
    //     .from('starttm@account.com')
    //     .subject('Confirm Email Address');
    // });

    return {
      message: 'Confirmation email has been send',
      link: `${redirect_url}${token}`,
      token
    };
  }
}

module.exports = SubscriptionController;
