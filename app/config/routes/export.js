export /* @ngInject */ function exportRoutes($stateProvider) {
  $stateProvider

    .state('create.export', {
      url: '/export',
      templateUrl: '/states/export/export.html',
      controller: 'ExportController',
      controllerAs: 'Export'
    });
}
