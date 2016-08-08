class gtFocusController {

  // @ngInject
  constructor($timeout, $element, $document) {

  }
}

export function gtFocus() {
  return {
    restrict: 'A',
    controller: gtFocusController,
    controllerAs: 'gtFocus',
    bindToController: true
  };
}
