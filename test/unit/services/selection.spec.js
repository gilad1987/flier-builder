describe('Selection Service', () => {
  let Selection;

  beforeEach(angular.mock.module('JuUi.services'));

  beforeEach(angular.mock.inject((_Selection_) => {
    Selection = _Selection_;
  }));

  it('should be true', () => {
    expect(Selection).toBeDefined();
  });
});
