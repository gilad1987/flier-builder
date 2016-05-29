describe('CreateController', () => {
  let createController, createController;

  beforeEach(angular.mock.module('FlierBuilder.controllers'));

  beforeEach(angular.mock.inject(($controller) => {
    createController = () => {
      createController = $controller('CreateController');
    };
  }));

  beforeEach(() => {
    createController();
  });

  it('should be true', () => {
    expect(createController.message).toMatch('CreateController');
  });
});
