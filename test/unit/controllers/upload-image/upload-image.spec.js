describe('UploadImageController', () => {
  let uploadImageController, createController;

  beforeEach(angular.mock.module('JuUi.controllers'));

  beforeEach(angular.mock.inject(($controller) => {
    createController = () => {
      uploadImageController = $controller('UploadImageController');
    };
  }));

  beforeEach(() => {
    createController();
  });

  it('should be true', () => {
    expect(uploadImageController.message).toMatch('UploadImageController');
  });
});
