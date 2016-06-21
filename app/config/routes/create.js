export /* @ngInject */ function createRoutes($stateProvider) {
  $stateProvider

    .state('create', {
        url: '/create',
        templateUrl: '/states/create/create.html',
        controller: 'CreateController',
        controllerAs: 'Create'
    });
}
