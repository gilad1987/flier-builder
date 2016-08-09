class gtFocusController {

  // @ngInject
  constructor($timeout, $element, $document) {
    let _this = this;

    $timeout(function(){
      $element[0].querySelector('.content').classList.add('focus');
    },0);
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
