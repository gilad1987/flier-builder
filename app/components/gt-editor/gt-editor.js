class gtEditorController {
  // @ngInject
  constructor($log, $element) {
    $log.log($element);
  }
}

export const gtEditor = {
  bindings: {},
  templateUrl: '/components/gt-editor/gt-editor.html',
  controller: gtEditorController,
  controllerAs: 'gtEditor'
};
