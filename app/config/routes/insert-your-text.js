export /* @ngInject */ function insertYourTextRoutes($stateProvider) {
  $stateProvider

    .state('create.insert-your-text', {
      url: '/insert-your-text',
      templateUrl: '/states/insert-your-text/insert-your-text.html',
      controller: 'InsertYourTextController',
      controllerAs: 'InsertYourText'
    });
}
