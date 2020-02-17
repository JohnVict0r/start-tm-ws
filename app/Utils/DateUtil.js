const moment = use('MomentJS').get();

module.exports = {
  addDays: (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },
  getAge: (date) => moment().diff((new Date(date).toISOString()), 'years')
};
