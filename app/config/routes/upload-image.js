export /* @ngInject */ function uploadImageRoutes($stateProvider) {
  $stateProvider

    .state('create.upload-image', {
      url: '/upload-image',
      templateUrl: '/states/upload-image/upload-image.html',
      controller: 'UploadImageController',
      controllerAs: 'UploadImage'
    });
}
