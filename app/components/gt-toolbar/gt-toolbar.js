import { GtFunctionalityCollection } from '../../assets/javascripts/GtEditorComponents/GtFunctionalityCollection';
import { GtToolbar } from '../../assets/javascripts/GtEditorComponents/GtToolbar';

class gtToolbarController {
    // @ngInject
    constructor($element) {
        
        let toolbarFunctionalityCollection = new GtFunctionalityCollection();
        toolbarFunctionalityCollection.addActionCollection(this.states);
        let toolbar = new GtToolbar(toolbarFunctionalityCollection,null,this.statesMetadata);
        let editorParentElement = $element[0]; //[0].getElementsByClassName('Toolbar')[0];
        toolbar.render(editorParentElement);
    }
}

export const gtToolbar = {
    bindings: {
        'states':'=',
        'statesMetadata': '='
    },
    require:'gtEditorController',
    templateUrl: '/components/gt-toolbar/gt-toolbar.html',
    controller: gtToolbarController,
    controllerAs: 'gtToolbar'
};
