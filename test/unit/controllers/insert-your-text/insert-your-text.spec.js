describe('InsertYourTextController', () => {
  let insertYourTextController, createController;

  beforeEach(angular.mock.module('JuUi.controllers'));

  beforeEach(angular.mock.inject(($controller) => {
    createController = () => {
      insertYourTextController = $controller('InsertYourTextController');
    };
  }));

  beforeEach(() => {
    createController();
  });

  it('should be true', () => {
    expect(insertYourTextController.message).toMatch('InsertYourTextController');
  });
});
