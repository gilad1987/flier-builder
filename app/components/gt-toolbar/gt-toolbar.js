class gtToolbarController {
  // @ngInject
  constructor($log, $element) {
    $log.log($element);
  }
}

export const gtToolbar = {
  bindings: {},
  templateUrl: '/components/gt-toolbar/gt-toolbar.html',
  controller: gtToolbarController,
  controllerAs: 'gtToolbar'
};
