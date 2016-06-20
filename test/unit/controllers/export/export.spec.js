describe('ExportController', () => {
  let exportController, createController;

  beforeEach(angular.mock.module('JuUi.controllers'));

  beforeEach(angular.mock.inject(($controller) => {
    createController = () => {
      exportController = $controller('ExportController');
    };
  }));

  beforeEach(() => {
    createController();
  });

  it('should be true', () => {
    expect(exportController.message).toMatch('ExportController');
  });
});
