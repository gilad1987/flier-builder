import { GtFunctionalityCollection } from '../../assets/javascripts/GtEditorComponents/GtFunctionalityCollection';
import { GtEditorContent } from '../../assets/javascripts/GtEditorComponents/GtEditorContent';

class gtEditorContentController {
    // @ngInject
    constructor($log, $element) {

        let editorStateCollection = new GtFunctionalityCollection();
        editorStateCollection.addActionCollection(this.states);
        let editor = new GtEditorContent(editorStateCollection,null,this.statesMetadata);
        editor.render($element[0]);
    }

}

export const gtEditorContent = {
  bindings: {
      'states':'=',
      'statesMetadata': '='
  },
  templateUrl: '/components/gt-editor-content/gt-editor-content.html',
  controller: gtEditorContentController,
  controllerAs: 'gtEditorContent'
};
