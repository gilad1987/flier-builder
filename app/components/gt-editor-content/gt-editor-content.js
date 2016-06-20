class gtEditorContentController {
  // @ngInject
  constructor($log, $element) {
    $log.log($element);
  }
}

export const gtEditorContent = {
  bindings: {},
  templateUrl: '/components/gt-editor-content/gt-editor-content.html',
  controller: gtEditorContentController,
  controllerAs: 'gtEditorContent'
};
