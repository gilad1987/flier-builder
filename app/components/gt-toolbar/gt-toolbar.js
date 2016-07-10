import { GtFunctionalityCollection } from '../../assets/javascripts/GtEditorComponents/GtFunctionalityCollection';
import { GtToolbar } from '../../assets/javascripts/GtEditorComponents/GtToolbar';

class gtToolbarController {
    // @ngInject
    constructor($element) {
        
        let toolbarFunctionalityCollection = new GtFunctionalityCollection();
        toolbarFunctionalityCollection.addStateCollection(this.states);
        let toolbar = new GtToolbar(toolbarFunctionalityCollection,null,this.statesMetadata);
        toolbar.render($element[0]);
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
