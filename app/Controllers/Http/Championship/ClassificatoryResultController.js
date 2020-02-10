'use strict';

const GetClassificatoryPhaseResultService = use(
  'App/Services/GetClassificatoryPhaseResultService'
);

class ClassificatoryResultController {
  async show({ params }) {
    return GetClassificatoryPhaseResultService.run({
      group_id: params.groups_id
    });
  }
}

module.exports = ClassificatoryResultController;
