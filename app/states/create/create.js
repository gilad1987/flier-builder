// import { GtState } from '../../assets/javascripts/GtEditorComponents/GtState';
export class CreateController {
    // @ngInject
    constructor($log, $state) {
        
        this.images = [
            'assets/images/states/create/BTH_Poster.jpg',
            'assets/images/states/create/93657192-5beb-4933-a236-d9b17ee2cf92.jpg'
        ];
        
        this.$state = $state;
        this.states = ['upload_your_image','insert_your_text','export'];
        this.stateActive = 'upload_your_image';
        this.breadCrumbsActive = ['upload_your_image'];

        this.image = null;

    }

    checkStateIsActive(){

    }

    setStateUploadYouImage(){

    }

    setStateInsertYourText(){

    }

    setStateExport(){

    }

}

